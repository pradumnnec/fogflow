import express from 'express'
import bodyParser from 'body-parser'
import http from 'http'
import ld from 'lodash'

const ALLOWED_TYPES = [
    'json',
    'application/json',
    'application/ld+json',
    '*/json'
]

export class Agent {
    constructor(port, host) {
        this._notifyHandler = null
        this._adminHandler = null

        this.app = express()
    
        // console.log('Creating NGSI-LD Agent')
    
        this.app.set('port', port || 1030)
        this.app.set('host', host || '0.0.0.0')
        this.app.use(bodyParser.json({ type: ALLOWED_TYPES }))
        
        // this.app.use(Agent.ensureType)

        this.app.post('/notifyContext', Agent.ensureType, this.handleNotify.bind(this))
        this.app.post('/admin', Agent.ensureType, this.handleAdmin.bind(this))
    
        this.app.use(Agent.handleError)

        this.server = http.createServer(this.app)
    }

    static ensureType(req, res, next) {
        if (req.is(ALLOWED_TYPES)) {
            next();
        } else {
            console.log('Received non-json content-type in request ' + req.headers['content-type']);
            next(new Error('Unsupported content type: ' + req.headers['content-type']));
        }
    }

    static handleError(error, req, res, next) {
        var code = 500;

        console.log(error)
        console.log('Error [%s] handing request: %s', error.name, error.message);

        if (error.code && String(error.code).match(/^[2345]\d\d$/)) {
            code = error.code;
        }

        res.status(code).json({
            name: error.name,
            message: error.message
        });
    }

    static traceRequest(req, res, next) {
        console.log('Request for path [%s] from [%s]', req.path, req.get('host'));

        next();
    }

    static readContextElements(body) {
        // console.log(`Notification Id: ${body.id}\nSubscription Id: ${body.subscriptionId}`)

        var data = body.data
        if(ld.isObjectLike(data)) data = [data]

        // console.log(data)
        
        return data;
    }

    set notifyHandler(nh) {
        this._notifyHandler = nh
    }

    set adminHandler(ah) {
        this._adminHandler = ah
    }

    handleNotify(req, res, next) {
        if (this._notifyHandler) {
            console.log('Handling notification from [%s]', req.get('host'));		
            // logger.debug('Context parsed', ctxs)
            try {
                var ctxs = Agent.readContextElements(req.body)
                Promise.resolve(this._notifyHandler(ctxs))
                .then( val => {
                    console.log('Notification handled.', val)
                    res.end()
                }).catch( e => {
                    console.log('Error processing notification', e)
                    res.status(500).send('Error processing notifiction.')
                })
            } catch (e) {
                console.log('Error handling notification request.', e)
                res.status(500).send('Failed to process notification request')
            }
        } else {
            var errorNotFound = new Error({
                message: 'Notification handler not found'
            });
            console.log('Tried to handle a notification before notification handler was established.');
            next(errorNotFound);
        }
    }

    handleAdmin(req, res, next) {
        if (this._adminHandler) {
            console.log('Handling admin from [%s]', req.get('host'));
            
            if(req.body) {
                Promise.resolve(this._adminHandler(req.body))
                .then( val => {
                    console.log('Admin handled.', val)
                    res.end()
                }).catch( err => {
                    console.log('Error processing admin', err)
                    res.status(500).send('Error handling admin')
                })
            } else {
                res.status(500).send('No body in admin request.')
            }
            
        } else {
            var errorNotFound = new Error({
                message: 'Admin handler not found'
            });
            console.log('Tried to handle an admin command before admin handler was established.');
            next(errorNotFound);
        }
    }


    start(callback) {
        console.log('Starting NGSI-LD Agent listening on [%s:%s]', this.app.get('host'), this.app.get('port'));

        this.server.listen(this.app.get('port'), this.app.get('host'), callback);
    }

    stop() {
        console.log('Stopping NGSI-LD Agent');

        this.server.stop()
    }
}