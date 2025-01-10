(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("quill"));
	else if(typeof define === 'function' && define.amd)
		define(["quill"], factory);
	else if(typeof exports === 'object')
		exports["quillTable"] = factory(require("quill"));
	else
		root["quillTable"] = factory(root["Quill"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE__0__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdatequillTable"];
/******/ 	window["webpackHotUpdatequillTable"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		document.head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "dcb7ec70d640ea1dde5f";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_selfInvalidated: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 			invalidate: function() {
/******/ 				this._selfInvalidated = true;
/******/ 				switch (hotStatus) {
/******/ 					case "idle":
/******/ 						hotUpdate = {};
/******/ 						hotUpdate[moduleId] = modules[moduleId];
/******/ 						hotSetStatus("ready");
/******/ 						break;
/******/ 					case "ready":
/******/ 						hotApplyInvalidatedModule(moduleId);
/******/ 						break;
/******/ 					case "prepare":
/******/ 					case "check":
/******/ 					case "dispose":
/******/ 					case "apply":
/******/ 						(hotQueuedInvalidatedModules =
/******/ 							hotQueuedInvalidatedModules || []).push(moduleId);
/******/ 						break;
/******/ 					default:
/******/ 						// ignore requests in error states
/******/ 						break;
/******/ 				}
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash, hotQueuedInvalidatedModules;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus(hotApplyInvalidatedModules() ? "ready" : "idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = 3;
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/ 		return hotApplyInternal(options);
/******/ 	}
/******/
/******/ 	function hotApplyInternal(options) {
/******/ 		hotApplyInvalidatedModules();
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (
/******/ 					!module ||
/******/ 					(module.hot._selfAccepted && !module.hot._selfInvalidated)
/******/ 				)
/******/ 					continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted &&
/******/ 				// removed self-accepted modules should not be required
/******/ 				appliedUpdate[moduleId] !== warnUnexpectedRequire &&
/******/ 				// when called invalidate self-accepting is not possible
/******/ 				!installedModules[moduleId].hot._selfInvalidated
/******/ 			) {
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					parents: installedModules[moduleId].parents.slice(),
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		if (hotUpdateNewHash !== undefined) {
/******/ 			hotCurrentHash = hotUpdateNewHash;
/******/ 			hotUpdateNewHash = undefined;
/******/ 		}
/******/ 		hotUpdate = undefined;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = item.parents;
/******/ 			hotCurrentChildModule = moduleId;
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		if (hotQueuedInvalidatedModules) {
/******/ 			return hotApplyInternal(options).then(function(list) {
/******/ 				outdatedModules.forEach(function(moduleId) {
/******/ 					if (list.indexOf(moduleId) < 0) list.push(moduleId);
/******/ 				});
/******/ 				return list;
/******/ 			});
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	function hotApplyInvalidatedModules() {
/******/ 		if (hotQueuedInvalidatedModules) {
/******/ 			if (!hotUpdate) hotUpdate = {};
/******/ 			hotQueuedInvalidatedModules.forEach(hotApplyInvalidatedModule);
/******/ 			hotQueuedInvalidatedModules = undefined;
/******/ 			return true;
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApplyInvalidatedModule(moduleId) {
/******/ 		if (!Object.prototype.hasOwnProperty.call(hotUpdate, moduleId))
/******/ 			hotUpdate[moduleId] = modules[moduleId];
/******/ 	}
/******/
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
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
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
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(3)(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__0__;

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external {"commonjs":"quill","commonjs2":"quill","amd":"quill","root":"Quill"}
var external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_ = __webpack_require__(0);
var external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default = /*#__PURE__*/__webpack_require__.n(external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_);

// CONCATENATED MODULE: ./src/utils/index.js
function css(domNode, rules) {
  if (typeof rules === 'object') {
    for (let prop in rules) {
      domNode.style[prop] = rules[prop];
    }
  }
}

/**
 * getRelativeRect
 * @param  {Object} targetRect  rect data for target element
 * @param  {Element} container  container element
 * @return {Object}             an object with rect data
 */
function getRelativeRect(targetRect, container) {
  let containerRect = container.getBoundingClientRect();
  return {
    x: targetRect.x - containerRect.x - container.scrollLeft,
    y: targetRect.y - containerRect.y - container.scrollTop,
    x1: targetRect.x - containerRect.x - container.scrollLeft + targetRect.width,
    y1: targetRect.y - containerRect.y - container.scrollTop + targetRect.height,
    width: targetRect.width,
    height: targetRect.height
  };
}

/**
 * _omit
 * @param  {Object} obj         target Object
 * @param  {Array} uselessKeys  keys of removed properties
 * @return {Object}             new Object without useless properties
 */
function _omit(obj, uselessKeys) {
  return obj && Object.keys(obj).reduce((acc, key) => {
    return uselessKeys.includes(key) ? acc : Object.assign({}, acc, {
      [key]: obj[key]
    });
  }, {});
}

/**
 * getEventComposedPath
 *  compatibility fixed for Event.path/Event.composedPath
 *  Event.path is only for chrome/opera
 *  Event.composedPath is for Safari, FF
 *  Neither for Micro Edge
 * @param {Event} evt
 * @return {Array} an array of event.path
 */
function getEventComposedPath(evt) {
  let path;
  // chrome, opera, safari, firefox
  path = evt.path || evt.composedPath && evt.composedPath();

  // other: edge
  if (path === undefined && evt.target) {
    path = [];
    let target = evt.target;
    path.push(target);
    while (target && target.parentNode) {
      target = target.parentNode;
      path.push(target);
    }
  }
  return path;
}
function convertToHex(rgb) {
  const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  // if rgb
  if (/^(rgb|RGB)/.test(rgb)) {
    const color = rgb.toString().match(/\d+/g);
    let hex = '#';
    for (let i = 0; i < 3; i++) {
      hex += ('0' + Number(color[i]).toString(16)).slice(-2);
    }
    return hex;
  } else if (reg.test(rgb)) {
    const aNum = rgb.replace(/#/, '').split('');
    if (aNum.length === 6) {
      return rgb;
    } else if (aNum.length === 3) {
      let numHex = '#';
      for (let index = 0; index < aNum.length; index += 1) {
        numHex += aNum[index] + aNum[index];
      }
      return numHex;
    }
  }
  return rgb;
}
// CONCATENATED MODULE: ./src/contants/index.js
const ERROR_LIMIT = 5;
const COL_TOOL_HEIGHT = 12;
const COL_TOOL_CELL_HEIGHT = 12;
const ROW_TOOL_WIDTH = 12;
const CELL_MIN_WIDTH = 50;
const PRIMARY_COLOR = '#35A7ED';

// CONCATENATED MODULE: ./src/modules/table-column-tool.js



class table_column_tool_TableColumnTool {
  constructor(table, quill, options) {
    if (!table) return null;
    this.table = table;
    this.quill = quill;
    this.options = options;
    this.domNode = null;
    this.isTouchDevice = this.checkTouchDevice();
    this.initColTool();
  }
  initColTool() {
    const parent = this.quill.root.parentNode;
    this.domNode = document.createElement('div');
    this.domNode.classList.add('quill-table-col-tool');
    this.updateToolCells();
    parent.appendChild(this.domNode);
    this.updateToolWidth();
  }
  createToolCell(isClassName = true) {
    const toolCell = document.createElement('div');
    toolCell.classList.add('quill-table-col-tool__cell');
    const resizeHolder = document.createElement('div');
    if (isClassName) {
      this.setCellResizeHolderClass(resizeHolder);
    }
    css(toolCell, {
      height: `${COL_TOOL_CELL_HEIGHT}px`
    });
    toolCell.appendChild(resizeHolder);
    return toolCell;
  }
  setCellResizeHolderClass(holder) {
    holder.classList.add('quill-table-col-tool__cell-holder');
  }
  updateToolWidth() {
    const tableViewRect = this.table.parentNode.getBoundingClientRect();
    const parent = this.quill.root.parentNode;
    css(this.domNode, {
      width: `${tableViewRect.width}px`,
      height: '12px',
      left: `${this.table.offsetLeft + parent.scrollLeft}px`,
      top: `${this.table.offsetTop + parent.scrollTop - COL_TOOL_HEIGHT + 2}px`
    });
  }
  updateToolCells() {
    return new Promise(resolve => {
      setTimeout(() => {
        const tableContainer = external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.find(this.table);
        const CellsInFirstRow = tableContainer.children.tail.children.head.children;
        const tableCols = tableContainer.colGroup().children;
        const tableWidth = tableContainer.children.tail.domNode.clientWidth;
        const cellsNumber = computeCellsNumber(CellsInFirstRow);
        let existCells = Array.from(this.domNode.querySelectorAll('.quill-table-col-tool__cell'));
        const totalCount = Math.max(cellsNumber, existCells.length);
        for (let index = 0; index < totalCount; index++) {
          let col = tableCols.at(index);
          let colWidth = col && col.attributes.domNode.clientWidth;
          // if cell already exist
          let toolCell = null;
          if (!existCells[index]) {
            toolCell = this.createToolCell(index + 1 !== totalCount);
            this.domNode.appendChild(toolCell);
            this.addColCellHolderHandler(toolCell);
            // set tool cell width
            const colWidthRate = colWidth / tableWidth * 100;
            css(toolCell, {
              width: `${colWidthRate}%`
            });
          } else if (existCells[index] && index >= cellsNumber) {
            existCells[index].remove();
          } else {
            toolCell = existCells[index];
            const colWidthRate = colWidth / tableWidth * 100;
            // set tool cell width
            css(toolCell, {
              width: `${colWidthRate}%`
            });

            // if cell was last cell
            // add them resize holder
            const orderByIndex = index + 1;
            if (orderByIndex === existCells.length && orderByIndex < totalCount) {
              const holderElement = toolCell.querySelector('div');
              if (!holderElement) {
                continue;
              }
              this.setCellResizeHolderClass(holderElement);
              this.addColCellHolderHandler(toolCell);
            }
          }
        }
        resolve();
      }, 0);
    });
  }
  destroy() {
    this.domNode.remove();
    return null;
  }
  addColCellHolderHandler(cell) {
    const tableContainer = external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.find(this.table);
    const $holder = cell.querySelector('.quill-table-col-tool__cell-holder');
    let dragging = false;
    let x0 = 0;
    let x = 0;
    let delta = 0;
    let width0 = 0;
    // helpLine relation varrible
    let tableRect = {};
    let cellRect = {};
    let $helpLine = null;
    let previousLeftPosition = 0;
    const handleDrag = e => {
      e.preventDefault();
      if (dragging) {
        x = this.getClientXFromEvent(e);
        let prevDelta = delta;
        if (width0 + x - x0 >= CELL_MIN_WIDTH) {
          delta = x - x0;
        } else {
          delta = CELL_MIN_WIDTH - width0;
        }
        let helplineLeftPosition = cellRect.left + cellRect.width - 1 + delta;
        const nextCol = $holder.parentNode.nextSibling;
        if (!nextCol) {
          css($helpLine, {
            left: `${helplineLeftPosition}px`
          });
          previousLeftPosition = helplineLeftPosition;
        }
        const {
          left,
          width
        } = nextCol.getBoundingClientRect();
        if (width + left - helplineLeftPosition > CELL_MIN_WIDTH) {
          css($helpLine, {
            left: `${helplineLeftPosition}px`
          });
          previousLeftPosition = helplineLeftPosition;
          return;
        }
        css($helpLine, {
          left: `${previousLeftPosition}px`
        });
        delta = prevDelta;
      }
    };
    const handleMouseup = e => {
      e.preventDefault();
      const existCells = Array.from(this.domNode.querySelectorAll('.quill-table-col-tool__cell'));
      const colIndex = existCells.indexOf(cell);
      const colBlot = tableContainer.colGroup().children.at(colIndex);
      const nextColBlot = colBlot.next;
      const nextCell = nextColBlot.domNode;
      const nextCellWidth = nextCell.clientWidth;
      if (dragging) {
        colBlot.format('width', width0 + delta);
        nextColBlot.format('width', nextCellWidth - delta);
        x0 = 0;
        x = 0;
        delta = 0;
        width0 = 0;
        dragging = false;
        $holder.classList.remove('dragging');
      }
      document.removeEventListener('mousemove', handleDrag, false);
      document.removeEventListener('mouseup', handleMouseup, false);
      if (this.isTouchDevice) {
        document.removeEventListener('touchmove', handleDrag, false);
        document.removeEventListener('touchend', handleMouseup, false);
      }
      tableRect = {};
      cellRect = {};
      $helpLine.remove();
      $helpLine = null;
      tableContainer.updateTableWidth();
      const tableSelection = this.quill.getModule('quill-table').tableSelection;
      tableSelection && tableSelection.clearSelection();
      this.updateToolCells();
    };
    const handleMousedown = e => {
      document.addEventListener('mousemove', handleDrag, false);
      document.addEventListener('mouseup', handleMouseup, false);
      if (this.isTouchDevice) {
        document.addEventListener('touchmove', handleDrag, false);
        document.addEventListener('touchend', handleMouseup, false);
      }
      tableRect = this.table.getBoundingClientRect();
      cellRect = cell.getBoundingClientRect();
      $helpLine = document.createElement('div');
      css($helpLine, {
        position: 'fixed',
        top: `${cellRect.top}px`,
        left: `${cellRect.left + cellRect.width - 1}px`,
        zIndex: '100',
        height: `${tableRect.height + COL_TOOL_HEIGHT + 4}px`,
        width: '1px',
        backgroundColor: PRIMARY_COLOR
      });
      document.body.appendChild($helpLine);
      dragging = true;
      x0 = this.getClientXFromEvent(e);
      width0 = cellRect.width;
      $holder.classList.add('dragging');
    };
    if ($holder !== null) {
      $holder.addEventListener('mousedown', handleMousedown, false);
      ['dragstart', 'dragenter', 'ondragover', 'drag', 'drop'].forEach(eventName => {
        $holder.addEventListener(eventName, e => {
          e.preventDefault();
          e.stopPropagation();
        }, false);
      });
      if (this.isTouchDevice) {
        $holder.addEventListener('touchstart', handleMousedown, false);
      }
    }
  }
  colToolCells() {
    return Array.from(this.domNode.querySelectorAll('.quill-table-col-tool__cell'));
  }
  checkTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
  }
  getClientXFromEvent(e) {
    return this.isTouchDevice ? e.touches[0].clientX : e.clientX;
  }
}
function computeCellsNumber(CellsInFirstRow) {
  return CellsInFirstRow.reduce((sum, cell) => {
    const cellColspan = cell.formats().colspan;
    sum = sum + parseInt(cellColspan, 10);
    return sum;
  }, 0);
}
// CONCATENATED MODULE: ./src/formats/header.js


const Block = external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.import('blots/block');
class header_Header extends Block {
  static create(value) {
    if (typeof value === 'string') {
      value = {
        value
      };
    }
    const node = super.create(value.value);
    CELL_IDENTITY_KEYS.forEach(key => {
      if (value[key]) node.setAttribute(`data-${key}`, value[key]);
    });
    CELL_ATTRIBUTES.forEach(key => {
      if (value[key]) node.setAttribute(`data-${key}`, value[key]);
    });
    return node;
  }
  static formats(domNode) {
    const formats = {};
    formats.value = this.tagName.indexOf(domNode.tagName) + 1;
    return CELL_ATTRIBUTES.concat(CELL_IDENTITY_KEYS).reduce((formats, attribute) => {
      if (domNode.hasAttribute(`data-${attribute}`)) {
        formats[attribute] = domNode.getAttribute(`data-${attribute}`) || undefined;
      }
      return formats;
    }, formats);
  }
  format(name, value) {
    const {
      row,
      cell,
      rowspan,
      colspan
    } = header_Header.formats(this.domNode);
    if (name === header_Header.blotName) {
      if (value) {
        super.format(name, {
          value,
          row,
          cell,
          rowspan,
          colspan
        });
      } else if (row) {
        this.replaceWith(TableCellLine.blotName, {
          row,
          cell,
          rowspan,
          colspan
        });
      } else {
        super.format(name, value);
      }
    } else {
      super.format(name, value);
    }
  }
  optimize() {
    const {
      row,
      rowspan,
      colspan
    } = header_Header.formats(this.domNode);
    if (row && !(this.parent instanceof TableCell)) {
      this.wrap(TableCell.blotName, {
        row,
        colspan,
        rowspan
      });
    }

    // ShadowBlot optimize
    this.enforceAllowedChildren();
    if (this.uiNode != null && this.uiNode !== this.domNode.firstChild) {
      this.domNode.insertBefore(this.uiNode, this.domNode.firstChild);
    }
    if (this.children.length === 0) {
      if (this.statics.defaultChild != null) {
        const child = this.scroll.create(this.statics.defaultChild.blotName);
        this.appendChild(child);
      } else {
        this.remove();
      }
    }
    // Block optimize
    this.cache = {};
  }
}
header_Header.blotName = 'header';
header_Header.tagName = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'];
/* harmony default export */ var header = (header_Header);
// CONCATENATED MODULE: ./src/formats/table.js




const Break = external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.import('blots/break');
const table_Block = external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.import('blots/block');
const Container = external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.import('blots/container');
const COL_ATTRIBUTES = ['width'];
const COL_DEFAULT = {
  width: 100
};
const CELL_IDENTITY_KEYS = ['row', 'cell'];
const CELL_ATTRIBUTES = ['rowspan', 'colspan'];
const CELL_DEFAULT = {
  rowspan: 1,
  colspan: 1
};
class TableCellLine extends table_Block {
  static create(value) {
    const node = super.create(value);
    CELL_IDENTITY_KEYS.forEach(key => {
      let identityMaker = key === 'row' ? table_rowId : table_cellId;
      node.setAttribute(`data-${key}`, value[key] || identityMaker());
    });
    CELL_ATTRIBUTES.forEach(attrName => {
      node.setAttribute(`data-${attrName}`, value[attrName] || CELL_DEFAULT[attrName]);
    });
    if (value['cell-bg']) {
      node.setAttribute('data-cell-bg', value['cell-bg']);
    }
    return node;
  }
  static formats(domNode) {
    const formats = {};
    return CELL_ATTRIBUTES.concat(CELL_IDENTITY_KEYS).concat(['cell-bg']).reduce((formats, attribute) => {
      if (domNode.hasAttribute(`data-${attribute}`)) {
        formats[attribute] = domNode.getAttribute(`data-${attribute}`) || undefined;
      }
      return formats;
    }, formats);
  }
  format(name, value) {
    if (CELL_ATTRIBUTES.concat(CELL_IDENTITY_KEYS).indexOf(name) > -1) {
      if (value) {
        this.domNode.setAttribute(`data-${name}`, value);
      } else {
        this.domNode.removeAttribute(`data-${name}`);
      }
    } else if (name === 'cell-bg') {
      if (value) {
        this.domNode.setAttribute('data-cell-bg', value);
      } else {
        this.domNode.removeAttribute('data-cell-bg');
      }
    } else if (name === 'header') {
      if (!value) return;
      const {
        row,
        cell,
        rowspan,
        colspan
      } = TableCellLine.formats(this.domNode);
      super.format(name, {
        value,
        row,
        cell,
        rowspan,
        colspan
      });
    } else {
      super.format(name, value);
    }
  }
  optimize(context) {
    // cover shadowBlot's wrap call, pass params parentBlot initialize
    // needed
    const rowId = this.domNode.getAttribute('data-row');
    const rowspan = this.domNode.getAttribute('data-rowspan');
    const colspan = this.domNode.getAttribute('data-colspan');
    const cellBg = this.domNode.getAttribute('data-cell-bg');
    if (this.statics.requiredContainer && !(this.parent instanceof this.statics.requiredContainer)) {
      this.wrap(this.statics.requiredContainer.blotName, {
        row: rowId,
        colspan,
        rowspan,
        'cell-bg': cellBg
      });
    }
    super.optimize(context);
  }
  tableCell() {
    return this.parent;
  }
}
TableCellLine.blotName = 'table-cell-line';
TableCellLine.className = 'quill-table__cell-line';
TableCellLine.tagName = 'P';
class TableCell extends Container {
  checkMerge() {
    if (super.checkMerge() && this.next.children.head != null) {
      const thisHead = this.children.head.formats()[this.children.head.statics.blotName];
      const thisTail = this.children.tail.formats()[this.children.tail.statics.blotName];
      const nextHead = this.next.children.head.formats()[this.next.children.head.statics.blotName];
      const nextTail = this.next.children.tail.formats()[this.next.children.tail.statics.blotName];
      return thisHead.cell === thisTail.cell && thisHead.cell === nextHead.cell && thisHead.cell === nextTail.cell;
    }
    return false;
  }
  static create(value) {
    const node = super.create(value);
    node.setAttribute('data-row', value.row);
    CELL_ATTRIBUTES.forEach(attrName => {
      if (value[attrName]) {
        node.setAttribute(attrName, value[attrName]);
      }
    });
    if (value['cell-bg']) {
      node.setAttribute('data-cell-bg', value['cell-bg']);
      node.style.backgroundColor = value['cell-bg'];
    }
    return node;
  }
  static formats(domNode) {
    const formats = {};
    if (domNode.hasAttribute('data-row')) {
      formats.row = domNode.getAttribute('data-row');
    }
    if (domNode.hasAttribute('data-cell-bg')) {
      formats['cell-bg'] = domNode.getAttribute('data-cell-bg');
    }
    return CELL_ATTRIBUTES.reduce((formats, attribute) => {
      if (domNode.hasAttribute(attribute)) {
        formats[attribute] = domNode.getAttribute(attribute);
      }
      return formats;
    }, formats);
  }
  cellOffset() {
    if (this.parent) {
      return this.parent.children.indexOf(this);
    }
    return -1;
  }
  formats() {
    const formats = {};
    if (this.domNode.hasAttribute('data-row')) {
      formats.row = this.domNode.getAttribute('data-row');
    }
    if (this.domNode.hasAttribute('data-cell-bg')) {
      formats['cell-bg'] = this.domNode.getAttribute('data-cell-bg');
    }
    return CELL_ATTRIBUTES.reduce((formats, attribute) => {
      if (this.domNode.hasAttribute(attribute)) {
        formats[attribute] = this.domNode.getAttribute(attribute);
      }
      return formats;
    }, formats);
  }
  toggleAttribute(name, value) {
    if (value) {
      this.domNode.setAttribute(name, value);
    } else {
      this.domNode.removeAttribute(name);
    }
  }
  formatChildren(name, value) {
    this.children.forEach(child => {
      child.format(name, value);
    });
  }
  format(name, value) {
    if (CELL_ATTRIBUTES.indexOf(name) > -1) {
      this.toggleAttribute(name, value);
      this.formatChildren(name, value);
    } else if (['row'].indexOf(name) > -1) {
      this.toggleAttribute(`data-${name}`, value);
      this.formatChildren(name, value);
    } else if (name === 'cell-bg') {
      this.toggleAttribute('data-cell-bg', value);
      this.formatChildren(name, value);
      if (value) {
        this.domNode.style.backgroundColor = value;
      } else {
        this.domNode.style.backgroundColor = 'initial';
      }
    } else {
      super.format(name, value);
    }
  }
  optimize(context) {
    const rowId = this.domNode.getAttribute('data-row');
    if (this.statics.requiredContainer && !(this.parent instanceof this.statics.requiredContainer)) {
      this.wrap(this.statics.requiredContainer.blotName, {
        row: rowId
      });
    }
    super.optimize(context);
  }
  row() {
    return this.parent;
  }
  rowOffset() {
    if (this.row()) {
      return this.row().rowOffset();
    }
    return -1;
  }
  table() {
    return this.row() && this.row().table();
  }
}
TableCell.blotName = 'table';
TableCell.className = 'quill-table__cell';
TableCell.tagName = 'TD';
class TableRow extends Container {
  checkMerge() {
    if (super.checkMerge() && this.next.children.head != null) {
      const thisHead = this.children.head.formats();
      const thisTail = this.children.tail.formats();
      const nextHead = this.next.children.head.formats();
      const nextTail = this.next.children.tail.formats();
      return thisHead.row === thisTail.row && thisHead.row === nextHead.row && thisHead.row === nextTail.row;
    }
    return false;
  }
  static create(value) {
    const node = super.create(value);
    node.setAttribute('data-row', value.row);
    return node;
  }
  formats() {
    return ['row'].reduce((formats, attrName) => {
      if (this.domNode.hasAttribute(`data-${attrName}`)) {
        formats[attrName] = this.domNode.getAttribute(`data-${attrName}`);
      }
      return formats;
    }, {});
  }
  optimize() {
    // optimize function of ShadowBlot
    if (this.statics.requiredContainer && !(this.parent instanceof this.statics.requiredContainer)) {
      this.wrap(this.statics.requiredContainer.blotName);
    }

    // optimize function of ParentBlot
    // note: modified this optimize function because
    // TableRow should not be removed when the length of its children was 0
    this.enforceAllowedChildren();
    if (this.uiNode != null && this.uiNode !== this.domNode.firstChild) {
      this.domNode.insertBefore(this.uiNode, this.domNode.firstChild);
    }

    // optimize function of ContainerBlot
    if (this.children.length > 0 && this.next != null && this.checkMerge()) {
      this.next.moveChildren(this);
      this.next.remove();
    }
  }
  rowOffset() {
    if (this.parent) {
      return this.parent.children.indexOf(this);
    }
    return -1;
  }
  table() {
    return this.parent && this.parent.parent;
  }
}
TableRow.blotName = 'table-row';
TableRow.tagName = 'TR';
class TableBody extends Container {}
TableBody.blotName = 'table-body';
TableBody.tagName = 'TBODY';
class TableCol extends table_Block {
  static create(value) {
    let node = super.create(value);
    COL_ATTRIBUTES.forEach(attrName => {
      node.setAttribute(`${attrName}`, value[attrName] || COL_DEFAULT[attrName]);
    });
    return node;
  }
  static formats(domNode) {
    return COL_ATTRIBUTES.reduce((formats, attribute) => {
      if (domNode.hasAttribute(`${attribute}`)) {
        formats[attribute] = domNode.getAttribute(`${attribute}`) || undefined;
      }
      return formats;
    }, {});
  }
  formats(value) {
    const superFormats = super.formats();
    if (value) {
      this.domNode.setAttribute('width', value);
    }
    return superFormats;
  }
  format(name, value) {
    if (COL_ATTRIBUTES.indexOf(name) > -1) {
      this.domNode.setAttribute(`${name}`, value || COL_DEFAULT[name]);
    } else {
      super.format(name, value);
    }
  }
  html() {
    return this.domNode.outerHTML;
  }
}
TableCol.blotName = 'table-col';
TableCol.tagName = 'col';
class TableColGroup extends Container {}
TableColGroup.blotName = 'table-col-group';
TableColGroup.tagName = 'colgroup';
class table_TableContainer extends Container {
  static create() {
    return super.create();
  }
  constructor(scroll, domNode) {
    super(scroll, domNode);
    this.updateTableWidth();
  }
  updateTableWidth() {
    setTimeout(() => {
      const colGroup = this.colGroup();
      if (!colGroup) return;
      const tableWidth = this.domNode.clientWidth;

      // 需要进行 100% 宽度格式化的场景
      //    1. 全部列宽度都是非 % 结尾
      //    2. 不全是 % 结尾
      colGroup.children.reduce((_, col) => {
        const colWidthRate = (col.domNode.clientWidth / tableWidth * 100).toFixed(2);
        col.formats(colWidthRate + '%');
        return null;
      });
      // this.domNode.style.width = `100%`
    }, 0);
  }
  cells(column) {
    return this.rows().map(row => row.children.at(column));
  }
  colGroup() {
    return this.children.head;
  }
  deleteColumns(compareRect, delIndexes = [], editorWrapper) {
    const [body] = this.descendants(TableBody);
    if (body == null || body.children.head == null) return;
    const tableCells = this.descendants(TableCell);
    const removedCells = [];
    const modifiedCells = [];
    tableCells.forEach(cell => {
      const cellRect = getRelativeRect(cell.domNode.getBoundingClientRect(), editorWrapper);
      if (cellRect.x + ERROR_LIMIT > compareRect.x && cellRect.x1 - ERROR_LIMIT < compareRect.x1) {
        removedCells.push(cell);
      } else if (cellRect.x < compareRect.x + ERROR_LIMIT && cellRect.x1 > compareRect.x1 - ERROR_LIMIT) {
        modifiedCells.push(cell);
      }
    });
    if (removedCells.length === tableCells.length) {
      this.tableDestroy();
      return true;
    }

    // remove the matches column tool cell
    delIndexes.forEach(() => {
      this.colGroup().children.at(delIndexes[0]).remove();
    });
    removedCells.forEach(cell => {
      cell.remove();
    });
    modifiedCells.forEach(cell => {
      const cellColspan = parseInt(cell.formats().colspan, 10);
      // const cellWidth = parseInt(cell.formats().width, 10)
      cell.format('colspan', cellColspan - delIndexes.length);
    });
    this.updateTableWidth();
  }
  deleteRow(compareRect, editorWrapper) {
    const [body] = this.descendants(TableBody);
    if (body == null || body.children.head == null) return;
    const tableCells = this.descendants(TableCell);
    const tableRows = this.descendants(TableRow);
    const removedCells = []; // cells to be removed
    const modifiedCells = []; // cells to be modified
    const fallCells = []; // cells to fall into next row

    // compute rows to remove
    // bugfix: #21 There will be a empty tr left if delete the last row of a table
    const removedRows = tableRows.filter(row => {
      const rowRect = getRelativeRect(row.domNode.getBoundingClientRect(), editorWrapper);
      return rowRect.y > compareRect.y - ERROR_LIMIT && rowRect.y1 < compareRect.y1 + ERROR_LIMIT;
    });
    tableCells.forEach(cell => {
      const cellRect = getRelativeRect(cell.domNode.getBoundingClientRect(), editorWrapper);
      if (cellRect.y > compareRect.y - ERROR_LIMIT && cellRect.y1 < compareRect.y1 + ERROR_LIMIT) {
        removedCells.push(cell);
      } else if (cellRect.y < compareRect.y + ERROR_LIMIT && cellRect.y1 > compareRect.y1 - ERROR_LIMIT) {
        modifiedCells.push(cell);
        if (Math.abs(cellRect.y - compareRect.y) < ERROR_LIMIT) {
          fallCells.push(cell);
        }
      }
    });
    if (removedCells.length === tableCells.length) {
      this.tableDestroy();
      return;
    }

    // compute length of removed rows
    const removedRowsLength = this.rows().reduce((sum, row) => {
      let rowRect = getRelativeRect(row.domNode.getBoundingClientRect(), editorWrapper);
      if (rowRect.y > compareRect.y - ERROR_LIMIT && rowRect.y1 < compareRect.y1 + ERROR_LIMIT) {
        sum += 1;
      }
      return sum;
    }, 0);

    // it must excute before the table layout changed with other operation
    fallCells.forEach(cell => {
      const cellRect = getRelativeRect(cell.domNode.getBoundingClientRect(), editorWrapper);
      const nextRow = cell.parent.next;
      const cellsInNextRow = nextRow.children;
      const refCell = cellsInNextRow.reduce((ref, compareCell) => {
        const compareRect = getRelativeRect(compareCell.domNode.getBoundingClientRect(), editorWrapper);
        if (Math.abs(cellRect.x1 - compareRect.x) < ERROR_LIMIT) {
          ref = compareCell;
        }
        return ref;
      }, null);
      nextRow.insertBefore(cell, refCell);
      cell.format('row', nextRow.formats().row);
    });
    removedCells.forEach(cell => {
      cell.remove();
    });
    modifiedCells.forEach(cell => {
      const cellRowspan = parseInt(cell.formats().rowspan, 10);
      cell.format('rowspan', cellRowspan - removedRowsLength);
    });

    // remove selected rows
    removedRows.forEach(row => row.remove());
  }
  tableDestroy() {
    const quill = external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.find(this.scroll.domNode.parentNode);
    const tableModule = quill.getModule('quill-table');
    this.remove();
    tableModule.hideTableTools();
    quill.update(external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.sources.USER);
  }
  insertCell(tableRow, ref) {
    const id = table_cellId();
    const rId = tableRow.formats().row;
    const tableCell = this.scroll.create(TableCell.blotName, Object.assign({}, CELL_DEFAULT, {
      row: rId
    }));
    const cellLine = this.scroll.create(TableCellLine.blotName, {
      row: rId,
      cell: id
    });
    tableCell.appendChild(cellLine);
    if (ref) {
      tableRow.insertBefore(tableCell, ref);
    } else {
      tableRow.appendChild(tableCell);
    }
  }
  insertColumn(compareRect, colIndex, isRight = true, editorWrapper) {
    const [body] = this.descendants(TableBody);
    const [tableColGroup] = this.descendants(TableColGroup);
    const tableCols = this.descendants(TableCol);
    let addAsideCells = [];
    let modifiedCells = [];
    let affectedCells = [];
    if (body == null || body.children.head == null) return;
    const tableCells = this.descendants(TableCell);
    tableCells.forEach(cell => {
      const cellRect = getRelativeRect(cell.domNode.getBoundingClientRect(), editorWrapper);
      if (isRight) {
        if (Math.abs(cellRect.x1 - compareRect.x1) < ERROR_LIMIT) {
          // the right of selected boundary equal to the right of table cell,
          // add a new table cell right aside this table cell
          addAsideCells.push(cell);
        } else if (compareRect.x1 - cellRect.x > ERROR_LIMIT && compareRect.x1 - cellRect.x1 < -ERROR_LIMIT) {
          // the right of selected boundary is inside this table cell
          // colspan of this table cell will increase 1
          modifiedCells.push(cell);
        }
      } else if (Math.abs(cellRect.x - compareRect.x) < ERROR_LIMIT) {
        // left of selected boundary equal to left of table cell,
        // add a new table cell left aside this table cell
        addAsideCells.push(cell);
      } else if (compareRect.x - cellRect.x > ERROR_LIMIT && compareRect.x - cellRect.x1 < -ERROR_LIMIT) {
        // the left of selected boundary is inside this table cell
        // colspan of this table cell will increase 1
        modifiedCells.push(cell);
      }
    });
    addAsideCells.forEach(cell => {
      const ref = isRight ? cell.next : cell;
      const id = table_cellId();
      const tableRow = cell.parent;
      const rId = tableRow.formats().row;
      const cellFormats = cell.formats();
      const tableCell = this.scroll.create(TableCell.blotName, Object.assign({}, CELL_DEFAULT, {
        row: rId,
        rowspan: cellFormats.rowspan
      }));
      const cellLine = this.scroll.create(TableCellLine.blotName, {
        row: rId,
        cell: id,
        rowspan: cellFormats.rowspan
      });
      tableCell.appendChild(cellLine);
      if (ref) {
        tableRow.insertBefore(tableCell, ref);
      } else {
        tableRow.appendChild(tableCell);
      }
      affectedCells.push(tableCell);
    });

    // insert new tableCol
    const tableCol = this.scroll.create(TableCol.blotName, true);
    let colRef = isRight ? tableCols[colIndex].next : tableCols[colIndex];
    if (colRef) {
      tableColGroup.insertBefore(tableCol, colRef);
    } else {
      tableColGroup.appendChild(tableCol);
    }
    modifiedCells.forEach(cell => {
      const cellColspan = cell.formats().colspan;
      cell.format('colspan', parseInt(cellColspan, 10) + 1);
      affectedCells.push(cell);
    });
    affectedCells.sort((cellA, cellB) => {
      let y1 = cellA.domNode.getBoundingClientRect().y;
      let y2 = cellB.domNode.getBoundingClientRect().y;
      return y1 - y2;
    });
    this.updateTableWidth();
    return affectedCells;
  }
  insertRow(compareRect, isDown, editorWrapper) {
    const [body] = this.descendants(TableBody);
    if (body == null || body.children.head == null) return;
    const tableCells = this.descendants(TableCell);
    const rId = table_rowId();
    const newRow = this.scroll.create(TableRow.blotName, {
      row: rId
    });
    let addBelowCells = [];
    let modifiedCells = [];
    let affectedCells = [];
    tableCells.forEach(cell => {
      const cellRect = getRelativeRect(cell.domNode.getBoundingClientRect(), editorWrapper);
      if (isDown) {
        if (Math.abs(cellRect.y1 - compareRect.y1) < ERROR_LIMIT) {
          addBelowCells.push(cell);
        } else if (compareRect.y1 - cellRect.y > ERROR_LIMIT && compareRect.y1 - cellRect.y1 < -ERROR_LIMIT) {
          modifiedCells.push(cell);
        }
      } else if (Math.abs(cellRect.y - compareRect.y) < ERROR_LIMIT) {
        addBelowCells.push(cell);
      } else if (compareRect.y - cellRect.y > ERROR_LIMIT && compareRect.y - cellRect.y1 < -ERROR_LIMIT) {
        modifiedCells.push(cell);
      }
    });

    // ordered table cells with rect.x, fix error for inserting
    // new table cell in complicated table with wrong order.
    const sortFunc = (cellA, cellB) => {
      let x1 = cellA.domNode.getBoundingClientRect().x;
      let x2 = cellB.domNode.getBoundingClientRect().x;
      return x1 - x2;
    };
    addBelowCells.sort(sortFunc);
    addBelowCells.forEach(cell => {
      const cId = table_cellId();
      const cellFormats = cell.formats();
      const tableCell = this.scroll.create(TableCell.blotName, Object.assign({}, CELL_DEFAULT, {
        row: rId,
        colspan: cellFormats.colspan
      }));
      const cellLine = this.scroll.create(TableCellLine.blotName, {
        row: rId,
        cell: cId,
        colspan: cellFormats.colspan
      });
      const empty = this.scroll.create(Break.blotName);
      cellLine.appendChild(empty);
      tableCell.appendChild(cellLine);
      newRow.appendChild(tableCell);
      affectedCells.push(tableCell);
    });
    modifiedCells.forEach(cell => {
      const cellRowspan = parseInt(cell.formats().rowspan, 10);
      cell.format('rowspan', cellRowspan + 1);
      affectedCells.push(cell);
    });
    const refRow = this.rows().find(row => {
      let rowRect = getRelativeRect(row.domNode.getBoundingClientRect(), editorWrapper);
      if (isDown) {
        return Math.abs(rowRect.y - compareRect.y - compareRect.height) < ERROR_LIMIT;
      } else {
        return Math.abs(rowRect.y - compareRect.y) < ERROR_LIMIT;
      }
    });
    body.insertBefore(newRow, refRow);

    // reordering affectedCells
    affectedCells.sort(sortFunc);
    return affectedCells;
  }
  mergeCells(compareRect, mergingCells, rowspan, colspan) {
    const mergedCell = mergingCells.reduce((result, tableCell, index) => {
      if (index !== 0) {
        result && tableCell.moveChildren(result);
        tableCell.remove();
      } else {
        tableCell.format('colspan', colspan);
        tableCell.format('rowspan', rowspan);
        result = tableCell;
      }
      return result;
    }, null);
    let rowId = mergedCell.domNode.getAttribute('data-row');
    let cellId = mergedCell.children.head.domNode.getAttribute('data-cell');
    mergedCell.children.forEach(cellLine => {
      cellLine.format('cell', cellId);
      cellLine.format('row', rowId);
      cellLine.format('colspan', colspan);
      cellLine.format('rowspan', rowspan);
    });
    return mergedCell;
  }
  unmergeCells(unmergingCells, editorWrapper) {
    let cellFormats = {};
    let cellRowspan = 1;
    let cellColspan = 1;
    unmergingCells.forEach(tableCell => {
      cellFormats = tableCell.formats();
      cellRowspan = cellFormats.rowspan;
      cellColspan = cellFormats.colspan;
      if (cellColspan > 1) {
        let ref = tableCell.next;
        let row = tableCell.row();
        tableCell.format('colspan', 1);
        for (let i = cellColspan; i > 1; i--) {
          this.insertCell(row, ref);
        }
      }
      if (cellRowspan > 1) {
        let i = cellRowspan;
        let nextRow = tableCell.row().next;
        while (i > 1) {
          let refInNextRow = nextRow.children.reduce((result, cell) => {
            let compareRect = getRelativeRect(tableCell.domNode.getBoundingClientRect(), editorWrapper);
            let cellRect = getRelativeRect(cell.domNode.getBoundingClientRect(), editorWrapper);
            if (Math.abs(compareRect.x1 - cellRect.x) < ERROR_LIMIT) {
              result = cell;
            }
            return result;
          }, null);
          for (let i = cellColspan; i > 0; i--) {
            this.insertCell(nextRow, refInNextRow);
          }
          i -= 1;
          nextRow = nextRow.next;
        }
        tableCell.format('rowspan', 1);
      }
    });
  }
  rows() {
    const body = this.children.tail;
    if (body == null) return [];
    return body.children.map(row => row);
  }
}
table_TableContainer.blotName = 'table-container';
table_TableContainer.className = 'quill-table__table';
table_TableContainer.tagName = 'TABLE';
class table_TableViewWrapper extends Container {
  constructor(scroll, domNode) {
    super(scroll, domNode);
    const quill = external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.find(scroll.domNode.parentNode);
    domNode.addEventListener('scroll', e => {
      const tableModule = quill.getModule('quill-table');
      if (tableModule.columnTool) {
        tableModule.columnTool.domNode.scrollLeft = e.target.scrollLeft;
      }
      if (tableModule.tableSelection && tableModule.tableSelection.selectedTds.length > 0) {
        tableModule.tableSelection.repositionHelpLines();
      }
    }, false);
  }
  table() {
    return this.children.head;
  }
}
table_TableViewWrapper.blotName = 'table-view';
table_TableViewWrapper.className = 'quill-table__wrapper';
table_TableViewWrapper.tagName = 'DIV';
table_TableViewWrapper.allowedChildren = [table_TableContainer];
table_TableContainer.requiredContainer = table_TableViewWrapper;
table_TableContainer.allowedChildren = [TableBody, TableColGroup];
TableBody.requiredContainer = table_TableContainer;
TableBody.allowedChildren = [TableRow];
TableRow.requiredContainer = TableBody;
TableRow.allowedChildren = [TableCell];
TableCell.requiredContainer = TableRow;
TableCell.allowedChildren = [TableCellLine, header];
TableCellLine.requiredContainer = TableCell;
TableColGroup.allowedChildren = [TableCol];
TableColGroup.requiredContainer = table_TableContainer;
TableCol.requiredContainer = TableColGroup;
function table_rowId() {
  const id = Math.random().toString(36).slice(2, 6);
  return `row-${id}`;
}
function table_cellId() {
  const id = Math.random().toString(36).slice(2, 6);
  return `cell-${id}`;
}

// CONCATENATED MODULE: ./src/modules/table-context-menu-button.js

class table_context_menu_button_TableContextMenuButton {
  constructor(quill, options) {
    this.quill = quill;
    this.cellNode = options.cellNode;
    this.init(options);
  }
  init({
    tableNode,
    rowNode
  }) {
    const parent = this.quill.root.parentNode;
    this.domNode = document.createElement('button');
    this.domNode.classList.add('quill-table-operation-menu__context-btn');
    this.domNode.type = 'button';
    this.domNode.addEventListener('click', evt => {
      const quillTable = this.quill.getModule('quill-table');
      const tableSelection = quillTable.tableSelection;
      if (tableSelection && tableSelection.selectedTds.length <= 1) {
        tableSelection.highlitSelection(this.cellNode);
      }
      quillTable.showTableOperationMenu(tableNode, rowNode, this.cellNode, evt);
    });
    this.calculateButtonPosition();
    parent.appendChild(this.domNode);
  }
  calculateButtonPosition() {
    const parent = this.quill.root.parentNode;
    const cellRect = getRelativeRect(this.cellNode.getBoundingClientRect(), parent);
    css(this.domNode, {
      top: `${cellRect.y}px`,
      left: `${cellRect.x1}px`
    });
  }
  destroy() {
    if (this.domNode) {
      this.domNode.remove();
    }
    return null;
  }
}
// CONCATENATED MODULE: ./src/utils/table-util.js

function getColToolCellIndexByBoundary(cells, boundary, conditionFn, container) {
  return cells.reduce((findIndex, cell) => {
    let cellRect = getRelativeRect(cell.getBoundingClientRect(), container);
    if (conditionFn(cellRect, boundary)) {
      findIndex = cells.indexOf(cell);
    }
    return findIndex;
  }, false);
}
function getColToolCellIndexesByBoundary(cells, boundary, conditionFn, container) {
  return cells.reduce((findIndexes, cell) => {
    let cellRect = getRelativeRect(cell.getBoundingClientRect(), container);
    if (conditionFn(cellRect, boundary)) {
      findIndexes.push(cells.indexOf(cell));
    }
    return findIndexes;
  }, []);
}
function getElementPositionInTable(td, rows) {
  const position = {
    row: null,
    col: null
  };
  const row = td.closest && td.closest('tr');
  const startColumnIndex = getColumnIndex(td);
  if (startColumnIndex > -1) {
    position.col = startColumnIndex;
  }
  const startRowIndex = rows.indexOf(row);
  if (startRowIndex > -1) {
    position.row = startRowIndex;
  }
  return position;
}
function getColumnIndex(target) {
  const startRow = target.closest && target.closest('tr');
  if (!startRow) {
    return -1;
  }
  return Array.from(startRow.children).indexOf(target);
}

// CONCATENATED MODULE: ./src/modules/table-selection.js





const table_selection_PRIMARY_COLOR = '#0589f3';
const LINE_POSITIONS = ['left', 'right', 'top', 'bottom'];
const table_selection_ERROR_LIMIT = 2;
class table_selection_TableSelection {
  constructor({
    table,
    cell,
    row
  }, quill, options) {
    if (!table) return null;
    this.table = table;
    this.rowNode = row;
    this.cellNode = cell;
    this.quill = quill;
    this.options = options;
    this.boundary = {}; // params for selected square
    this.selectedTds = []; // array for selected table-cells
    this.dragging = false;
    this.selectingHandler = this.mouseDownHandler.bind(this);
    this.clearSelectionHandler = this.clearSelection.bind(this);
    this.helpLinesInitial();
    this.quill.root.addEventListener('mousedown', this.selectingHandler, false);
    this.quill.root.addEventListener('keydown', () => this.selectCell(), false);
    this.quill.on('text-change', delta => {
      if (this.selectedTds.length === 0) {
        return;
      }
      const selectedIds = this.selectedTds.slice(1);
      if (this.selectedTds.length === 1) {
        this.refreshHelpLinesPosition();
        return;
      }
      this.clearSelectionHandler();
      this.applyChangesForSelection(selectedIds, delta);
    });
    if (cell) {
      this.highlitSelection(cell);
    }
  }
  helpLinesInitial() {
    let parent = this.quill.root.parentNode;
    LINE_POSITIONS.forEach(direction => {
      this[direction] = document.createElement('div');
      this[direction].classList.add('quill-table__selection-line');
      this[direction].classList.add('quill-table__selection-line-' + direction);
      css(this[direction], {
        position: 'absolute',
        display: 'none',
        'background-color': table_selection_PRIMARY_COLOR
      });
      parent.appendChild(this[direction]);
    });
  }
  mouseDownHandler(e) {
    if (e.button !== 0 || !e.target.closest('.quill-table__table')) return;
    const selectionStart = this.highlitSelection(e.target);
    if (!selectionStart) {
      return;
    }
    let mouseLeaveTimeout = null;
    this.quill.root.addEventListener('mousemove', mouseMoveHandler, false);
    document.addEventListener('mouseup', mouseUpHandler, false);
    this.quill.root.addEventListener('mouseleave', mouseLeaveHandler, false);
    const selectedCells = this.table.querySelectorAll('.quill-table__cell-line--selected');
    let endTd;
    selectedCells.forEach(cell => {
      cell.classList.remove('quill-table__cell-line--selected');
    });
    const self = this;
    this.dragging = true;
    function mouseMoveHandler(e) {
      if (e.button !== 0 || !e.target.closest('.quill-table__table')) return;
      if (!selectionStart) {
        return;
      }
      if (mouseLeaveTimeout) {
        clearTimeout(mouseLeaveTimeout);
      }
      endTd = e.target.closest('td[data-row]');
      if (!endTd) {
        return;
      }
      const endTdRect = getRelativeRect(endTd.getBoundingClientRect(), self.quill.root.parentNode);
      self.boundary = computeBoundaryFromRects(selectionStart.startTdRect, endTdRect);
      self.correctBoundary();
      self.selectedTds = self.computeSelectedTds(selectionStart.startTd, endTd);
      setTimeout(() => {
        self.refreshHelpLinesPosition();
        self.showContextMenuButton(endTd);
      }, 0);

      // avoid select text in multiple table-cell
      if (selectionStart.startTd !== endTd) {
        self.quill.blur();
      }
    }
    function mouseUpHandler() {
      if (mouseLeaveTimeout) {
        clearTimeout(mouseLeaveTimeout);
      }
      self.quill.root.removeEventListener('mousemove', mouseMoveHandler, false);
      document.removeEventListener('mouseup', mouseUpHandler, false);
      self.quill.root.removeEventListener('mouseleave', mouseLeaveHandler, false);
      self.dragging = false;
      self.selectCell();
      const targetTd = endTd || selectionStart.startTd;
      if (!targetTd) {
        return;
      }
      self.showContextMenuButton(targetTd);
    }
    function mouseLeaveHandler(evt) {
      if (!self.dragging) {
        return;
      }
      if (isEventFromTableParts(evt)) {
        return;
      }
      if (mouseLeaveTimeout) {
        clearTimeout(mouseLeaveTimeout);
      }
      mouseLeaveTimeout = setTimeout(() => {
        mouseUpHandler();
      }, 550);
    }
  }
  highlitSelection(target) {
    const startTd = target.closest('td[data-row]');
    if (!startTd) {
      return;
    }
    const startTdRect = getRelativeRect(startTd.getBoundingClientRect(), this.quill.root.parentNode);
    this.boundary = computeBoundaryFromRects(startTdRect, startTdRect);
    this.correctBoundary();
    this.selectedTds = this.computeSelectedTds(startTd, startTd);
    this.repositionHelpLines();
    this.showContextMenuButton(startTd);
    return {
      startTd,
      startTdRect
    };
  }
  correctBoundary() {
    const tableContainer = external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.find(this.table);
    const tableCells = tableContainer.descendants(TableCell);
    tableCells.forEach(tableCell => {
      let {
        x,
        y,
        width,
        height
      } = getRelativeRect(tableCell.domNode.getBoundingClientRect(), this.quill.root.parentNode);
      let isCellIntersected = (x + table_selection_ERROR_LIMIT >= this.boundary.x && x + table_selection_ERROR_LIMIT <= this.boundary.x1 || x - table_selection_ERROR_LIMIT + width >= this.boundary.x && x - table_selection_ERROR_LIMIT + width <= this.boundary.x1) && (y + table_selection_ERROR_LIMIT >= this.boundary.y && y + table_selection_ERROR_LIMIT <= this.boundary.y1 || y - table_selection_ERROR_LIMIT + height >= this.boundary.y && y - table_selection_ERROR_LIMIT + height <= this.boundary.y1);
      if (isCellIntersected) {
        this.boundary = computeBoundaryFromRects(this.boundary, {
          x,
          y,
          width,
          height
        });
      }
    });
  }
  computeSelectedTds(startTarget, endTarget) {
    if (startTarget.tagName !== 'TD' || endTarget.tagName !== 'TD') {
      return [];
    }
    const rows = Array.from(this.table.querySelectorAll('tr'));
    const startTargetPosition = getElementPositionInTable(startTarget, rows);
    if (startTargetPosition.row === null || startTargetPosition.col === null) {
      return [];
    }
    const endTargetPosition = getElementPositionInTable(endTarget, rows);
    if (!endTargetPosition.row === null || endTargetPosition.col === null) {
      return [];
    }
    const selectedTds = [];
    const {
      iterationStart,
      iterationEnd,
      beginSelectionIndex,
      endSelectionIndex
    } = getSelectionIterationParams(startTargetPosition, endTargetPosition);
    for (let i = iterationStart; i <= iterationEnd; i++) {
      const tds = Array.from(rows[i].children).slice(beginSelectionIndex, endSelectionIndex + 1);
      selectedTds.push(...tds.map(tdElement => external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.find(tdElement)));
    }
    return selectedTds;
  }
  repositionHelpLines() {
    if (!this.left || !this.right || !this.top || !this.bottom) {
      return;
    }
    const tableViewScrollLeft = this.table.parentNode.scrollLeft;
    css(this.left, {
      display: 'block',
      left: `${this.boundary.x - tableViewScrollLeft - 1}px`,
      top: `${this.boundary.y}px`,
      height: `${this.boundary.height + 1}px`,
      width: '1px'
    });
    css(this.right, {
      display: 'block',
      left: `${this.boundary.x1 - tableViewScrollLeft}px`,
      top: `${this.boundary.y}px`,
      height: `${this.boundary.height + 1}px`,
      width: '1px'
    });
    css(this.top, {
      display: 'block',
      left: `${this.boundary.x - 1 - tableViewScrollLeft}px`,
      top: `${this.boundary.y}px`,
      width: `${this.boundary.width + 1}px`,
      height: '1px'
    });
    css(this.bottom, {
      display: 'block',
      left: `${this.boundary.x - 1 - tableViewScrollLeft}px`,
      top: `${this.boundary.y1 + 1}px`,
      width: `${this.boundary.width + 1}px`,
      height: '1px'
    });
  }

  // based on selectedTds compute positions of help lines
  // It is useful when selectedTds are not changed
  refreshHelpLinesPosition() {
    if (this.selectedTds.length === 0) {
      return;
    }
    const startRect = getRelativeRect(this.selectedTds[0].domNode.getBoundingClientRect(), this.quill.root.parentNode);
    const endRect = getRelativeRect(this.selectedTds[this.selectedTds.length - 1].domNode.getBoundingClientRect(), this.quill.root.parentNode);
    if (this.contextMenuButton) {
      this.contextMenuButton.calculateButtonPosition();
    }
    this.boundary = computeBoundaryFromRects(startRect, endRect);
    this.repositionHelpLines();
  }
  destroy() {
    LINE_POSITIONS.forEach(direction => {
      this[direction].remove();
      this[direction] = null;
    });
    this.quill.root.removeEventListener('mousedown', this.selectingHandler, false);
    this.quill.off('text-change', this.clearSelectionHandler);
    this.hideContextMenuButton();
    return null;
  }
  setSelection(startTd, endTd) {
    const startRect = startTd.getBoundingClientRect();
    const endRect = endTd.getBoundingClientRect();
    this.boundary = computeBoundaryFromRects(getRelativeRect(startRect, this.quill.root.parentNode), getRelativeRect(endRect, this.quill.root.parentNode));
    this.correctBoundary();
    this.selectedTds = this.computeSelectedTds(startTd, endTd);
    setTimeout(() => {
      this.refreshHelpLinesPosition();
      this.showContextMenuButton(this.selectedTds[this.selectedTds.length - 1].domNode);
    }, 0);
  }
  clearSelection() {
    if (this.selectedTds.length > 1) {
      window.getSelection().removeAllRanges();
    }
    this.boundary = {};
    this.selectedTds = [];
    LINE_POSITIONS.forEach(direction => {
      this[direction] && css(this[direction], {
        display: 'none'
      });
    });
    this.hideContextMenuButton();
  }
  selectCell() {
    if (this.selectedTds.length <= 1) {
      return;
    }
    const startCell = this.selectedTds[0];
    const selection = window.getSelection();
    selection.removeAllRanges();
    const range = document.createRange();
    range.setStart(startCell.domNode, 0);
    range.setEnd(startCell.domNode, 1);
    selection.addRange(range);
    this.selectedTds.forEach(cell => {
      cell.domNode.classList.add('quill-table__cell-line--selected');
    });
  }
  keyDownButtonHandler() {
    this.selectCell();
  }
  applyChangesForSelection(selectedIds, delta) {
    const attributes = delta.ops.reduce((acc, op) => {
      if (!op.attributes) {
        return acc;
      }
      Object.entries(op.attributes).forEach(([name, val]) => {
        acc[name] = val;
      });
      return acc;
    }, {});
    selectedIds.forEach(cell => {
      const index = this.quill.getIndex(cell);
      this.quill.formatLine(index, 0, attributes);
      this.quill.formatText(index, cell.domNode.textContent.length, attributes);
    });
    this.quill.setSelection(null);
  }
  showContextMenuButton(cellNode) {
    this.hideContextMenuButton();
    this.contextMenuButton = new table_context_menu_button_TableContextMenuButton(this.quill, {
      tableNode: this.table,
      rowNode: this.rowNode,
      cellNode: cellNode
    });
  }
  hideContextMenuButton() {
    if (!this.contextMenuButton) {
      return;
    }
    this.contextMenuButton = this.contextMenuButton.destroy();
  }
}
function computeBoundaryFromRects(startRect, endRect) {
  let x = Math.min(startRect.x, endRect.x, startRect.x + startRect.width - 1, endRect.x + endRect.width - 1);
  let x1 = Math.max(startRect.x, endRect.x, startRect.x + startRect.width - 1, endRect.x + endRect.width - 1);
  let y = Math.min(startRect.y, endRect.y, startRect.y + startRect.height - 1, endRect.y + endRect.height - 1);
  let y1 = Math.max(startRect.y, endRect.y, startRect.y + startRect.height - 1, endRect.y + endRect.height - 1);
  let width = x1 - x;
  let height = y1 - y;
  return {
    x,
    x1,
    y,
    y1,
    width,
    height
  };
}
function isEventFromTableParts(evt) {
  const isOutFromInternalElement = evt.relatedTarget && evt.relatedTarget.closest && evt.relatedTarget.closest('.quill-table__wrapper');
  const isOutFromSelectionLine = evt.relatedTarget && evt.relatedTarget.classList.contains('quill-table__selection-line');
  const isOutFromContextButton = evt.relatedTarget && evt.relatedTarget.classList.contains('quill-table-operation-menu__context-btn');
  return isOutFromInternalElement || isOutFromSelectionLine || isOutFromContextButton;
}
function getSelectionIterationParams(startPosition, endPosition) {
  return {
    iterationStart: Math.min(startPosition.row, endPosition.row),
    iterationEnd: Math.max(startPosition.row, endPosition.row),
    beginSelectionIndex: Math.min(startPosition.col, endPosition.col),
    endSelectionIndex: Math.max(startPosition.col, endPosition.col)
  };
}
// CONCATENATED MODULE: ./src/assets/dict.js
const dict = {
  RU: {
    table: 'Таблица',
    insert_column_right: 'Добавить колонку справа',
    insert_column_left: 'Добавить колонку слева',
    insert_row_up: 'Добавить строку сверху',
    insert_row_bottom: 'Добавить строку снизу',
    merge_cells: 'Объединить ячейки',
    unmerge_cells: 'Разъединить ячейку',
    delete_columns: 'Удалить столбец',
    delete_rows: 'Удалить строку',
    delete_table: 'Удалить таблицу'
  },
  EN: {
    table: 'Table',
    insert_column_right: 'Insert column right',
    insert_column_left: 'Insert column left',
    insert_row_up: 'Insert row up',
    insert_row_bottom: 'Insert row down',
    merge_cells: 'Merge selected cells',
    unmerge_cells: 'Unmerge cells',
    delete_columns: 'Delete selected columns',
    delete_rows: 'Delete selected rows',
    delete_table: 'Delete table'
  }
};
// CONCATENATED MODULE: ./src/utils/translate.js

function translate(key, forceLang) {
  const lang = forceLang || window.lang || 'EN';
  const langDict = dict[lang] || dict['EN'];
  return langDict[key] || dict['EN'][key] || key;
}
// CONCATENATED MODULE: ./src/modules/table-operation-menu.js





const MENU_MIN_HEIGHT = 150;
const DEFAULT_CELL_COLORS = ['white', 'red', 'yellow', 'blue'];
const DEFAULT_COLOR_SUBTITLE = 'Background Colors';
const MENU_ITEMS_DEFAULT = {
  insertColumnRight: {
    text: translate('insert_column_right'),
    iconClass: 'quill-table-operation-menu__icon-add-column-right',
    handler() {
      const tableContainer = external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.find(this.table);
      const rightCell = this.selectedTds[this.selectedTds.length - 1];
      const cells = rightCell.domNode.parentNode.querySelectorAll('.quill-table__cell');
      let colIndex = Array.from(cells).indexOf(rightCell.domNode);
      const newColumn = tableContainer.insertColumn(this.boundary, colIndex, true, this.quill.root.parentNode);
      this.quill.update(external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.sources.SILENT);
      this.quill.setSelection(this.quill.getIndex(newColumn[0]), 0, external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.sources.SILENT);
      this.tableSelection.setSelection(newColumn[0].domNode, newColumn[0].domNode);
      this.tableColumnTool.updateToolCells();
    }
  },
  insertColumnLeft: {
    text: translate('insert_column_left'),
    iconClass: 'quill-table-operation-menu__icon-add-column-left',
    handler() {
      const tableContainer = external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.find(this.table);
      const leftCell = this.selectedTds[0];
      const cells = leftCell.domNode.parentNode.querySelectorAll('.quill-table__cell');
      let colIndex = Array.from(cells).indexOf(leftCell.domNode);
      const newColumn = tableContainer.insertColumn(this.boundary, colIndex, false, this.quill.root.parentNode);
      this.quill.update(external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.sources.SILENT);
      this.quill.setSelection(this.quill.getIndex(newColumn[0]), 0, external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.sources.SILENT);
      this.tableSelection.setSelection(newColumn[0].domNode, newColumn[0].domNode);
      this.tableColumnTool.updateToolCells();
    }
  },
  insertRowUp: {
    text: translate('insert_row_up'),
    iconClass: 'quill-table-operation-menu__icon-add-column-top',
    handler() {
      const tableContainer = external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.find(this.table);
      const affectedCells = tableContainer.insertRow(this.boundary, false, this.quill.root.parentNode);
      this.quill.update(external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.sources.SILENT);
      this.quill.setSelection(this.quill.getIndex(affectedCells[0]), 0, external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.sources.SILENT);
      this.tableSelection.setSelection(affectedCells[0].domNode, affectedCells[0].domNode);
    }
  },
  insertRowDown: {
    text: translate('insert_row_bottom'),
    iconClass: 'quill-table-operation-menu__icon-add-column-bottom',
    handler() {
      const tableContainer = external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.find(this.table);
      const affectedCells = tableContainer.insertRow(this.boundary, true, this.quill.root.parentNode);
      this.quill.update(external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.sources.SILENT);
      this.quill.setSelection(this.quill.getIndex(affectedCells[0]), 0, external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.sources.SILENT);
      this.tableSelection.setSelection(affectedCells[0].domNode, affectedCells[0].domNode);
    }
  },
  mergeCells: {
    text: translate('merge_cells'),
    iconClass: 'quill-table-operation-menu__icon-merge-cells',
    handler() {
      const tableContainer = external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.find(this.table);
      // compute merged Cell rowspan, equal to length of selected rows
      const rowspan = tableContainer.rows().reduce((sum, row) => {
        let rowRect = getRelativeRect(row.domNode.getBoundingClientRect(), this.quill.root.parentNode);
        if (rowRect.y > this.boundary.y - ERROR_LIMIT && rowRect.y + rowRect.height < this.boundary.y + this.boundary.height + ERROR_LIMIT) {
          sum += 1;
        }
        return sum;
      }, 0);

      // compute merged cell colspan, equal to length of selected cols
      const colspan = this.columnToolCells.reduce((sum, cell) => {
        let cellRect = getRelativeRect(cell.getBoundingClientRect(), this.quill.root.parentNode);
        if (cellRect.x > this.boundary.x - ERROR_LIMIT && cellRect.x + cellRect.width < this.boundary.x + this.boundary.width + ERROR_LIMIT) {
          sum += 1;
        }
        return sum;
      }, 0);
      const mergedCell = tableContainer.mergeCells(this.boundary, this.selectedTds, rowspan, colspan, this.quill.root.parentNode);
      this.quill.update(external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.sources.SILENT);
      this.tableSelection.setSelection(mergedCell.domNode, mergedCell.domNode);
    }
  },
  unmergeCells: {
    text: translate('unmerge_cells'),
    iconClass: 'quill-table-operation-menu__icon-slpit-cells',
    handler() {
      const tableContainer = external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.find(this.table);
      tableContainer.unmergeCells(this.selectedTds, this.quill.root.parentNode);
      this.quill.update(external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.sources.SILENT);
      this.tableSelection.clearSelection();
    }
  },
  deleteColumn: {
    text: translate('delete_columns'),
    iconClass: 'quill-table-operation-menu__icon-remove-column',
    handler() {
      const tableContainer = external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.find(this.table);
      let colIndexes = getColToolCellIndexesByBoundary(this.columnToolCells, this.boundary, (cellRect, boundary) => {
        return cellRect.x + ERROR_LIMIT > boundary.x && cellRect.x + cellRect.width - ERROR_LIMIT < boundary.x1;
      }, this.quill.root.parentNode);
      let isDeleteTable = tableContainer.deleteColumns(this.boundary, colIndexes, this.quill.root.parentNode);
      if (!isDeleteTable) {
        this.quill.update(external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.sources.SILENT);
        this.tableSelection.clearSelection();
        this.tableColumnTool.updateToolCells();
      }
    }
  },
  deleteRow: {
    text: translate('delete_rows'),
    iconClass: 'quill-table-operation-menu__icon-remove-row',
    handler() {
      const tableContainer = external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.find(this.table);
      tableContainer.deleteRow(this.boundary, this.quill.root.parentNode);
      this.quill.update(external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.sources.SILENT);
      this.tableSelection.clearSelection();
    }
  },
  deleteTable: {
    text: translate('delete_table'),
    iconClass: 'quill-table-operation-menu__icon-delete-table',
    handler() {
      const betterTableModule = this.quill.getModule('quill-table');
      const tableContainer = external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.find(this.table);
      betterTableModule.hideTableTools();
      tableContainer.remove();
      this.quill.update(external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.sources.SILENT);
    }
  }
};
class table_operation_menu_TableOperationMenu {
  constructor(params, quill, options = {}) {
    const betterTableModule = quill.getModule('quill-table');
    this.tableSelection = betterTableModule.tableSelection;
    this.table = params.table;
    this.quill = quill;
    this.options = options;
    this.menuItems = Object.assign({}, MENU_ITEMS_DEFAULT, options.items || {});
    this.tableColumnTool = betterTableModule.columnTool;
    this.boundary = this.tableSelection.boundary;
    this.selectedTds = this.tableSelection.selectedTds;
    this.destroyHandler = this.destroy.bind(this);
    this.columnToolCells = this.tableColumnTool.colToolCells();
    this.colorSubTitle = options.color && options.color.text ? options.color.text : DEFAULT_COLOR_SUBTITLE;
    this.cellColors = options.color && options.color.colors ? options.color.colors : DEFAULT_CELL_COLORS;
    this.evt = params.evt;
    this.menuInitial(params);
    this.mount();
    document.addEventListener('click', this.destroyHandler, false);
  }
  mount() {
    document.body.appendChild(this.domNode);
    const {
      left,
      top
    } = this.calculatePosition();
    css(this.domNode, {
      left: `${left}px`,
      top: `${top}px`
    });
  }
  destroy() {
    this.domNode.remove();
    document.removeEventListener('click', this.destroyHandler, false);
    return null;
  }
  menuInitial() {
    this.domNode = document.createElement('div');
    this.domNode.classList.add('quill-table-operation-menu');
    css(this.domNode, {
      position: 'absolute',
      'min-height': `${MENU_MIN_HEIGHT}px`,
      'max-width': 'min(-10px + 100vw, 300px);'
    });
    for (let name in this.menuItems) {
      if (this.menuItems[name]) {
        this.domNode.appendChild(this.menuItemCreator(Object.assign({}, MENU_ITEMS_DEFAULT[name], this.menuItems[name])));
        if (['insertRowDown', 'unmergeCells'].indexOf(name) > -1) {
          this.domNode.appendChild(dividingCreator());
        }
      }
    }

    // if colors option is false, disabled bg color
    if (this.options.color && this.options.color !== false) {
      this.domNode.appendChild(dividingCreator());
      this.domNode.appendChild(subTitleCreator(this.colorSubTitle));
      this.domNode.appendChild(this.colorsItemCreator(this.cellColors));
    }

    // create dividing line
    function dividingCreator() {
      const dividing = document.createElement('div');
      dividing.classList.add('quill-table-operation-menu__divider');
      return dividing;
    }

    // create subtitle for menu
    function subTitleCreator(title) {
      const subTitle = document.createElement('div');
      subTitle.classList.add('quill-table-operation-menu__subtitle');
      subTitle.innerText = title;
      return subTitle;
    }
  }
  colorsItemCreator(colors) {
    const self = this;
    const node = document.createElement('div');
    node.classList.add('quill-table-color-picker');
    colors.forEach(color => {
      let colorBox = colorBoxCreator(color);
      node.appendChild(colorBox);
    });
    function colorBoxCreator(color) {
      const box = document.createElement('div');
      box.classList.add('quill-table-color-picker__item');
      box.setAttribute('data-color', color);
      box.style.backgroundColor = color;
      box.addEventListener('click', function () {
        const selectedTds = self.tableSelection.selectedTds;
        if (selectedTds && selectedTds.length > 0) {
          selectedTds.forEach(tableCell => {
            tableCell.format('cell-bg', color);
          });
        }
      }, false);
      return box;
    }
    return node;
  }
  menuItemCreator({
    text,
    iconClass,
    handler
  }) {
    const node = document.createElement('div');
    node.classList.add('quill-table-operation-menu__item');
    const iconSpan = document.createElement('span');
    iconSpan.classList.add('quill-table-operation-menu__icon');
    iconSpan.classList.add(iconClass);
    const textSpan = document.createElement('span');
    textSpan.classList.add('quill-table-operation-menu__text');
    textSpan.innerText = text;
    node.appendChild(iconSpan);
    node.appendChild(textSpan);
    node.addEventListener('click', handler.bind(this), false);
    return node;
  }
  calculatePosition() {
    const GAP_X = 5;
    const clickX = parseInt(this.evt.clientX, 10) || 0;
    const clickY = parseInt(this.evt.clientY, 10) || 0;
    const {
      clientWidth,
      clientHeight
    } = document.documentElement;
    const {
      offsetWidth,
      offsetHeight
    } = this.domNode;
    let posX = clickX + GAP_X;
    if (clickX + offsetWidth > clientWidth - GAP_X) {
      posX = clickX - offsetWidth - GAP_X;
      if (posX < GAP_X) posX = GAP_X;
    }
    let posY = this.evt.pageY;
    if (clickY + offsetHeight > clientHeight) {
      posY = this.evt.pageY - offsetHeight;
      if (posY < MENU_MIN_HEIGHT) {
        posY = MENU_MIN_HEIGHT;
      }
    }
    return {
      top: posY,
      left: posX
    };
  }
}
// CONCATENATED MODULE: ./src/utils/node-matchers.js


const Delta = external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.import('delta');

// rebuild delta
function matchTableCell(node, delta) {
  const row = node.parentNode;
  const table = row.parentNode.tagName === 'TABLE' ? row.parentNode : row.parentNode.parentNode;
  const rows = Array.from(table.querySelectorAll('tr'));
  const cells = Array.from(row.querySelectorAll('td'));
  const rowId = rows.indexOf(row) + 1;
  const cellId = cells.indexOf(node) + 1;
  const colspan = node.getAttribute('colspan') || false;
  const rowspan = node.getAttribute('rowspan') || false;
  const cellBg = node.getAttribute('data-cell-bg') || node.style.backgroundColor; // The td from external table has no 'data-cell-bg'

  // bugfix: empty table cells copied from other place will be removed unexpectedly
  if (delta.length() === 0) {
    delta = new Delta().insert('\n', {
      'table-cell-line': {
        row: rowId,
        cell: cellId,
        rowspan,
        colspan
      }
    });
    return delta;
  }
  delta = delta.reduce((newDelta, op) => {
    if (op.insert && typeof op.insert === 'string') {
      const lines = [];
      let insertStr = op.insert;
      let start = 0;
      for (let i = 0; i < op.insert.length; i++) {
        if (insertStr.charAt(i) === '\n') {
          if (i === 0) {
            lines.push('\n');
          } else {
            lines.push(insertStr.substring(start, i));
            lines.push('\n');
          }
          start = i + 1;
        }
      }
      const tailStr = insertStr.substring(start);
      if (tailStr) lines.push(tailStr);
      lines.forEach(text => {
        text === '\n' ? newDelta.insert('\n', op.attributes) : newDelta.insert(text, _omit(op.attributes, ['table', 'table-cell-line']));
      });
    } else {
      newDelta.insert(op.insert, op.attributes);
    }
    return newDelta;
  }, new Delta());
  return delta.reduce((newDelta, op) => {
    if (op.insert && typeof op.insert === 'string' && op.insert.startsWith('\n')) {
      newDelta.insert(op.insert, Object.assign({}, Object.assign({}, {
        row: rowId
      }, op.attributes.table), {
        'table-cell-line': {
          row: rowId,
          cell: cellId,
          rowspan,
          colspan,
          'cell-bg': cellBg
        }
      }, _omit(op.attributes, ['table'])));
      return newDelta;
    }

    // bugfix: remove background attr from the delta of table cell
    //         to prevent unexcepted background attr append.
    if (op.attributes && op.attributes.background && op.attributes.background === convertToHex(cellBg)) {
      newDelta.insert(op.insert, Object.assign({}, _omit(op.attributes, ['table', 'table-cell-line', 'background'])));
    } else {
      newDelta.insert(op.insert, Object.assign({}, _omit(op.attributes, ['table', 'table-cell-line'])));
    }
    return newDelta;
  }, new Delta());
}

// replace th tag with td tag
function matchTableHeader(node, delta) {
  const row = node.parentNode;
  const table = row.parentNode.tagName === 'TABLE' ? row.parentNode : row.parentNode.parentNode;
  const rows = Array.from(table.querySelectorAll('tr'));
  const cells = Array.from(row.querySelectorAll('th'));
  const rowId = rows.indexOf(row) + 1;
  const cellId = cells.indexOf(node) + 1;
  const colspan = node.getAttribute('colspan') || false;
  const rowspan = node.getAttribute('rowspan') || false;

  // bugfix: empty table cells copied from other place will be removed unexpectedly
  if (delta.length() === 0) {
    delta = new Delta().insert('\n', {
      'table-cell-line': {
        row: rowId,
        cell: cellId,
        rowspan,
        colspan
      }
    });
    return delta;
  }
  delta = delta.reduce((newDelta, op) => {
    if (op.insert && typeof op.insert === 'string') {
      const lines = [];
      let insertStr = op.insert;
      let start = 0;
      for (let i = 0; i < op.insert.length; i++) {
        if (insertStr.charAt(i) === '\n') {
          if (i === 0) {
            lines.push('\n');
          } else {
            lines.push(insertStr.substring(start, i));
            lines.push('\n');
          }
          start = i + 1;
        }
      }
      const tailStr = insertStr.substring(start);
      if (tailStr) lines.push(tailStr);

      // bugfix: no '\n' in op.insert, push a '\n' to lines
      if (lines.indexOf('\n') < 0) {
        lines.push('\n');
      }
      lines.forEach(text => {
        text === '\n' ? newDelta.insert('\n', {
          'table-cell-line': {
            row: rowId,
            cell: cellId,
            rowspan,
            colspan
          }
        }) : newDelta.insert(text, op.attributes);
      });
    } else {
      newDelta.insert(op.insert, op.attributes);
    }
    return newDelta;
  }, new Delta());
  return delta.reduce((newDelta, op) => {
    if (op.insert && typeof op.insert === 'string' && op.insert.startsWith('\n')) {
      newDelta.insert(op.insert, Object.assign({}, {
        'table-cell-line': {
          row: rowId,
          cell: cellId,
          rowspan,
          colspan
        }
      }));
    } else {
      newDelta.insert(op.insert, Object.assign({}, _omit(op.attributes, ['table', 'table-cell-line'])));
    }
    return newDelta;
  }, new Delta());
}

// supplement colgroup and col
function matchTable(node, delta) {
  let newColDelta = new Delta();
  const topRow = node.querySelector('tr');

  // bugfix: empty table will return empty delta
  if (topRow === null) return newColDelta;
  const cellsInTopRow = Array.from(topRow.querySelectorAll('td')).concat(Array.from(topRow.querySelectorAll('th')));
  const maxCellsNumber = cellsInTopRow.reduce((sum, cell) => {
    const cellColspan = cell.getAttribute('colspan') || 1;
    sum = sum + parseInt(cellColspan, 10);
    return sum;
  }, 0);
  const colsNumber = node.querySelectorAll('col').length;

  // issue #2
  // bugfix: the table copied from Excel had some default col tags missing
  //         add missing col tags
  if (colsNumber === maxCellsNumber) {
    return delta;
  } else {
    for (let i = 0; i < maxCellsNumber - colsNumber; i++) {
      newColDelta.insert('\n', {
        'table-col': true
      });
    }
    if (colsNumber === 0) return newColDelta.concat(delta);
    let lastNumber = 0;
    return delta.reduce((finalDelta, op) => {
      finalDelta.insert(op.insert, op.attributes);
      if (op.attributes && op.attributes['table-col']) {
        lastNumber += op.insert.length;
        if (lastNumber === colsNumber) {
          finalDelta = finalDelta.concat(newColDelta);
        }
      }
      return finalDelta;
    }, new Delta());
  }
}
// CONCATENATED MODULE: ./src/quill-table.js





// import table node matchers





const Module = external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.import('core/module');
const quill_table_Delta = external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.import('delta');
class quill_table_QuillTable extends Module {
  static register() {
    external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.register(TableCol, true);
    external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.register(TableColGroup, true);
    external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.register(TableCellLine, true);
    external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.register(TableCell, true);
    external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.register(TableRow, true);
    external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.register(TableBody, true);
    external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.register(table_TableContainer, true);
    external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.register(table_TableViewWrapper, true);
    // register customized Header，overwriting quill built-in Header
    // Quill.register('formats/header', Header, true);
  }
  constructor(quill, options) {
    super(quill, options);

    // handle click on quill-table__table
    this.quill.root.addEventListener('click', evt => {
      // bugfix: evt.path is undefined in Safari, FF, Micro Edge
      const path = getEventComposedPath(evt);
      if (!path || path.length <= 0) return;
      const {
        tableNode,
        rowNode,
        cellNode
      } = path.reduce((acc, node) => {
        if (!node.tagName) {
          return acc;
        }
        const tagName = node.tagName.toUpperCase();
        if (tagName === 'TABLE' && node.classList.contains('quill-table__table')) {
          acc.tableNode = node;
          return acc;
        }
        if (tagName === 'TR') {
          acc.rowNode = node;
        }

        // if multi columns selected
        if ((tagName === 'TBODY' || acc.rowNode) && !acc.cellNode) {
          const pointerElement = document.elementFromPoint(evt.x, evt.y);
          if (pointerElement) {
            acc.cellNode = pointerElement.closest('.quill-table__cell');
          }
        }
        if (node.classList.contains('quill-table__cell')) {
          acc.cellNode = node;
        }
        return acc;
      }, {
        cellNode: null,
        rowNode: null,
        tableNode: null
      });
      if (tableNode) {
        // current table clicked
        if (this.table === tableNode) return;
        // other table clicked
        if (this.table) this.hideTableTools();
        this.showTableTools(tableNode, rowNode, cellNode, quill, options);
      } else if (this.table) {
        // other clicked
        this.hideTableTools();
      }
    }, false);

    // handle right click on quill-table__table
    this.quill.root.addEventListener('contextmenu', evt => {
      if (!this.table) return true;
      evt.preventDefault();

      // bugfix: evt.path is undefined in Safari, FF, Micro Edge
      const path = getEventComposedPath(evt);
      if (!path || path.length <= 0) return;
      const tableNode = path.filter(node => {
        return node.tagName && node.tagName.toUpperCase() === 'TABLE' && node.classList.contains('quill-table__table');
      })[0];
      const rowNode = path.filter(node => {
        return node.tagName && node.tagName.toUpperCase() === 'TR' && node.getAttribute('data-row');
      })[0];
      const cellNode = path.filter(node => {
        return node.tagName && node.tagName.toUpperCase() === 'TD' && node.getAttribute('data-row');
      })[0];
      let isTargetCellSelected = this.tableSelection.selectedTds.map(tableCell => tableCell.domNode).includes(cellNode);
      if (this.tableSelection.selectedTds.length <= 0 || !isTargetCellSelected) {
        this.tableSelection.setSelection(cellNode, cellNode);
      }
      this.showTableOperationMenu(tableNode, rowNode, cellNode, evt);
    }, false);
    this.quill.root.addEventListener('mousemove', evt => {
      if (!evt.target.closest('table') || this.tableSelection && (this.tableSelection.dragging || this.tableSelection.selectedTds && this.tableSelection.selectedTds.length > 0)) {
        return;
      }
      const selection = window.getSelection();
      selection.removeAllRanges();
    });

    // add keyboard binding：Backspace
    // prevent user hits backspace to delete table cell
    // const KeyBoard = quill.getModule('keyboard');
    quill.keyboard.addBinding({
      key: 'Backspace'
    }, {}, (range, context) => this.tableDeletionProtection(range, context));
    quill.keyboard.addBinding({
      key: 'Backspace',
      shiftKey: true
    }, {}, (range, context) => this.tableDeletionProtection(range, context));
    // since only one matched bindings callback will excute.
    // expected my binding callback excute first
    // I changed the order of binding callbacks
    let thisBindings = quill.keyboard.bindings.Backspace.slice(quill.keyboard.bindings.Backspace.length - 2, quill.keyboard.bindings.Backspace.length);
    quill.keyboard.bindings.Backspace.splice(0, 2, ...thisBindings);
    quill.keyboard.bindings.Backspace.splice(quill.keyboard.bindings.Backspace.length - 2, 2);
    const tableTabBinding = quill.keyboard.bindings.Tab.slice(quill.keyboard.bindings.Tab.length - 2, quill.keyboard.bindings.Tab.length);
    quill.keyboard.bindings.Tab.splice(0, 2, ...tableTabBinding);
    quill.keyboard.bindings.Tab.splice(quill.keyboard.bindings.Tab.length - 2, 2);
    // add Matchers to match and render quill-better-table for initialization
    // or pasting
    quill.clipboard.addMatcher('td', matchTableCell);
    quill.clipboard.addMatcher('th', matchTableHeader);
    quill.clipboard.addMatcher('table', matchTable);
    // quill.clipboard.addMatcher('h1, h2, h3, h4, h5, h6', matchHeader)

    // remove matcher for tr tag
    quill.clipboard.matchers = quill.clipboard.matchers.filter(matcher => {
      return matcher[0] !== 'tr';
    });
    this.quill.on('selection-change', range => {
      this.correctSelection(range);
    });
    this.resizeObserver = new window.ResizeObserver(() => {
      if (this.columnTool) {
        this.columnTool.updateToolCells();
        this.columnTool.updateToolWidth();
      }
      if (this.tableSelection) {
        this.tableSelection.refreshHelpLinesPosition();
      }
    });
    this.resizeObserver.observe(this.quill.root);
  }
  getTable(range = this.quill.getSelection()) {
    if (range == null) return [null, null, null, -1];
    const [cellLine, offset] = this.quill.getLine(range.index);
    if (cellLine == null || cellLine.statics.blotName !== TableCellLine.blotName) {
      return [null, null, null, -1];
    }
    const cell = cellLine.tableCell();
    const row = cell.row();
    const table = row.table();
    return [table, row, cell, offset];
  }
  insertTable(rows, columns) {
    const range = this.quill.getSelection(true);
    if (range == null) return;
    let currentBlot = this.quill.getLeaf(range.index)[0];
    if (isInTableCell(currentBlot)) {
      // eslint-disable-next-line no-console
      console.warn('Can not insert table into a table cell.');
      return;
    }
    let delta = new quill_table_Delta().retain(range.index);
    delta.insert('\n');
    // insert table column
    delta = new Array(columns).fill('\n').reduce((memo, text) => {
      memo.insert(text, {
        'table-col': true
      });
      return memo;
    }, delta);
    // insert table cell line with empty line
    delta = new Array(rows).fill(0).reduce(memo => {
      let tableRowId = table_rowId();
      return new Array(columns).fill('\n').reduce((memo, text) => {
        memo.insert(text, {
          'table-cell-line': {
            row: tableRowId,
            cell: table_cellId()
          }
        });
        return memo;
      }, memo);
    }, delta);
    this.quill.updateContents(delta, external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.sources.USER);
    const rangeForSelect = range.index + columns + 1;
    this.quill.setSelection(rangeForSelect, external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.sources.API);
    const [line] = this.quill.getLine(rangeForSelect);
    if (!isTableCellLine(line)) {
      return;
    }
    const cell = line.parent;
    if (!cell) {
      return;
    }
    const row = cell.parent;
    if (!row) {
      return;
    }
    const tableNode = row.domNode.closest('table');
    if (!tableNode) {
      return;
    }
    this.showTableTools(tableNode, row.domNode, cell.domNode, this.quill, this.options);
  }
  tableInsertColumn(columnType) {
    const tableContainer = external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.find(this.table);
    const tableSelection = this.tableSelection;
    const tableColumnTool = this.columnTool;
    const columnToolCells = tableColumnTool.colToolCells();
    let colIndex = getColToolCellIndexByBoundary(columnToolCells, tableSelection.boundary, (cellRect, boundary) => {
      return Math.abs(cellRect.x + cellRect.width - boundary.x1) <= ERROR_LIMIT;
    }, tableSelection.quill.root.parentNode);
    const newColumn = tableContainer.insertColumn(tableSelection.boundary, colIndex, columnType === 'right', tableSelection.quill.root.parentNode);
    tableColumnTool.updateToolCells();
    tableSelection.quill.update(external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.sources.USER);
    tableSelection.quill.setSelection(tableSelection.quill.getIndex(newColumn[0]), 0, external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.sources.SILENT);
    tableSelection.setSelection(newColumn[0].domNode, newColumn[0].domNode);
  }
  insertColumnLeft() {
    this.tableInsertColumn('left');
  }
  insertColumnRight() {
    this.tableInsertColumn('right');
  }
  tableInsertRow(rowType) {
    const tableContainer = external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.find(this.table);
    const tableSelection = this.tableSelection;
    const affectedCells = tableContainer.insertRow(tableSelection.boundary, rowType === 'below', tableSelection.quill.root.parentNode);
    tableSelection.quill.update(external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.sources.USER);
    tableSelection.quill.setSelection(tableSelection.quill.getIndex(affectedCells[0]), 0, external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.sources.SILENT);
    tableSelection.setSelection(affectedCells[0].domNode, affectedCells[0].domNode);
  }
  insertRowAbove() {
    this.tableInsertRow('above');
  }
  insertRowBelow() {
    this.tableInsertRow('below');
  }
  deleteRow() {
    const tableContainer = external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.find(this.table);
    const tableSelection = this.tableSelection;
    tableContainer.deleteRow(tableSelection.boundary, tableSelection.quill.root.parentNode);
    tableSelection.quill.update(external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.sources.USER);
    tableSelection.clearSelection();
  }
  deleteColumn() {
    const tableContainer = external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.find(this.table);
    const tableSelection = this.tableSelection;
    const tableColumnTool = this.columnTool;
    const columnToolCells = tableColumnTool.colToolCells();
    let colIndexes = getColToolCellIndexesByBoundary(columnToolCells, tableSelection.boundary, (cellRect, boundary) => {
      return cellRect.x + ERROR_LIMIT > boundary.x && cellRect.x + cellRect.width - ERROR_LIMIT < boundary.x1;
    }, tableSelection.quill.root.parentNode);
    let isDeleteTable = tableContainer.deleteColumns(tableSelection.boundary, colIndexes, tableSelection.quill.root.parentNode);
    if (!isDeleteTable) {
      tableColumnTool.updateToolCells();
      tableSelection.quill.update(external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.sources.USER);
      tableSelection.clearSelection();
    }
  }
  deleteTable() {
    const tableContainer = external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.find(this.table);
    tableContainer.tableDestroy();
    this.resizeObserver.disconnect();
  }
  showTableTools(table, rowNode, cellNode, quill, options) {
    this.table = table;
    this.columnTool = new table_column_tool_TableColumnTool(table, quill, options);
    this.tableSelection = new table_selection_TableSelection({
      table,
      row: rowNode,
      cell: cellNode
    }, quill, options);
  }
  hideTableTools() {
    this.columnTool && this.columnTool.destroy();
    this.tableSelection && this.tableSelection.destroy();
    this.tableOperationMenu && this.tableOperationMenu.destroy();
    this.columnTool = null;
    this.tableSelection = null;
    this.tableOperationMenu = null;
    this.table = null;
  }
  showTableOperationMenu(tableNode, rowNode, cellNode, evt) {
    if (this.tableOperationMenu) {
      this.tableOperationMenu = this.tableOperationMenu.destroy();
    }
    if (tableNode) {
      setTimeout(() => {
        this.tableOperationMenu = new table_operation_menu_TableOperationMenu({
          table: tableNode,
          row: rowNode,
          cell: cellNode,
          evt
        }, this.quill, this.options.operationMenu);
      }, 0);
    }
  }
  tableDeletionProtection(range, context) {
    if (range.index === 0 || this.quill.getLength() <= 1) return true;
    const [line] = this.quill.getLine(range.index);
    const isTableLine = isTableCellLine(line);
    if ((!this.tableSelection || this.tableSelection.selectedTds && this.tableSelection.selectedTds.length === 0) && isTableLine) {
      return false;
    }
    if (context.event.shiftKey && isTableLine) {
      return false;
    }
    if (this.tableSelection && this.tableSelection.selectedTds && this.tableSelection.selectedTds.length > 1) {
      return false;
    }
    if (context.offset === 0) {
      const [prev] = this.quill.getLine(range.index - 1);
      if (prev != null) {
        if (isTableCellLine(prev) && !isTableLine) return false;
      }
    }
    return true;
  }
  correctSelection(range) {
    if (!range) {
      return;
    }
    const lines = this.quill.getLines(range);
    if (lines.length === 0) {
      const [line] = this.quill.getLine(range.index);
      if (!isTableCellLine(line)) {
        return;
      }
      if (!this.tableSelection) {
        this.showTableTools(this.table, line.domNode.closest('tr'), line.parent.domNode, this.quill, this.options);
      } else if (this.tableSelection.selectedTds && this.tableSelection.selectedTds.length === 1) {
        this.tableSelection.setSelection(line.parent.domNode, line.parent.domNode);
      }
      return;
    }
    const cellTextLines = lines.filter(line => isTableCellLine(line));
    const cellTextLinesLength = cellTextLines.length;
    if (cellTextLinesLength === 0) {
      return;
    }
    const firstCell = cellTextLines[0];
    const firstLineIndex = this.quill.getIndex(firstCell);
    const firstCellContentLength = firstCell.domNode.textContent.length;
    if (lines.length === 1 && cellTextLinesLength === 1) {
      // when try to select empty cell disable selection
      if (firstCellContentLength === 0) {
        this.quill.setSelection(firstLineIndex);
        return;
      }
      if (!firstCell.parent.next && range.length >= firstCellContentLength) {
        this.quill.setSelection(firstLineIndex, firstCellContentLength);
      }
      return;
    }
    const linesLength = lines.reduce((acc, line) => acc += line.domNode.textContent.length, 0);
    this.quill.setSelection(firstLineIndex, linesLength + cellTextLinesLength - 1);
  }
}
quill_table_QuillTable.keyboardBindings = {
  'table-cell-line backspace': {
    key: 'Backspace',
    format: ['table-cell-line'],
    collapsed: true,
    offset: 0,
    handler(range) {
      const [line] = this.quill.getLine(range.index);
      return !(!line.prev || !isTableCellLine(line.prev));
    }
  },
  'table-cell-line delete': {
    key: 'Delete',
    format: ['table-cell-line'],
    collapsed: true,
    suffix: /^$/,
    handler() {}
  },
  'table-cell-line enter': {
    key: 'Enter',
    shiftKey: null,
    format: ['table-cell-line'],
    handler(range, context) {
      // bugfix: a unexpected new line inserted when user compositionend with hitting Enter
      if (this.quill.selection && this.quill.selection.composing || this.quill.container.querySelectorAll('.quill-table__cell-line--selected').length > 1) return;
      const Scope = external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.imports.parchment.Scope;
      if (range.length > 0) {
        this.quill.scroll.deleteAt(range.index, range.length); // So we do not trigger text-change
      }
      const lineFormats = Object.keys(context.format).reduce((formats, format) => {
        if (this.quill.scroll.query(format, Scope.BLOCK) && !Array.isArray(context.format[format])) {
          formats[format] = context.format[format];
        }
        return formats;
      }, {});
      // insert new cellLine with lineFormats
      this.quill.insertText(range.index, '\n', lineFormats['table-cell-line'], external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.sources.USER);
      // Earlier scroll.deleteAt might have messed up our selection,
      // so insertText's built in selection preservation is not reliable
      this.quill.setSelection(range.index + 1, external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.sources.SILENT);
      this.quill.focus();
      Object.keys(context.format).forEach(name => {
        if (lineFormats[name] != null) return;
        if (Array.isArray(context.format[name])) return;
        if (name === 'link') return;
        this.quill.format(name, context.format[name], external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.sources.USER);
      });
    }
  },
  'table-cell-line up': makeTableArrowHandler(true),
  'table-cell-line down': makeTableArrowHandler(false),
  'table-cell-line up shift': makeTableArrowHandler(true, true),
  'table-cell-line down shift': makeTableArrowHandler(false, true),
  'down-to-table': {
    key: 'ArrowDown',
    collapsed: true,
    handler(range, context) {
      const target = context.line.next;
      if (target && target.statics.blotName === 'table-view') {
        const targetCell = target.table().rows()[0].children.head;
        const targetLine = targetCell.children.head;
        this.quill.setSelection(targetLine.offset(this.quill.scroll), 0, external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.sources.USER);
        return false;
      }
      return true;
    }
  },
  'up-to-table': {
    key: 'ArrowUp',
    collapsed: true,
    handler(range, context) {
      const target = context.line.prev;
      if (target && target.statics.blotName === 'table-view') {
        const rows = target.table().rows();
        const targetCell = rows[rows.length - 1].children.head;
        const targetLine = targetCell.children.head;
        this.quill.setSelection(targetLine.offset(this.quill.scroll), 0, external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.sources.USER);
        return false;
      }
      return true;
    }
  },
  'table-cell-line shortKey a': {
    key: 'a',
    shortKey: true,
    format: ['table-cell-line'],
    handler(range, context) {
      if (!range || !isTableCellLine(context.line)) {
        return;
      }
      const cell = context.line.parent;
      let childrenLength = 0;
      let currentChild = cell.children.head;
      while (currentChild) {
        childrenLength += currentChild.domNode.textContent.length;
        currentChild = currentChild.next;
      }
      const lineBreaks = cell.children.length - 1;
      const index = this.quill.getIndex(cell.children.head);
      this.quill.setSelection(index, childrenLength + lineBreaks);
    }
  },
  'table-cell-line tab': {
    key: 'Tab',
    format: ['table-cell-line'],
    handler(range, context) {
      if (!isTableCellLine(context.line)) {
        return true;
      }
      const tableCell = context.line.parent;
      if (tableCell.next) {
        const index = this.quill.getIndex(context.line.parent.next);
        this.quill.setSelection(index, external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.sources.USER);
        return false;
      }
      if (tableCell.parent.next && tableCell.parent.next.children.length > 0) {
        const index = this.quill.getIndex(tableCell.parent.next.children.head);
        this.quill.setSelection(index, external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.sources.USER);
        return false;
      }
      return false;
    }
  },
  'table-cell-line shiftKey tab': {
    key: 'Tab',
    shiftKey: true,
    format: ['table-cell-line'],
    handler(range, context) {
      if (!isTableCellLine(context.line)) {
        return true;
      }
      const tableCell = context.line.parent;
      if (tableCell.prev) {
        const index = this.quill.getIndex(context.line.parent.prev);
        this.quill.setSelection(index, external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.sources.USER);
        return false;
      } else if (tableCell.parent.prev && tableCell.parent.prev.children.length > 0) {
        const index = this.quill.getIndex(tableCell.parent.prev.children.tail);
        this.quill.setSelection(index, external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.sources.USER);
        return false;
      }
      if (tableCell.parent.prev && tableCell.parent.prev.children.length > 0) {
        const index = this.quill.getIndex(tableCell.parent.prev.children.head);
        this.quill.setSelection(index, external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.sources.USER);
        return false;
      }
      return false;
    }
  }
};
quill_table_QuillTable.requiredTableFormats = ['table', 'table-cell-line', 'table-row', 'table-body', 'table-col', 'table-col-group', 'table-container', 'table-view'];
quill_table_QuillTable.selectorsForExclude = ['.quill-table__wrapper', '.quill-table-operation-menu__context-btn', '.quill-table__selection-line', '.quill-table-operation-menu', '.quill-table-col-tool'];
function makeTableArrowHandler(up, useShift = false) {
  return {
    key: up ? 'ArrowUp' : 'ArrowDown',
    collapsed: true,
    shiftKey: useShift,
    format: ['table-cell-line'],
    handler(range, context) {
      // TODO move to table module
      const key = up ? 'prev' : 'next';
      const targetLine = context.line[key];
      if (targetLine != null) return true;
      const cell = context.line.parent;
      const targetRow = cell.parent[key];
      if (targetRow != null && targetRow.statics.blotName === 'table-row') {
        let targetCell = targetRow.children.head;
        let totalColspanOfTargetCell = parseInt(targetCell.formats().colspan, 10);
        let cur = cell;
        let totalColspanOfCur = parseInt(cur.formats().colspan, 10);

        // get targetCell above current cell depends on colspan
        while (cur.prev != null) {
          cur = cur.prev;
          totalColspanOfCur += parseInt(cur.formats().colspan, 10);
        }
        while (targetCell.next != null && totalColspanOfTargetCell < totalColspanOfCur) {
          targetCell = targetCell.next;
          totalColspanOfTargetCell += parseInt(targetCell.formats().colspan, 10);
        }
        const index = targetCell.offset(this.quill.scroll);
        this.quill.setSelection(index, 0, external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.sources.USER);
      } else {
        const targetLine = cell.table().parent[key];
        if (targetLine != null) {
          if (up) {
            this.quill.setSelection(targetLine.offset(this.quill.scroll) + targetLine.length() - 1, 0, external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.sources.USER);
          } else {
            this.quill.setSelection(targetLine.offset(this.quill.scroll), 0, external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.sources.USER);
          }
        }
      }
      return false;
    }
  };
}
function isInTableCell(current) {
  return Boolean(current.domNode.closest && current.domNode.closest('table'));
}
function isTableCellLine(current) {
  return current.statics.blotName === 'table-cell-line';
}
/* harmony default export */ var quill_table = __webpack_exports__["default"] = (quill_table_QuillTable);

/***/ }),
/* 2 */,
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ })
/******/ ])["default"];
});