client = new NGSILDlib.Client('/ngsi-ld/v1')

//client.query('urn:ngsi-ld:WeatherbitSensor:WB_MURCIA')//.then( res => {console.log(res)})
//client.query('urn:ngsi-ld:Sensor:Aparcamiento:105')//.then( res => {console.log(res)})
let id = "urn:ngsi-ld:Vehicle:A8866";
let type;
let attrs;

let id2;
let request_body;
let json_body;
//client.query(id2, 'Sensor', attrs)//.then( res => {console.log(res)})

client.query(id, type, attrs) //.then( res => {console.log(res)})


let contextToBeRegistered = {
    "@context": [
        "http://uri.etsi.org/ngsi-ld/v1/ngsi-ld-core-context.jsonld",
        {
            "TemperatureSensor": "http://example.org/aarhus/TemperatureSensor",
            "temperature": "http://example.org/aarhus/temperature"
        }
    ],

    "id": "urn:ngsi-ld:Vehicle:A4569",
    "type": "Vehicle",
    "brandName": {
        "type": "Property",
        "value": "Mercedes"
    },
    "isParked": {
        "type": "Relationship",
        "object": "urn:ngsi-ld:OffStreetParking:Downtown1",
        "observedAt": "2017-07-29T12:00:04",
        "providedBy": {
            "type": "Relationship",
            "object": "urn:ngsi-ld:Person:Bob"
        }
    },
    "speed": {
        "type": "Property",
        "value": 80
    },
    "createdAt": "2017-07-29T12:00:04",
    "location": {
        "type": "GeoProperty",
        "value": "{ \"type\":\"Polygon\", \"coordinates\":[[[8.686752319335938,49.359122687528746],[8.742027282714844,49.3642654834877],[8.767433166503904,49.398462568451485],[8.768119812011719,49.42750021620163],[8.74305725097656,49.44781634951542],[8.669242858886719,49.43754770762113],[8.63525390625,49.41968407776289],[8.637657165527344,49.3995797187007],[8.663749694824219,49.36851347448498],[8.686752319335938,49.359122687528746]]] }"
    }
};

client.register(contextToBeRegistered);

let idToBeDeleted = "urn:ngsi-ld:Vehicle:A4569";
client.delete(idToBeDeleted);


id = "urn:ngsi-ld:Vehicle:A8866";
request_body = {
    "@context": {
        "type": "@type",
        "Property": "http://uri.etsi.org/ngsi-ld/Property",
        "value": "http://uri.etsi.org/ngsi-ld/hasValue",
        "brandName1": "http://example.org/vehicle/brandName1"
    },
    "brandName1": {
        "type": "Property",
        "value": "BMW"
    }
}

json_body = JSON.stringify(request_body);
client.update(id, json_body)


client.query(id, type, attrs) //.then( res => {console.log(res)})

request_body = {
    "@context": {
        "type": "@type",
        "Property": "http://uri.etsi.org/ngsi-ld/Property",
        "value": "http://uri.etsi.org/ngsi-ld/hasValue",
        "brandName1": "http://example.org/vehicle/brandName1"
    },
    "brandName1": {
        "type": "Property",
        "value": "MERCEDES"
    }
}
json_body = JSON.stringify(request_body);
client.update(id, json_body)
