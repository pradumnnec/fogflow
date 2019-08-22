module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/agent.js":
/*!**********************!*\
  !*** ./src/agent.js ***!
  \**********************/
/*! exports provided: Agent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Agent\", function() { return Agent; });\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! body-parser */ \"body-parser\");\n/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(body_parser__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! http */ \"http\");\n/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(http__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash */ \"lodash\");\n/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_3__);\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n\n\n\n\nvar ALLOWED_TYPES = ['json', 'application/json', 'application/ld+json', '*/json'];\nvar Agent =\n/*#__PURE__*/\nfunction () {\n  function Agent(port, host) {\n    _classCallCheck(this, Agent);\n\n    this._notifyHandler = null;\n    this._adminHandler = null;\n    this.app = express__WEBPACK_IMPORTED_MODULE_0___default()(); // console.log('Creating NGSI-LD Agent')\n\n    this.app.set('port', port || 1030);\n    this.app.set('host', host || '0.0.0.0');\n    this.app.use(body_parser__WEBPACK_IMPORTED_MODULE_1___default.a.json({\n      type: ALLOWED_TYPES\n    })); // this.app.use(Agent.ensureType)\n\n    this.app.post('/notifyContext', Agent.ensureType, this.handleNotify.bind(this));\n    this.app.post('/admin', Agent.ensureType, this.handleAdmin.bind(this));\n    this.app.use(Agent.handleError);\n    this.server = http__WEBPACK_IMPORTED_MODULE_2___default.a.createServer(this.app);\n  }\n\n  _createClass(Agent, [{\n    key: \"handleNotify\",\n    value: function handleNotify(req, res, next) {\n      if (this._notifyHandler) {\n        console.log('Handling notification from [%s]', req.get('host')); // logger.debug('Context parsed', ctxs)\n\n        try {\n          var ctxs = Agent.readContextElements(req.body);\n          Promise.resolve(this._notifyHandler(ctxs)).then(function (val) {\n            console.log('Notification handled.', val);\n            res.end();\n          })[\"catch\"](function (e) {\n            console.log('Error processing notification', e);\n            res.status(500).send('Error processing notifiction.');\n          });\n        } catch (e) {\n          console.log('Error handling notification request.', e);\n          res.status(500).send('Failed to process notification request');\n        }\n      } else {\n        var errorNotFound = new Error({\n          message: 'Notification handler not found'\n        });\n        console.log('Tried to handle a notification before notification handler was established.');\n        next(errorNotFound);\n      }\n    }\n  }, {\n    key: \"handleAdmin\",\n    value: function handleAdmin(req, res, next) {\n      if (this._adminHandler) {\n        console.log('Handling admin from [%s]', req.get('host'));\n\n        if (req.body) {\n          Promise.resolve(this._adminHandler(req.body)).then(function (val) {\n            console.log('Admin handled.', val);\n            res.end();\n          })[\"catch\"](function (err) {\n            console.log('Error processing admin', err);\n            res.status(500).send('Error handling admin');\n          });\n        } else {\n          res.status(500).send('No body in admin request.');\n        }\n      } else {\n        var errorNotFound = new Error({\n          message: 'Admin handler not found'\n        });\n        console.log('Tried to handle an admin command before admin handler was established.');\n        next(errorNotFound);\n      }\n    }\n  }, {\n    key: \"start\",\n    value: function start(callback) {\n      console.log('Starting NGSI-LD Agent listening on [%s:%s]', this.app.get('host'), this.app.get('port'));\n      this.server.listen(this.app.get('port'), this.app.get('host'), callback);\n    }\n  }, {\n    key: \"stop\",\n    value: function stop() {\n      console.log('Stopping NGSI-LD Agent');\n      this.server.stop();\n    }\n  }, {\n    key: \"notifyHandler\",\n    set: function set(nh) {\n      this._notifyHandler = nh;\n    }\n  }, {\n    key: \"adminHandler\",\n    set: function set(ah) {\n      this._adminHandler = ah;\n    }\n  }], [{\n    key: \"ensureType\",\n    value: function ensureType(req, res, next) {\n      if (req.is(ALLOWED_TYPES)) {\n        next();\n      } else {\n        console.log('Received non-json content-type in request ' + req.headers['content-type']);\n        next(new Error('Unsupported content type: ' + req.headers['content-type']));\n      }\n    }\n  }, {\n    key: \"handleError\",\n    value: function handleError(error, req, res, next) {\n      var code = 500;\n      console.log(error);\n      console.log('Error [%s] handing request: %s', error.name, error.message);\n\n      if (error.code && String(error.code).match(/^[2345]\\d\\d$/)) {\n        code = error.code;\n      }\n\n      res.status(code).json({\n        name: error.name,\n        message: error.message\n      });\n    }\n  }, {\n    key: \"traceRequest\",\n    value: function traceRequest(req, res, next) {\n      console.log('Request for path [%s] from [%s]', req.path, req.get('host'));\n      next();\n    }\n  }, {\n    key: \"readContextElements\",\n    value: function readContextElements(body) {\n      // console.log(`Notification Id: ${body.id}\\nSubscription Id: ${body.subscriptionId}`)\n      var data = body.data;\n      if (lodash__WEBPACK_IMPORTED_MODULE_3___default.a.isObjectLike(data)) data = [data]; // console.log(data)\n\n      return data;\n    }\n  }]);\n\n  return Agent;\n}();\n\n//# sourceURL=webpack://NGSILDlib/./src/agent.js?");

/***/ }),

/***/ "./src/client.js":
/*!***********************!*\
  !*** ./src/client.js ***!
  \***********************/
/*! exports provided: Client */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Client\", function() { return Client; });\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ \"axios\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var jsonld__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jsonld */ \"jsonld\");\n/* harmony import */ var jsonld__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jsonld__WEBPACK_IMPORTED_MODULE_1__);\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n\n\nvar Client =\n/*#__PURE__*/\nfunction () {\n  /*\n      //all entities\n      {{gatewayServer}}/ngsi-ld/v1/entities/\n      //Specific entity (byID)\n      {{gatewayServer}}/ngsi-ld/v1/entities/urn:ngsi-ld:Vehicle:A4569\n      //By attributes\n      {{gatewayServer}}/ngsi-ld/v1/entities?attrs=http://example.org/vehicle/brandName?attrs=http://example.org/vehicle/brandName\n      //By Id\n      {{gatewayServer}}/ngsi-ld/v1/entities?id=urn:ngsi-ld:Vehicle:A4569\n      //by Type\n      {{gatewayServer}}/ngsi-ld/v1/entities?type=http://example.org/vehicle/Vehicle\n      // by Id and Type\n      {{gatewayServer}}/ngsi-ld/v1/entities?id=urn:ngsi-ld:Vehicle:A4569&type=http://example.org/vehicle/Vehicle\n      //by IdPattern\n      {{gatewayServer}}/ngsi-ld/v1/entities?idPattern=urn:ngsi-ld:Vehicle:A.*\n  */\n  // initialized with the broker URL\n  function Client(brokerURL) {\n    _classCallCheck(this, Client);\n\n    this.brokerURL = \"localhost\";\n    this.queryById = \"/entities/\";\n    this.queryByType = \"/entities?type=\";\n    this.queryByAttrsP1 = \"/entities\";\n    this.queryByAttrsP2 = \"?attrs=\";\n    this.queryAllEntities = \"/entities/\";\n    this.subscribe = \"/subscriptions\";\n    this.brokerURL = brokerURL;\n    this.axios = axios__WEBPACK_IMPORTED_MODULE_0___default.a.create({\n      baseURL: brokerURL,\n      timeout: 1000,\n      headers: {\n        'accept': 'application/ld+json',\n        'content-type': 'application/ld+json'\n      }\n    });\n  }\n\n  _createClass(Client, [{\n    key: \"query\",\n    value: function query(id, type, attributes) {\n      var queryUrl = \"\"; //If only id is set\n\n      if (id != null && type == null && attributes == null) {\n        queryUrl += this.queryById + id;\n      } //If only type is set\n\n\n      if (id == null && type != null && attributes == null) {\n        queryUrl += this.queryByType + type;\n      } //If only attributes are set\n\n\n      if (id == null && type == null && attributes != null) {\n        queryUrl += this.queryByAttrsP1;\n\n        for (var i = 0; i < attributes.length; i++) {\n          queryUrl += this.queryByAttrsP2 + attributes[i];\n        }\n      } // If id and type are set\n\n\n      if (id != null && type != null && attributes == null) {\n        queryUrl += this.queryById + id + '&type=' + type;\n      }\n\n      return this.axios.get(queryUrl).then(function (response) {\n        console.log(\"REQUEST OK\");\n        console.log(response.data);\n        return response.data;\n      })[\"catch\"](function (error) {\n        console.log(\"ERROR\");\n        console.log(error.response.data);\n        return null;\n      });\n    }\n  }, {\n    key: \"update\",\n    value: function update(id, body) {\n      var queryUrl = \"\";\n\n      if (id != null) {\n        queryUrl += this.queryAllEntities + id + '/attrs';\n      }\n\n      console.log(queryUrl);\n      return this.axios.patch(queryUrl, body).then(function (response) {\n        console.log(response.data);\n        return response.data;\n      })[\"catch\"](function (error) {\n        console.log(\"REQUEST ERROR\");\n        console.log(error.response.data);\n        return null;\n      });\n    }\n  }, {\n    key: \"delete\",\n    value: function _delete(id) {\n      var queryUrl = \"\";\n\n      if (id != null) {\n        queryUrl += this.queryAllEntities + id;\n      }\n\n      return this.axios[\"delete\"](queryUrl).then(function (response) {\n        console.log(response.data);\n        return response.data;\n      })[\"catch\"](function (error) {\n        console.log(\"REQUEST ERROR\");\n        console.log(error.response.data);\n        return null;\n      });\n    }\n  }, {\n    key: \"register\",\n    value: function register(body) {\n      var queryUrl = this.queryAllEntities;\n      return this.axios.post(queryUrl, body).then(function (response) {\n        console.log(response.data);\n        return response.data;\n      })[\"catch\"](function (error) {\n        console.log(\"REQUEST ERROR\");\n        console.log(error.response.data);\n        return null;\n      });\n    }\n  }, {\n    key: \"subscribeContext\",\n    value: function subscribeContext(subscribeCtxReq) {\n      var queryUrl = this.subscribe;\n      return this.axios.post(queryUrl, subscribeCtxReq).then(function (response) {\n        console.log(response.data);\n        return response.data.subscribeResponse.subscriptionId; //            return response.data;\n      })[\"catch\"](function (error) {\n        console.log(\"REQUEST ERROR\");\n        console.log(error.response.data);\n        return null;\n      });\n    }\n  }]);\n\n  return Client;\n}();\n\n//# sourceURL=webpack://NGSILDlib/./src/client.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: Client, Agent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./client */ \"./src/client.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Client\", function() { return _client__WEBPACK_IMPORTED_MODULE_0__[\"Client\"]; });\n\n/* harmony import */ var _agent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./agent */ \"./src/agent.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Agent\", function() { return _agent__WEBPACK_IMPORTED_MODULE_1__[\"Agent\"]; });\n\n\n\n\n//# sourceURL=webpack://NGSILDlib/./src/index.js?");

/***/ }),

/***/ "axios":
/*!**************************************!*\
  !*** external {"commonjs2":"axios"} ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"axios\");\n\n//# sourceURL=webpack://NGSILDlib/external_%7B%22commonjs2%22:%22axios%22%7D?");

/***/ }),

/***/ "body-parser":
/*!********************************************!*\
  !*** external {"commonjs2":"body-parser"} ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"body-parser\");\n\n//# sourceURL=webpack://NGSILDlib/external_%7B%22commonjs2%22:%22body-parser%22%7D?");

/***/ }),

/***/ "express":
/*!****************************************!*\
  !*** external {"commonjs2":"express"} ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack://NGSILDlib/external_%7B%22commonjs2%22:%22express%22%7D?");

/***/ }),

/***/ "http":
/*!*************************************!*\
  !*** external {"commonjs2":"http"} ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"http\");\n\n//# sourceURL=webpack://NGSILDlib/external_%7B%22commonjs2%22:%22http%22%7D?");

/***/ }),

/***/ "jsonld":
/*!***************************************!*\
  !*** external {"commonjs2":"jsonld"} ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"jsonld\");\n\n//# sourceURL=webpack://NGSILDlib/external_%7B%22commonjs2%22:%22jsonld%22%7D?");

/***/ }),

/***/ "lodash":
/*!***************************************!*\
  !*** external {"commonjs2":"lodash"} ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"lodash\");\n\n//# sourceURL=webpack://NGSILDlib/external_%7B%22commonjs2%22:%22lodash%22%7D?");

/***/ })

/******/ });