from flask import Flask, jsonify, abort, request, make_response
import requests
import json
import time
import datetime
import threading
import os
import sys

import function as fogflow

app = Flask(__name__, static_url_path="")

# global variables
brokerURL = ''
outputs = []

input = {}



@app.errorhandler(400)
def not_found(error):
    return make_response(jsonify({'error': 'Bad request'}), 400)


@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({'error': 'Not found'}), 404)


@app.route('/admin', methods=['POST'])
def admin():
    if not request.json:
        abort(400)

    configObjs = request.json
    handleConfig(configObjs)

    return jsonify({'responseCode': 200})


@app.route('/notifyContext', methods=['POST'])
def notifyContext():
    print("=============notify=============")

    if not request.json:
        abort(400)

    objs = readContextElements(request.json)
    handleNotify(objs)

    return jsonify({'responseCode': 200})


def element2Object(element):
    ctxObj = {}

    for key in element:
        ctxObj[key] = element[key]

    return ctxObj


def object2Element(ctxObj):

    ctxElement = {}
    ctxElement['id']=ctxObj['id']
    ctxElement['type']=ctxObj['type']


    for key in ctxObj:
        if key != "id" and key != "type" and key != "modifiedAt" and key != "createdAt" and key != "observationSpace" and key != "operationSpace" and key != "location" and key != "@context":
            if ctxObj[key].has_key('createdAt'):
                ctxObj[key].pop('createdAt')
            if ctxObj[key].has_key('modifiedAt'):
                ctxObj[key].pop('modifiedAt')
            ctxElement[key] = ctxObj[key]

    return ctxElement

def readContextElements(data):
    print(data)

    ctxObjects = []

    for response in data['contextResponses']:
        if response['statusCode']['code'] == 200:
            ctxObj = element2Object(response['contextElement'])
            ctxObjects.append(ctxObj)

    return ctxObjects


def handleNotify(contextObjs):
    fogflow.handleEntity(contextObjs, publishResult)


def handleConfig(configurations):
    global brokerURL
    for config in configurations:
        if config['command'] == 'CONNECT_BROKER':
            brokerURL = config['brokerURL']
        elif config['command'] == 'SET_OUTPUTS':
            outputs.append({'id': config['id'], 'type': config['type']})
        elif config['command'] == 'SET_INPUTS':
            setInput(config)

def setInput(cmd):
    global input
    print("cmd")
    print(cmd)
    if 'id' in cmd:
        input['id'] = cmd['id']

    input['type'] = cmd['type']

def publishResult(ctxObj):
    global brokerUR
    if brokerURL == '':
        return

    ctxElement = object2Element(ctxObj)

    updateCtxReq = {}
    
    updateCtxReq['updateAction'] = 'UPDATE'
    updateCtxReq['contextElements'] = []
    updateCtxReq['contextElements'].append(ctxElement)

    headers = {'Accept': 'application/json',
               'Content-Type': 'application/json'}
    response = requests.post(brokerURL + '/updateContext',
                             data=json.dumps(updateCtxReq), 
                             headers=headers)
    if response.status_code != 200:
        print('failed to update context')
        print(response.text)

def fetchInputByQuery():            
    ctxQueryReq = {}

    ctxQueryReq['entities'] = []            
    headers = {'Accept': 'application/ld+json',
               'Content-Type': 'application/ld+json'}
    response = requests.get(brokerURL + '/ngsi-ld/v1/entities/'+input['id'],
                             headers=headers)

    if response.status_code != 200:
        print('failed to query the input data')
        return {}
    else:
        jsonResult = response.json()  
        
        ctxObj = element2Object(jsonResult)

        return ctxObj

def requestInputBySubscription():
    ctxSubReq = {}

    ctxSubReq['entities'] = []
    
    if id in input:
        ctxSubReq['entities'].append({'id': input['id'], 'isPattern': False})
    else:                
        ctxSubReq['entities'].append({'type': input['type'], 'isPattern': True})        

    ctxSubReq['reference'] = "http://host.docker.internal:" + os.getenv('myport')

    headers = {'Accept': 'application/json',
               'Content-Type': 'application/json'}
    response = requests.post(brokerURL + '/subscribeContext',
                             data=json.dumps(ctxSubReq), 
                             headers=headers)

    if response.status_code != 200:
        print('failed to query the input data')
    else:
        print('subscribed to the input data')


# continuous execution to handle received notifications
def notify2execution(): 
    myport = int(os.getenv('myport'))
    print("listening on port " + os.getenv('myport'))

    app.run(host='0.0.0.0', port=myport)


def runInOperationMode():
    print("===== OPERATION MODEL========")

    # apply the configuration received from the environmental varible
    myCfg = os.getenv('adminCfg')
    
    print(myCfg)
    
    adminCfg = json.loads(myCfg)
    handleConfig(adminCfg)

    syncMode = os.getenv('sync') 
    if syncMode != None and syncMode == 'yes':
        query2execution()
    else:
        notify2execution()


# one time execution triggered by query
def query2execution():      
    ctxObjects = fetchInputByQuery()
    handleNotify(ctxObjects)


def runInTestMode():
    print("===== TEST NGSILD MODEL========")
    #load the configuration
    with open('config.json') as json_file:
        config = json.load(json_file) 
        print(config)
        
        handleConfig(config)                

        # trigger the data processing
        query2execution()

if __name__ == '__main__':
    parameters = sys.argv
    
    if len(parameters) == 2 and parameters[1] == "-o":
        runInOperationMode()
    else:
        runInTestMode()
    
