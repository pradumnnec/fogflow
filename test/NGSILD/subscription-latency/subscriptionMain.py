from flask import Flask, jsonify, abort, request, make_response
import requests
import json
import time
import datetime
import threading
import os
import sys

import ngsildClient as fogflow

app = Flask(__name__, static_url_path='')

start = False
startTime = ''
subcriptionBroker = ''
myport = 8085 
myIp = ''
noOfRequest = 2 
'''@app.route('/notifyContext', methods=['POST'])

def notify():
    //handle notification
    if start = True :
        startTime = ()
	# find The throughtput

'''

def runApp():
    myport = int(8085)
    app.run(host='0.0.0.0', port=myport)


def handleConfig(config):
    SubscriptionBroker = config['subscribe_broker_url']
    myIp = config['my_ip']
    print(SubscriptionBroker)

def handleConfig(config):
    SubscriptionBroker = config['subscribe_broker_url']
    print(SubscriptionBroker)


def setConfig():
    # load the configuration
    with open('config.json') as json_file:
        config = json.load(json_file)
        handleConfig(config)


def updateRequest(requestNo):
    updateCtxRequest = {}
    updateCtxRequest['id'] = 'urn:ngsi-ld:Car:A0' + requestNo
    updateCtxRequest['type'] = 'Vehicle'
    brand = {}
    brand['type'] = 'property'
    brand['value'] = 'BMW'
    
    CarRelation = {}
    CarRelation['type'] = 'relationship'
    CarRelation['object'] = 'urn:ngsi-ld:Car:A111'
    updateCtxRequest['brand'] = brand 
    updateCtxRequest['CarRelation'] = CarRelation
    
    responseStartus = fogflow.updateRequest(updateCtxRequest,BrokerIp)
    print(responseStartus)

def update(noOfRequest):
    for requestNo in range(noOfRequest):
        updateRequest(requestNo)

def subscribe():

    subscriptionRequest = {}
    subscriptionRequest['type']  = 'Subscription'

    entities = []

    entity = {}
    entity['id'] = 'urn:ngsi-ld:Car:A0' + '.*'
    entity['type'] = 'Vehicle'
    entities.append(entity)

    subscriptionRequest['entities'] = entities

    notification = {}
    notification['format'] = 'keyValues'
    endPoint = {}

    endPoint['uri'] = myIp + int(myport) + 'notifyContext'
    endPoint['accept'] = 'application/ld+json'
    notification['endpoint'] = endPoint

    subscriptionRequest['notification'] = notification
    print(subscription)
    sid = fogflow.subscribeContext(subscriptionRequest,subcriptionBroker)
    
if __name__ == '__main__':
     #run app
    setConfig()
    runApp()
    sid = Subscribe()
    update(noOfRequest)
    
     

