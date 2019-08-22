//  define global variables or include third-party libraries (notice that the library must be specified in the package.json file as well)
var speakerID = null;

//
//  contextEntity: the received entities
//  publish, query, and subscribe are the callback functions for your own function to interact with the assigned nearby broker
//      publish:    publish the generated entity, which could be a new entity or the update of an existing entity
//      query:      query addtional information from the assigned nearby broker
//      subscribe:  subscribe addtional infromation from the assigned nearby broker
//
exports.handler = function(contextEntity, publish, query, subscribe)
{
	console.log("enter into the user-defined fog function");

	if (contextEntity == null) {
		return;
    }

    console.log(contextEntity)


    let id = "urn:ngsi-ld:Vehicle:A8866";
    let type;
    let attrs;
    
    let id2;
    let request_body;
    let json_body;
 


    let contextToBeRegistered = `{
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
      }`

    publish(contextToBeRegistered)

    query(id, type, attrs).then( res => {console.log(res)})
 
    

    // ============================== publish ======================================================
    
    // if you need to publish the generated result, please refer to the following example    
    
    /*
    var updateEntity = {};
    updateEntity.entityId = {
           id: "Twin.Home.0001",
           type: 'Home',
           isPattern: false
    };	    	
    updateEntity.attributes = {};	 
    updateEntity.attributes.city = {type: 'string', value: 'Heidelberg'};                
    
    updateEntity.metadata = {};    
    updateEntity.metadata.location = {
        type: 'point',
        value: {'latitude': 33.0, 'longitude': -1.0}
    };        
   	
    publish(updateEntity);
    console.log("publish: ", updateEntity);		                
    */

    
    // ============================== query ======================================================
    
    // if you want to query addtional information from the assigned nearby broker, please refer to the following example
    
    /*
    var queryReq = {}
    queryReq.entities = [{type:'PublicSite', isPattern: true}];    
    var handleQueryResult = function(entityList) {
        for(var i=0; i<entityList.length; i++) {
            var entity = entityList[i];
            console.log('===============' + i + '===================');
            console.log(entity);   
        }
    }  
    
    query(queryReq, handleQueryResult);
    */
    
    
    // ============================== subscribe ======================================================
    
    // if you want to subscribe addtional infromation from the assigned nearby broker, please refer to the following example

    /*
    var subscribeCtxReq = {};    
    subscribeCtxReq.entities = [{type: 'Home', isPattern: true}];
    subscribeCtxReq.attributes = ['alert'];        
    //subscribeCtxReq.restriction = {scopes: [{scopeType: 'stringQuery', scopeValue: 'geohash='+contextEntity.attributes.geohash.value}]}        	
    
    subscribe(subscribeCtxReq);     
    */
	
};

