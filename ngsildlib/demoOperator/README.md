---
title: Javascript NGSI-LD FOGFLOW operator demo
author: Pedro González Gil
date: August 22, 2019
---
# Javascript NGSI-LD FOGFLOW operator tempalte 

This is a PoC demo FogFlow Operator function, which uses the new NGSI-LD standard instead of the previous NGSI-9/10. This demo is based on the new [template](../template/README.md) provided for FogFlow.

## Convenience script

Two convenience scripts have been provided with this demo in order to be run: first launch [run_mockup](./run_mockup.sh) which will install npm dependencies, set the environment and run the mock-up operator.

Afther data, you can make a subscription to an Scorpio broker on behalf of the operator (emulating the Worker) and launching some updates to trigger notifications, or alternatively, you can directly mock-up a notification via the [send_notification](./send_notification.sh) script.

## Manual local mockup running

Install dependencies via `npm install`. Then set environment variables needed for bootstrapping the operator

```bash
export adminCfg='[
    {
        "command": "CONNECT_BROKER",
        "brokerURL": "http://155.54.95.248:9090/ngsi-ld/v1"
    },
    {
        "command": "SET_REFERENCE",
        "url": "http://192.168.168.183:12345/notifyContext"
    },
    {
        "command": "SET_OUTPUTS",
        "id": "Out.2429876328.1",
        "type": "Out"
    }
]'
export myport=12345
```

Finally run with `node main.js`

### Subscribing the operator for notifications from the broker

This commands should subscribe the operator for notifications from the broker:

```bash
# Deleting possible previous subscription
curl -X DELETE \
  http://155.54.95.248:9090/ngsi-ld/v1/subscriptions/urn:ngsi-ld:Subscription:mb01

# Creating anew
curl -X POST \
  http://155.54.95.248:9090/ngsi-ld/v1/subscriptions \
  -H 'Content-Type: application/ld+json' \
  -d '{
    "id": "urn:ngsi-ld:Subscription:mb01",
    "type": "Subscription",
    "entities": [
        {
            "type": "TemperatureSensor"
        }
    ],
    "watchedAttributes": [
        "temperature"
    ],
    "notification": {
        "attributes": [
            "temperature"
        ],
        "format": "keyValues",
        "endpoint": {
            "uri": "http://155.54.192.182:12345/notifyContext",
            "accept": "application/json"
        }
    },
  "@context":[
        "http://uri.etsi.org/ngsi-ld/v1/ngsi-ld-core-context.jsonld",
        {
            "TemperatureSensor": "http://example.org/aarhus/TemperatureSensor",
            "temperature": "http://example.org/aarhus/temperature"
        }
  ]
}'
````

And with this commands, a notification should be triggered:

```bash
# Deleting possible previous entity
curl -X DELETE \
  http://155.54.95.248:9090/ngsi-ld/v1/entities/urn:ngsi-ld:TemperatureSensor:MBTest02 \

# Creating anew
curl -X POST \
  http://155.54.95.248:9090/ngsi-ld/v1/entities/ \
  -H 'Content-Type: application/ld+json' \
  -d '{
  "@context":[
        "http://uri.etsi.org/ngsi-ld/v1/ngsi-ld-core-context.jsonld",
        {
            "TemperatureSensor": "http://example.org/aarhus/TemperatureSensor",
            "temperature": "http://example.org/aarhus/temperature"
        }
  ],
  "id":"urn:ngsi-ld:TemperatureSensor:MBTest02",
  "type":"TemperatureSensor",
  "temperature":{
    "type":"Property",
    "value":23
  }
}'
```


### Mocking-up notifications

We can also avoid subscribing to the broker and instead mock-up the notification straight to the operator with this command:

```bash
curl -X POST \
  http://localhost:12345/notifyContext \
  -H 'Content-Type: application/json' \
  -d '{
    "id": "urn:ngsi-ld:Notification:65559",
    "type": "Notification",
    "subscriptionId": "urn:ngsi-ld:Subscription:mb01",
    "context": "http://uri.etsi.org/ngsi-ld/notification",
    "notifiedAt": "Tue Aug 20 2019 10:30:27 GMT+0000 (Coordinated Universal Time)",
    "data": {
        "@context": [
            "http://uri.etsi.org/ngsi-ld/v1/ngsi-ld-core-context.jsonld",
            {
                "TemperatureSensor": "http://example.org/aarhus/TemperatureSensor",
                "temperature": "http://example.org/aarhus/temperature"
            }
        ],
        "id": "urn:ngsi-ld:TemperatureSensor:MBTest02",
        "type": "TemperatureSensor",
        "temperature": {
            "type": "Property",
            "value": 23
        },
        "createdAt": "2017-07-29T12:00:04"
    }
}'
```
