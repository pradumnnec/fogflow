import Axios from 'axios'
import * as jsonld from 'jsonld'
 
 export class Client {
/*
    //all entities
    {{gatewayServer}}/ngsi-ld/v1/entities/
    //Specific entity (byID)
    {{gatewayServer}}/ngsi-ld/v1/entities/urn:ngsi-ld:Vehicle:A4569
    //By attributes
    {{gatewayServer}}/ngsi-ld/v1/entities?attrs=http://example.org/vehicle/brandName?attrs=http://example.org/vehicle/brandName
    //By Id
    {{gatewayServer}}/ngsi-ld/v1/entities?id=urn:ngsi-ld:Vehicle:A4569
    //by Type
    {{gatewayServer}}/ngsi-ld/v1/entities?type=http://example.org/vehicle/Vehicle
    // by Id and Type
    {{gatewayServer}}/ngsi-ld/v1/entities?id=urn:ngsi-ld:Vehicle:A4569&type=http://example.org/vehicle/Vehicle
    //by IdPattern
    {{gatewayServer}}/ngsi-ld/v1/entities?idPattern=urn:ngsi-ld:Vehicle:A.*
*/
    // initialized with the broker URL
    constructor(brokerURL) {
        this.brokerURL = "localhost";
        this.queryById = "/entities/";
        this.queryByType = "/entities?type=";
        this.queryByAttrsP1 = "/entities"
        this.queryByAttrsP2 = "?attrs=";
        this.queryAllEntities = "/entities/";
        this.subscribe = "/subscriptions";

        this.brokerURL = brokerURL
        this.axios = Axios.create({
            baseURL: brokerURL,
            timeout: 1000,
            headers: {
                'accept': 'application/ld+json',
                'content-type': 'application/ld+json'
            }
          })
    }


    query(id, type, attributes) {
        let queryUrl ="";
        //If only id is set
        if (id != null && type == null && attributes == null) {
            queryUrl += this.queryById + id;
        }
        //If only type is set
        if (id == null && type != null && attributes == null) {
            queryUrl += this.queryByType + type;
        }
        
        //If only attributes are set
        if (id == null && type == null && attributes != null) {
            queryUrl += this.queryByAttrsP1;
            for (var i = 0; i < attributes.length; i++ ) {
                queryUrl += this.queryByAttrsP2 + attributes[i];
            }
        }

        // If id and type are set
        if (id != null && type != null && attributes == null) {
            queryUrl += this.queryById + id + '&type=' + type;
        }


        return this.axios.get(queryUrl)
            .then(function (response) {
                console.log("QUERY OK");
                console.log(response.data);
                return response.data;
            })
            .catch(function (error) {
                console.log("ERROR ON QUERY: ",queryUrl);
                console.log(error.response.data);
                return null;
            });
            
    };
        
    update(id, body) {
        let queryUrl ="";

        if (id != null) {
            queryUrl += this.queryAllEntities + id+'/attrs';
        }

        console.log(queryUrl);
        return this.axios.patch(queryUrl, body)
        .then(function (response) {
            console.log(response.data);
            return response.data;
        })
        .catch(function (error) {
            console.log("ERROR ON UPDATE: ",id);
            console.log(error.response.data);
            return null;
        });
    
    };
    
    delete (id) {
        let queryUrl="";
        if (id != null) {
            queryUrl += this.queryAllEntities + id;
        }
        return this.axios.delete(queryUrl)
        .then(function (response) {
            console.log(response.data);
            return response.data;
        })
        .catch(function (error) {
            console.log("ERROR ON DELETE: ", id);
            console.log(error.response.data);
            return null;
        });
    
    };
    
    
    register (body) {
        let queryUrl = this.queryAllEntities;
        return this.axios.post(queryUrl, body)
        .then(function (response) {
            console.log(response.data);
            return response.data;
        })
        .catch(function (error) {
            console.log("ERROR ON REGISTER");
            console.log(error.response.data);
            return null;
        });
    };

    subscribeContext(subscribeCtxReq) {
        let queryUrl = this.subscribe;
        
        return this.axios.post(queryUrl, subscribeCtxReq)
        .then(function (response) {
            console.log(response);
            return response
        })
        .catch(function (error) {
            console.log("ERROR ON SUBSCRIBE");
            console.log(error.response.data);
            return null;
        });

    };    

    // unsubscribe context    
    /*unsubscribeContext(sid) {
        var unsubscribeCtxReq = {};
        unsubscribeCtxReq.subscriptionId = sid;
        
        return axios({
            method: 'post',
            url: this.brokerURL + '/unsubscribeContext',
            data: unsubscribeCtxReq
        }).then( function(response){
            if (response.status == 200) {
                return response.data;
            } else {
                return null;
            }
        });
    }; */          

}