#!/bin/bash

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
