"use strict";
/**
 * Copyright 2015 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var apirequest_1 = require(__dirname + "/../node_modules/googleapis/build/src/lib/apirequest");
// TODO: We will eventually get the `any` in here cleared out, but in the interim we
// want to turn on no-implicit-any.
// tslint:disable: no-any
// tslint:disable: class-name
// tslint:disable: variable-name
// tslint:disable: jsdoc-format
// tslint:disable: no-namespace
var rcsbusinessmessaging_v1;
(function (rcsbusinessmessaging_v1) {
    /**
     * RCS Business Messaging API
     *
     *
     *
     * @example
     * const google = require('googleapis');
     * const rcsbusinessmessaging = google.rcsbusinessmessaging('v1');
     *
     * @namespace rcsbusinessmessaging
     * @type {Function}
     * @version v1
     * @variation v1
     * @param {object=} options Options for Rcsbusinessmessaging
     */
    var Rcsbusinessmessaging = /** @class */ (function () {
        function Rcsbusinessmessaging(options, google) {
            this.root = this;
            this._options = options || {};
            this.google = google;
            this.getRoot.bind(this);
            this.files = new Resource$Files(this);
            this.phones = new Resource$Phones(this);
        }
        Rcsbusinessmessaging.prototype.getRoot = function () {
            return this.root;
        };
        return Rcsbusinessmessaging;
    }());
    rcsbusinessmessaging_v1.Rcsbusinessmessaging = Rcsbusinessmessaging;
    var Resource$Files = /** @class */ (function () {
        function Resource$Files(root) {
            this.root = root;
            this.getRoot.bind(this);
        }
        Resource$Files.prototype.getRoot = function () {
            return this.root;
        };
        Resource$Files.prototype.create = function (params, options, callback) {
            if (typeof options === 'function') {
                callback = options;
                options = {};
            }
            if (typeof params === 'function') {
                callback = params;
                params = {};
            }
            options = options || {};
            var rootUrl = options.rootUrl || 'https://rcsbusinessmessaging.googleapis.com/';
            var parameters = {
                options: Object.assign({
                    url: (rootUrl + '/v1/files').replace(/([^:]\/)\/+/g, '$1'),
                    method: 'POST'
                }, options),
                params: params,
                requiredParams: [],
                pathParams: [],
                context: this.getRoot()
            };
            if (callback) {
                apirequest_1.createAPIRequest(parameters, callback);
            }
            else {
                return apirequest_1.createAPIRequest(parameters);
            }
        };
        return Resource$Files;
    }());
    rcsbusinessmessaging_v1.Resource$Files = Resource$Files;
    var Resource$Phones = /** @class */ (function () {
        function Resource$Phones(root) {
            this.root = root;
            this.getRoot.bind(this);
            this.agentEvents = new Resource$Phones$Agentevents(root);
            this.agentMessages = new Resource$Phones$Agentmessages(root);
            this.capability = new Resource$Phones$Capability(root);
            this.testers = new Resource$Phones$Testers(root);
        }
        Resource$Phones.prototype.getRoot = function () {
            return this.root;
        };
        Resource$Phones.prototype.getCapabilities = function (params, options, callback) {
            if (typeof options === 'function') {
                callback = options;
                options = {};
            }
            if (typeof params === 'function') {
                callback = params;
                params = {};
            }
            options = options || {};
            var rootUrl = options.rootUrl || 'https://rcsbusinessmessaging.googleapis.com/';
            var parameters = {
                options: Object.assign({
                    url: (rootUrl + '/v1/{+name}/capabilities').replace(/([^:]\/)\/+/g, '$1'),
                    method: 'GET'
                }, options),
                params: params,
                requiredParams: ['name'],
                pathParams: ['name'],
                context: this.getRoot()
            };
            if (callback) {
                apirequest_1.createAPIRequest(parameters, callback);
            }
            else {
                return apirequest_1.createAPIRequest(parameters);
            }
        };
        return Resource$Phones;
    }());
    rcsbusinessmessaging_v1.Resource$Phones = Resource$Phones;
    var Resource$Phones$Agentevents = /** @class */ (function () {
        function Resource$Phones$Agentevents(root) {
            this.root = root;
            this.getRoot.bind(this);
        }
        Resource$Phones$Agentevents.prototype.getRoot = function () {
            return this.root;
        };
        Resource$Phones$Agentevents.prototype.create = function (params, options, callback) {
            if (typeof options === 'function') {
                callback = options;
                options = {};
            }
            if (typeof params === 'function') {
                callback = params;
                params = {};
            }
            options = options || {};
            var rootUrl = options.rootUrl || 'https://rcsbusinessmessaging.googleapis.com/';
            var parameters = {
                options: Object.assign({
                    url: (rootUrl + '/v1/{+parent}/agentEvents').replace(/([^:]\/)\/+/g, '$1'),
                    method: 'POST'
                }, options),
                params: params,
                requiredParams: ['parent'],
                pathParams: ['parent'],
                context: this.getRoot()
            };
            if (callback) {
                apirequest_1.createAPIRequest(parameters, callback);
            }
            else {
                return apirequest_1.createAPIRequest(parameters);
            }
        };
        return Resource$Phones$Agentevents;
    }());
    rcsbusinessmessaging_v1.Resource$Phones$Agentevents = Resource$Phones$Agentevents;
    var Resource$Phones$Agentmessages = /** @class */ (function () {
        function Resource$Phones$Agentmessages(root) {
            this.root = root;
            this.getRoot.bind(this);
        }
        Resource$Phones$Agentmessages.prototype.getRoot = function () {
            return this.root;
        };
        Resource$Phones$Agentmessages.prototype.create = function (params, options, callback) {
            if (typeof options === 'function') {
                callback = options;
                options = {};
            }
            if (typeof params === 'function') {
                callback = params;
                params = {};
            }
            options = options || {};
            var rootUrl = options.rootUrl || 'https://rcsbusinessmessaging.googleapis.com/';
            var parameters = {
                options: Object.assign({
                    url: (rootUrl + '/v1/{+parent}/agentMessages').replace(/([^:]\/)\/+/g, '$1'),
                    method: 'POST'
                }, options),
                params: params,
                requiredParams: ['parent'],
                pathParams: ['parent'],
                context: this.getRoot()
            };
            if (callback) {
                apirequest_1.createAPIRequest(parameters, callback);
            }
            else {
                return apirequest_1.createAPIRequest(parameters);
            }
        };
        Resource$Phones$Agentmessages.prototype.delete = function (params, options, callback) {
            if (typeof options === 'function') {
                callback = options;
                options = {};
            }
            if (typeof params === 'function') {
                callback = params;
                params = {};
            }
            options = options || {};
            var rootUrl = options.rootUrl || 'https://rcsbusinessmessaging.googleapis.com/';
            var parameters = {
                options: Object.assign({
                    url: (rootUrl + '/v1/{+name}').replace(/([^:]\/)\/+/g, '$1'),
                    method: 'DELETE'
                }, options),
                params: params,
                requiredParams: ['name'],
                pathParams: ['name'],
                context: this.getRoot()
            };
            if (callback) {
                apirequest_1.createAPIRequest(parameters, callback);
            }
            else {
                return apirequest_1.createAPIRequest(parameters);
            }
        };
        return Resource$Phones$Agentmessages;
    }());
    rcsbusinessmessaging_v1.Resource$Phones$Agentmessages = Resource$Phones$Agentmessages;
    var Resource$Phones$Capability = /** @class */ (function () {
        function Resource$Phones$Capability(root) {
            this.root = root;
            this.getRoot.bind(this);
        }
        Resource$Phones$Capability.prototype.getRoot = function () {
            return this.root;
        };
        Resource$Phones$Capability.prototype.requestCapabilityCallback = function (params, options, callback) {
            if (typeof options === 'function') {
                callback = options;
                options = {};
            }
            if (typeof params === 'function') {
                callback = params;
                params = {};
            }
            options = options || {};
            var rootUrl = options.rootUrl || 'https://rcsbusinessmessaging.googleapis.com/';
            var parameters = {
                options: Object.assign({
                    url: (rootUrl + '/v1/{+name}/capability:requestCapabilityCallback').replace(/([^:]\/)\/+/g, '$1'),
                    method: 'POST'
                }, options),
                params: params,
                requiredParams: ['name'],
                pathParams: ['name'],
                context: this.getRoot()
            };
            if (callback) {
                apirequest_1.createAPIRequest(parameters, callback);
            }
            else {
                return apirequest_1.createAPIRequest(parameters);
            }
        };
        return Resource$Phones$Capability;
    }());
    rcsbusinessmessaging_v1.Resource$Phones$Capability = Resource$Phones$Capability;
    var Resource$Phones$Testers = /** @class */ (function () {
        function Resource$Phones$Testers(root) {
            this.root = root;
            this.getRoot.bind(this);
        }
        Resource$Phones$Testers.prototype.getRoot = function () {
            return this.root;
        };
        Resource$Phones$Testers.prototype.create = function (params, options, callback) {
            if (typeof options === 'function') {
                callback = options;
                options = {};
            }
            if (typeof params === 'function') {
                callback = params;
                params = {};
            }
            options = options || {};
            var rootUrl = options.rootUrl || 'https://rcsbusinessmessaging.googleapis.com/';
            var parameters = {
                options: Object.assign({
                    url: (rootUrl + '/v1/{+parent}/testers').replace(/([^:]\/)\/+/g, '$1'),
                    method: 'POST'
                }, options),
                params: params,
                requiredParams: ['parent'],
                pathParams: ['parent'],
                context: this.getRoot()
            };
            if (callback) {
                apirequest_1.createAPIRequest(parameters, callback);
            }
            else {
                return apirequest_1.createAPIRequest(parameters);
            }
        };
        return Resource$Phones$Testers;
    }());
    rcsbusinessmessaging_v1.Resource$Phones$Testers = Resource$Phones$Testers;
})(rcsbusinessmessaging_v1 = exports.rcsbusinessmessaging_v1 || (exports.rcsbusinessmessaging_v1 = {}));
//# sourceMappingURL=v1.js.map