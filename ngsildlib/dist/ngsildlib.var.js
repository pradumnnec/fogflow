var NGSILDlib =
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index_browser.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/client.js":
/*!***********************!*\
  !*** ./src/client.js ***!
  \***********************/
/*! exports provided: Client */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Client\", function() { return Client; });\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ \"axios\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var jsonld__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jsonld */ \"jsonld\");\n/* harmony import */ var jsonld__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jsonld__WEBPACK_IMPORTED_MODULE_1__);\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n\n\nvar Client =\n/*#__PURE__*/\nfunction () {\n  /*\n      //all entities\n      {{gatewayServer}}/ngsi-ld/v1/entities/\n      //Specific entity (byID)\n      {{gatewayServer}}/ngsi-ld/v1/entities/urn:ngsi-ld:Vehicle:A4569\n      //By attributes\n      {{gatewayServer}}/ngsi-ld/v1/entities?attrs=http://example.org/vehicle/brandName?attrs=http://example.org/vehicle/brandName\n      //By Id\n      {{gatewayServer}}/ngsi-ld/v1/entities?id=urn:ngsi-ld:Vehicle:A4569\n      //by Type\n      {{gatewayServer}}/ngsi-ld/v1/entities?type=http://example.org/vehicle/Vehicle\n      // by Id and Type\n      {{gatewayServer}}/ngsi-ld/v1/entities?id=urn:ngsi-ld:Vehicle:A4569&type=http://example.org/vehicle/Vehicle\n      //by IdPattern\n      {{gatewayServer}}/ngsi-ld/v1/entities?idPattern=urn:ngsi-ld:Vehicle:A.*\n  */\n  // initialized with the broker URL\n  function Client(brokerURL) {\n    _classCallCheck(this, Client);\n\n    this.brokerURL = \"localhost\";\n    this.queryById = \"/entities/\";\n    this.queryByType = \"/entities?type=\";\n    this.queryByAttrsP1 = \"/entities\";\n    this.queryByAttrsP2 = \"?attrs=\";\n    this.queryAllEntities = \"/entities/\";\n    this.subscribe = \"/subscriptions\";\n    this.brokerURL = brokerURL;\n    this.axios = axios__WEBPACK_IMPORTED_MODULE_0___default.a.create({\n      baseURL: brokerURL,\n      timeout: 1000,\n      headers: {\n        'accept': 'application/ld+json',\n        'content-type': 'application/ld+json'\n      }\n    });\n  }\n\n  _createClass(Client, [{\n    key: \"query\",\n    value: function query(id, type, attributes) {\n      var queryUrl = \"\"; //If only id is set\n\n      if (id != null && type == null && attributes == null) {\n        queryUrl += this.queryById + id;\n      } //If only type is set\n\n\n      if (id == null && type != null && attributes == null) {\n        queryUrl += this.queryByType + type;\n      } //If only attributes are set\n\n\n      if (id == null && type == null && attributes != null) {\n        queryUrl += this.queryByAttrsP1;\n\n        for (var i = 0; i < attributes.length; i++) {\n          queryUrl += this.queryByAttrsP2 + attributes[i];\n        }\n      } // If id and type are set\n\n\n      if (id != null && type != null && attributes == null) {\n        queryUrl += this.queryById + id + '&type=' + type;\n      }\n\n      return this.axios.get(queryUrl).then(function (response) {\n        console.log(\"REQUEST OK\");\n        console.log(response.data);\n        return response.data;\n      })[\"catch\"](function (error) {\n        console.log(\"ERROR\");\n        console.log(error.response.data);\n        return null;\n      });\n    }\n  }, {\n    key: \"update\",\n    value: function update(id, body) {\n      var queryUrl = \"\";\n\n      if (id != null) {\n        queryUrl += this.queryAllEntities + id + '/attrs';\n      }\n\n      console.log(queryUrl);\n      return this.axios.patch(queryUrl, body).then(function (response) {\n        console.log(response.data);\n        return response.data;\n      })[\"catch\"](function (error) {\n        console.log(\"REQUEST ERROR\");\n        console.log(error.response.data);\n        return null;\n      });\n    }\n  }, {\n    key: \"delete\",\n    value: function _delete(id) {\n      var queryUrl = \"\";\n\n      if (id != null) {\n        queryUrl += this.queryAllEntities + id;\n      }\n\n      return this.axios[\"delete\"](queryUrl).then(function (response) {\n        console.log(response.data);\n        return response.data;\n      })[\"catch\"](function (error) {\n        console.log(\"REQUEST ERROR\");\n        console.log(error.response.data);\n        return null;\n      });\n    }\n  }, {\n    key: \"register\",\n    value: function register(body) {\n      var queryUrl = this.queryAllEntities;\n      return this.axios.post(queryUrl, body).then(function (response) {\n        console.log(response.data);\n        return response.data;\n      })[\"catch\"](function (error) {\n        console.log(\"REQUEST ERROR\");\n        console.log(error.response.data);\n        return null;\n      });\n    }\n  }, {\n    key: \"subscribeContext\",\n    value: function subscribeContext(subscribeCtxReq) {\n      var queryUrl = this.subscribe;\n      return this.axios.post(queryUrl, subscribeCtxReq).then(function (response) {\n        console.log(response);\n        return response;\n      })[\"catch\"](function (error) {\n        console.log(\"REQUEST ERROR\");\n        console.log(error.response.data);\n        return null;\n      });\n    }\n  }]);\n\n  return Client;\n}();\n\n//# sourceURL=webpack://NGSILDlib/./src/client.js?");

/***/ }),

/***/ "./src/index_browser.js":
/*!******************************!*\
  !*** ./src/index_browser.js ***!
  \******************************/
/*! exports provided: Client */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./client */ \"./src/client.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Client\", function() { return _client__WEBPACK_IMPORTED_MODULE_0__[\"Client\"]; });\n\n\n\n//# sourceURL=webpack://NGSILDlib/./src/index_browser.js?");

/***/ }),

/***/ "axios":
/*!********************************!*\
  !*** external {"var":"axios"} ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = axios;\n\n//# sourceURL=webpack://NGSILDlib/external_%7B%22var%22:%22axios%22%7D?");

/***/ }),

/***/ "jsonld":
/*!*********************************!*\
  !*** external {"var":"jsonld"} ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = jsonld;\n\n//# sourceURL=webpack://NGSILDlib/external_%7B%22var%22:%22jsonld%22%7D?");

/***/ })

/******/ });