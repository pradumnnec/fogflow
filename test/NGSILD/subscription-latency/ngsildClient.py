import requests
import json


# request that send the subscribe Context request

def subscribeContext(subscribeCtxEle, BrokerURL):
     headers = {'Accept': 'application/ld+json',
               'Content-Type': 'application/json',
               'Link': '<https://fiware.github.io/data-models/context.jsonld>; rel="https://uri.etsi.org/ngsi-ld/v1/ngsi-ld-core-context.jsonld"; type="application/ld+json"'}
    response = requests.post(scorpioBrokerURL + '/ngsi-ld/v1/subscriptions/',
                             data=json.dumps(subCtxEle),
                             headers=headers)
    if response.status_code == 201:
        return response
    else:
        return ''


# request that send the update Context request to Broker
def updateCotext(updateCtxEle, BrokerURL):
    headers = {'Accept': 'application/ld+json',
               'Content-Type': 'application/json',
               'Link': '<https://fiware.github.io/data-models/context.jsonld>; rel="https://uri.etsi.org/ngsi-ld/v1/ngsi-ld-core-context.jsonld"; type="application/ld+json"'}
    response = requests.post(scorpioBrokerURL + '/ngsi-ld/v1/entities/',
                             data=json.dumps(subCtxEle),
                             headers=headers)

     if response.status_code == 201:
         return response
     else:
         return ''

