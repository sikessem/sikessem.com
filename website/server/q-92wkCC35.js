import { j as jsx, b as _renderSSR, c as _pauseFromContexts, F as Fragment, s as setPlatform, d as componentQrl, i as inlinedQrl, e as _jsxQ, f as _wrapSignal, g as _jsxBranch, u as useServerData, h as useContext, k as _jsxC, S as SkipRender, l as useStylesQrl, m as useStore, n as _weakSerialize, o as useSignal, p as useContextProvider, r as useTaskQrl, t as Slot, w as getPlatform, x as noSerialize, y as createContextId, z as basePathname, A as useLexicalScope, B as getLocale, C as withLocale, D as _fnSignal, E as _jsxS } from './q-sFfusfq4.js';

/**
 * @license
 * @builder.io/qwik/server 1.4.5
 * Copyright Builder.io, Inc. All Rights Reserved.
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var SYNC_QRL = "<sync>";
function createPlatform(opts, resolvedManifest) {
  const mapper = resolvedManifest?.mapper;
  const mapperFn = opts.symbolMapper ? opts.symbolMapper : (symbolName) => {
    if (mapper) {
      const hash = getSymbolHash(symbolName);
      const result = mapper[hash];
      if (!result) {
        if (hash === SYNC_QRL) {
          return [hash, ""];
        }
        const isRegistered = globalThis.__qwik_reg_symbols?.has(hash);
        if (isRegistered) {
          return [symbolName, "_"];
        }
        console.error("Cannot resolve symbol", symbolName, "in", mapper);
      }
      return result;
    }
  };
  const serverPlatform = {
    isServer: true,
    async importSymbol(_containerEl, url, symbolName) {
      const hash = getSymbolHash(symbolName);
      const regSym = globalThis.__qwik_reg_symbols?.get(hash);
      if (regSym) {
        return regSym;
      }
      let modulePath = String(url);
      if (!modulePath.endsWith(".js")) {
        modulePath += ".js";
      }
      const module = __require(modulePath);
      if (!(symbolName in module)) {
        throw new Error(`Q-ERROR: missing symbol '${symbolName}' in module '${modulePath}'.`);
      }
      return module[symbolName];
    },
    raf: () => {
      console.error("server can not rerender");
      return Promise.resolve();
    },
    nextTick: (fn) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(fn());
        });
      });
    },
    chunkForSymbol(symbolName) {
      return mapperFn(symbolName, mapper);
    }
  };
  return serverPlatform;
}
async function setServerPlatform(opts, manifest) {
  const platform = createPlatform(opts, manifest);
  setPlatform(platform);
}
var getSymbolHash = (symbolName) => {
  const index = symbolName.lastIndexOf("_");
  if (index > -1) {
    return symbolName.slice(index + 1);
  }
  return symbolName;
};

// packages/qwik/src/server/utils.ts
function createTimer() {
  if (typeof performance === "undefined") {
    return () => 0;
  }
  const start = performance.now();
  return () => {
    const end = performance.now();
    const delta = end - start;
    return delta / 1e6;
  };
}
function getBuildBase(opts) {
  let base = opts.base;
  if (typeof opts.base === "function") {
    base = opts.base(opts);
  }
  if (typeof base === "string") {
    if (!base.endsWith("/")) {
      base += "/";
    }
    return base;
  }
  return "/build/";
}

// packages/qwik/src/server/scripts.ts
var QWIK_LOADER_DEFAULT_MINIFIED = '((e,t)=>{const n="__q_context__",s=window,o=new Set,i=t=>e.querySelectorAll(t),a=(e,t,n=t.type)=>{i("[on"+e+"\\\\:"+n+"]").forEach((s=>f(s,e,t,n)))},r=(e,t)=>e.getAttribute(t),l=t=>{if(void 0===t._qwikjson_){let n=(t===e.documentElement?e.body:t).lastElementChild;for(;n;){if("SCRIPT"===n.tagName&&"qwik/json"===r(n,"type")){t._qwikjson_=JSON.parse(n.textContent.replace(/\\\\x3C(\\/?script)/gi,"<$1"));break}n=n.previousElementSibling}}},c=(e,t)=>new CustomEvent(e,{detail:t}),f=async(t,s,o,i=o.type)=>{const a="on"+s+":"+i;t.hasAttribute("preventdefault:"+i)&&o.preventDefault();const c=t._qc_,f=null==c?void 0:c.li.filter((e=>e[0]===a));if(f&&f.length>0){for(const e of f)await e[1].getFn([t,o],(()=>t.isConnected))(o,t);return}const b=r(t,a);if(b){const s=t.closest("[q\\\\:container]"),i=new URL(r(s,"q:base"),e.baseURI);for(const a of b.split("\\n")){const r=new URL(a,i),c=r.hash.replace(/^#?([^?[|]*).*$/,"$1")||"default",f=performance.now();let b;const d=a.startsWith("#");if(d)b=(s.qFuncs||[])[Number.parseInt(c)];else{const e=import(\n/* @vite-ignore */\nr.href.split("#")[0]);l(s),b=(await e)[c]}const p=e[n];if(t.isConnected)try{e[n]=[t,o,r],d||u("qsymbol",{symbol:c,element:t,reqTime:f}),await b(o,t)}finally{e[n]=p}}}},u=(t,n)=>{e.dispatchEvent(c(t,n))},b=e=>e.replace(/([A-Z])/g,(e=>"-"+e.toLowerCase())),d=async e=>{let t=b(e.type),n=e.target;for(a("-document",e,t);n&&n.getAttribute;)await f(n,"",e,t),n=e.bubbles&&!0!==e.cancelBubble?n.parentElement:null},p=e=>{a("-window",e,b(e.type))},q=()=>{var n;const a=e.readyState;if(!t&&("interactive"==a||"complete"==a)&&(t=1,u("qinit"),(null!=(n=s.requestIdleCallback)?n:s.setTimeout).bind(s)((()=>u("qidle"))),o.has("qvisible"))){const e=i("[on\\\\:qvisible]"),t=new IntersectionObserver((e=>{for(const n of e)n.isIntersecting&&(t.unobserve(n.target),f(n.target,"",c("qvisible",n)))}));e.forEach((e=>t.observe(e)))}},w=(e,t,n,s=!1)=>e.addEventListener(t,n,{capture:s,passive:!1}),v=t=>{for(const n of t)o.has(n)||(w(e,n,d,!0),w(s,n,p),o.add(n))};if(!e.qR){const t=s.qwikevents;Array.isArray(t)&&v(t),s.qwikevents={push:(...e)=>v(e)},w(e,"readystatechange",q),q()}})(document);';
var QWIK_LOADER_DEFAULT_DEBUG = '(() => {\n    ((doc, hasInitialized) => {\n        const win = window;\n        const events =  new Set;\n        const querySelectorAll = query => doc.querySelectorAll(query);\n        const broadcast = (infix, ev, type = ev.type) => {\n            querySelectorAll("[on" + infix + "\\\\:" + type + "]").forEach((target => dispatch(target, infix, ev, type)));\n        };\n        const getAttribute = (el, name) => el.getAttribute(name);\n        const resolveContainer = containerEl => {\n            if (void 0 === containerEl._qwikjson_) {\n                let script = (containerEl === doc.documentElement ? doc.body : containerEl).lastElementChild;\n                while (script) {\n                    if ("SCRIPT" === script.tagName && "qwik/json" === getAttribute(script, "type")) {\n                        containerEl._qwikjson_ = JSON.parse(script.textContent.replace(/\\\\x3C(\\/?script)/gi, "<$1"));\n                        break;\n                    }\n                    script = script.previousElementSibling;\n                }\n            }\n        };\n        const createEvent = (eventName, detail) => new CustomEvent(eventName, {\n            detail: detail\n        });\n        const dispatch = async (element, onPrefix, ev, eventName = ev.type) => {\n            const attrName = "on" + onPrefix + ":" + eventName;\n            element.hasAttribute("preventdefault:" + eventName) && ev.preventDefault();\n            const ctx = element._qc_;\n            const relevantListeners = null == ctx ? void 0 : ctx.li.filter((li => li[0] === attrName));\n            if (relevantListeners && relevantListeners.length > 0) {\n                for (const listener of relevantListeners) {\n                    await listener[1].getFn([ element, ev ], (() => element.isConnected))(ev, element);\n                }\n                return;\n            }\n            const attrValue = getAttribute(element, attrName);\n            if (attrValue) {\n                const container = element.closest("[q\\\\:container]");\n                const base = new URL(getAttribute(container, "q:base"), doc.baseURI);\n                for (const qrl of attrValue.split("\\n")) {\n                    const url = new URL(qrl, base);\n                    const symbolName = url.hash.replace(/^#?([^?[|]*).*$/, "$1") || "default";\n                    const reqTime = performance.now();\n                    let handler;\n                    const isSync = qrl.startsWith("#");\n                    if (isSync) {\n                        handler = (container.qFuncs || [])[Number.parseInt(symbolName)];\n                    } else {\n                        const module = import(\n                        /* @vite-ignore */\n                        url.href.split("#")[0]);\n                        resolveContainer(container);\n                        handler = (await module)[symbolName];\n                    }\n                    const previousCtx = doc.__q_context__;\n                    if (element.isConnected) {\n                        try {\n                            doc.__q_context__ = [ element, ev, url ];\n                            isSync || emitEvent("qsymbol", {\n                                symbol: symbolName,\n                                element: element,\n                                reqTime: reqTime\n                            });\n                            await handler(ev, element);\n                        } finally {\n                            doc.__q_context__ = previousCtx;\n                        }\n                    }\n                }\n            }\n        };\n        const emitEvent = (eventName, detail) => {\n            doc.dispatchEvent(createEvent(eventName, detail));\n        };\n        const camelToKebab = str => str.replace(/([A-Z])/g, (a => "-" + a.toLowerCase()));\n        const processDocumentEvent = async ev => {\n            let type = camelToKebab(ev.type);\n            let element = ev.target;\n            broadcast("-document", ev, type);\n            while (element && element.getAttribute) {\n                await dispatch(element, "", ev, type);\n                element = ev.bubbles && !0 !== ev.cancelBubble ? element.parentElement : null;\n            }\n        };\n        const processWindowEvent = ev => {\n            broadcast("-window", ev, camelToKebab(ev.type));\n        };\n        const processReadyStateChange = () => {\n            var _a;\n            const readyState = doc.readyState;\n            if (!hasInitialized && ("interactive" == readyState || "complete" == readyState)) {\n                hasInitialized = 1;\n                emitEvent("qinit");\n                (null != (_a = win.requestIdleCallback) ? _a : win.setTimeout).bind(win)((() => emitEvent("qidle")));\n                if (events.has("qvisible")) {\n                    const results = querySelectorAll("[on\\\\:qvisible]");\n                    const observer = new IntersectionObserver((entries => {\n                        for (const entry of entries) {\n                            if (entry.isIntersecting) {\n                                observer.unobserve(entry.target);\n                                dispatch(entry.target, "", createEvent("qvisible", entry));\n                            }\n                        }\n                    }));\n                    results.forEach((el => observer.observe(el)));\n                }\n            }\n        };\n        const addEventListener = (el, eventName, handler, capture = !1) => el.addEventListener(eventName, handler, {\n            capture: capture,\n            passive: !1\n        });\n        const push = eventNames => {\n            for (const eventName of eventNames) {\n                if (!events.has(eventName)) {\n                    addEventListener(doc, eventName, processDocumentEvent, !0);\n                    addEventListener(win, eventName, processWindowEvent);\n                    events.add(eventName);\n                }\n            }\n        };\n        if (!doc.qR) {\n            const qwikevents = win.qwikevents;\n            Array.isArray(qwikevents) && push(qwikevents);\n            win.qwikevents = {\n                push: (...e) => push(e)\n            };\n            addEventListener(doc, "readystatechange", processReadyStateChange);\n            processReadyStateChange();\n        }\n    })(document);\n})();';
var QWIK_LOADER_OPTIMIZE_MINIFIED = '((e,t)=>{const n="__q_context__",s=window,o=new Set,i=t=>e.querySelectorAll(t),a=(e,t,n=t.type)=>{i("[on"+e+"\\\\:"+n+"]").forEach((s=>f(s,e,t,n)))},r=(e,t)=>e.getAttribute(t),l=t=>{if(void 0===t._qwikjson_){let n=(t===e.documentElement?e.body:t).lastElementChild;for(;n;){if("SCRIPT"===n.tagName&&"qwik/json"===r(n,"type")){t._qwikjson_=JSON.parse(n.textContent.replace(/\\\\x3C(\\/?script)/gi,"<$1"));break}n=n.previousElementSibling}}},c=(e,t)=>new CustomEvent(e,{detail:t}),f=async(t,s,o,i=o.type)=>{const a="on"+s+":"+i;t.hasAttribute("preventdefault:"+i)&&o.preventDefault();const c=t._qc_,f=null==c?void 0:c.li.filter((e=>e[0]===a));if(f&&f.length>0){for(const e of f)await e[1].getFn([t,o],(()=>t.isConnected))(o,t);return}const b=r(t,a);if(b){const s=t.closest("[q\\\\:container]"),i=new URL(r(s,"q:base"),e.baseURI);for(const a of b.split("\\n")){const r=new URL(a,i),c=r.hash.replace(/^#?([^?[|]*).*$/,"$1")||"default",f=performance.now();let b;const d=a.startsWith("#");if(d)b=(s.qFuncs||[])[Number.parseInt(c)];else{const e=import(\n/* @vite-ignore */\nr.href.split("#")[0]);l(s),b=(await e)[c]}const p=e[n];if(t.isConnected)try{e[n]=[t,o,r],d||u("qsymbol",{symbol:c,element:t,reqTime:f}),await b(o,t)}finally{e[n]=p}}}},u=(t,n)=>{e.dispatchEvent(c(t,n))},b=e=>e.replace(/([A-Z])/g,(e=>"-"+e.toLowerCase())),d=async e=>{let t=b(e.type),n=e.target;for(a("-document",e,t);n&&n.getAttribute;)await f(n,"",e,t),n=e.bubbles&&!0!==e.cancelBubble?n.parentElement:null},p=e=>{a("-window",e,b(e.type))},q=()=>{var n;const a=e.readyState;if(!t&&("interactive"==a||"complete"==a)&&(t=1,u("qinit"),(null!=(n=s.requestIdleCallback)?n:s.setTimeout).bind(s)((()=>u("qidle"))),o.has("qvisible"))){const e=i("[on\\\\:qvisible]"),t=new IntersectionObserver((e=>{for(const n of e)n.isIntersecting&&(t.unobserve(n.target),f(n.target,"",c("qvisible",n)))}));e.forEach((e=>t.observe(e)))}},w=(e,t,n,s=!1)=>e.addEventListener(t,n,{capture:s,passive:!1}),v=t=>{for(const n of t)o.has(n)||(w(e,n,d,!0),w(s,n,p),o.add(n))};if(!e.qR){const t=s.qwikevents;Array.isArray(t)&&v(t),s.qwikevents={push:(...e)=>v(e)},w(e,"readystatechange",q),q()}})(document);';
var QWIK_LOADER_OPTIMIZE_DEBUG = '(() => {\n    ((doc, hasInitialized) => {\n        const win = window;\n        const events = new Set;\n        const querySelectorAll = query => doc.querySelectorAll(query);\n        const broadcast = (infix, ev, type = ev.type) => {\n            querySelectorAll("[on" + infix + "\\\\:" + type + "]").forEach((target => dispatch(target, infix, ev, type)));\n        };\n        const getAttribute = (el, name) => el.getAttribute(name);\n        const resolveContainer = containerEl => {\n            if (void 0 === containerEl._qwikjson_) {\n                let script = (containerEl === doc.documentElement ? doc.body : containerEl).lastElementChild;\n                while (script) {\n                    if ("SCRIPT" === script.tagName && "qwik/json" === getAttribute(script, "type")) {\n                        containerEl._qwikjson_ = JSON.parse(script.textContent.replace(/\\\\x3C(\\/?script)/gi, "<$1"));\n                        break;\n                    }\n                    script = script.previousElementSibling;\n                }\n            }\n        };\n        const createEvent = (eventName, detail) => new CustomEvent(eventName, {\n            detail: detail\n        });\n        const dispatch = async (element, onPrefix, ev, eventName = ev.type) => {\n            const attrName = "on" + onPrefix + ":" + eventName;\n            element.hasAttribute("preventdefault:" + eventName) && ev.preventDefault();\n            const ctx = element._qc_;\n            const relevantListeners = null == ctx ? void 0 : ctx.li.filter((li => li[0] === attrName));\n            if (relevantListeners && relevantListeners.length > 0) {\n                for (const listener of relevantListeners) {\n                    await listener[1].getFn([ element, ev ], (() => element.isConnected))(ev, element);\n                }\n                return;\n            }\n            const attrValue = getAttribute(element, attrName);\n            if (attrValue) {\n                const container = element.closest("[q\\\\:container]");\n                const base = new URL(getAttribute(container, "q:base"), doc.baseURI);\n                for (const qrl of attrValue.split("\\n")) {\n                    const url = new URL(qrl, base);\n                    const symbolName = url.hash.replace(/^#?([^?[|]*).*$/, "$1") || "default";\n                    const reqTime = performance.now();\n                    let handler;\n                    const isSync = qrl.startsWith("#");\n                    if (isSync) {\n                        handler = (container.qFuncs || [])[Number.parseInt(symbolName)];\n                    } else {\n                        const module = import(\n                        /* @vite-ignore */\n                        url.href.split("#")[0]);\n                        resolveContainer(container);\n                        handler = (await module)[symbolName];\n                    }\n                    const previousCtx = doc.__q_context__;\n                    if (element.isConnected) {\n                        try {\n                            doc.__q_context__ = [ element, ev, url ];\n                            isSync || emitEvent("qsymbol", {\n                                symbol: symbolName,\n                                element: element,\n                                reqTime: reqTime\n                            });\n                            await handler(ev, element);\n                        } finally {\n                            doc.__q_context__ = previousCtx;\n                        }\n                    }\n                }\n            }\n        };\n        const emitEvent = (eventName, detail) => {\n            doc.dispatchEvent(createEvent(eventName, detail));\n        };\n        const camelToKebab = str => str.replace(/([A-Z])/g, (a => "-" + a.toLowerCase()));\n        const processDocumentEvent = async ev => {\n            let type = camelToKebab(ev.type);\n            let element = ev.target;\n            broadcast("-document", ev, type);\n            while (element && element.getAttribute) {\n                await dispatch(element, "", ev, type);\n                element = ev.bubbles && !0 !== ev.cancelBubble ? element.parentElement : null;\n            }\n        };\n        const processWindowEvent = ev => {\n            broadcast("-window", ev, camelToKebab(ev.type));\n        };\n        const processReadyStateChange = () => {\n            var _a;\n            const readyState = doc.readyState;\n            if (!hasInitialized && ("interactive" == readyState || "complete" == readyState)) {\n                hasInitialized = 1;\n                emitEvent("qinit");\n                (null != (_a = win.requestIdleCallback) ? _a : win.setTimeout).bind(win)((() => emitEvent("qidle")));\n                if (events.has("qvisible")) {\n                    const results = querySelectorAll("[on\\\\:qvisible]");\n                    const observer = new IntersectionObserver((entries => {\n                        for (const entry of entries) {\n                            if (entry.isIntersecting) {\n                                observer.unobserve(entry.target);\n                                dispatch(entry.target, "", createEvent("qvisible", entry));\n                            }\n                        }\n                    }));\n                    results.forEach((el => observer.observe(el)));\n                }\n            }\n        };\n        const addEventListener = (el, eventName, handler, capture = !1) => el.addEventListener(eventName, handler, {\n            capture: capture,\n            passive: !1\n        });\n        const push = eventNames => {\n            for (const eventName of eventNames) {\n                if (!events.has(eventName)) {\n                    addEventListener(doc, eventName, processDocumentEvent, !0);\n                    addEventListener(win, eventName, processWindowEvent);\n                    events.add(eventName);\n                }\n            }\n        };\n        if (!doc.qR) {\n            const qwikevents = win.qwikevents;\n            Array.isArray(qwikevents) && push(qwikevents);\n            win.qwikevents = {\n                push: (...e) => push(e)\n            };\n            addEventListener(doc, "readystatechange", processReadyStateChange);\n            processReadyStateChange();\n        }\n    })(document);\n})();';
function getQwikLoaderScript(opts = {}) {
  if (Array.isArray(opts.events) && opts.events.length > 0) {
    const loader = opts.debug ? QWIK_LOADER_OPTIMIZE_DEBUG : QWIK_LOADER_OPTIMIZE_MINIFIED;
    return loader.replace("window.qEvents", JSON.stringify(opts.events));
  }
  return opts.debug ? QWIK_LOADER_DEFAULT_DEBUG : QWIK_LOADER_DEFAULT_MINIFIED;
}

// packages/qwik/src/server/prefetch-strategy.ts
function getPrefetchResources(snapshotResult, opts, resolvedManifest) {
  if (!resolvedManifest) {
    return [];
  }
  const prefetchStrategy = opts.prefetchStrategy;
  const buildBase = getBuildBase(opts);
  if (prefetchStrategy !== null) {
    if (!prefetchStrategy || !prefetchStrategy.symbolsToPrefetch || prefetchStrategy.symbolsToPrefetch === "auto") {
      return getAutoPrefetch(snapshotResult, resolvedManifest, buildBase);
    }
    if (typeof prefetchStrategy.symbolsToPrefetch === "function") {
      try {
        return prefetchStrategy.symbolsToPrefetch({ manifest: resolvedManifest.manifest });
      } catch (e) {
        console.error("getPrefetchUrls, symbolsToPrefetch()", e);
      }
    }
  }
  return [];
}
function getAutoPrefetch(snapshotResult, resolvedManifest, buildBase) {
  const prefetchResources = [];
  const qrls = snapshotResult?.qrls;
  const { mapper, manifest } = resolvedManifest;
  const urls = /* @__PURE__ */ new Map();
  if (Array.isArray(qrls)) {
    for (const obj of qrls) {
      const qrlSymbolName = obj.getHash();
      const resolvedSymbol = mapper[qrlSymbolName];
      if (resolvedSymbol) {
        addBundle(manifest, urls, prefetchResources, buildBase, resolvedSymbol[1]);
      }
    }
  }
  return prefetchResources;
}
function addBundle(manifest, urls, prefetchResources, buildBase, bundleFileName) {
  const url = buildBase + bundleFileName;
  let prefetchResource = urls.get(url);
  if (!prefetchResource) {
    prefetchResource = {
      url,
      imports: []
    };
    urls.set(url, prefetchResource);
    const bundle = manifest.bundles[bundleFileName];
    if (bundle) {
      if (Array.isArray(bundle.imports)) {
        for (const importedFilename of bundle.imports) {
          addBundle(manifest, urls, prefetchResource.imports, buildBase, importedFilename);
        }
      }
    }
  }
  prefetchResources.push(prefetchResource);
}

// packages/qwik/src/optimizer/src/manifest.ts
function getValidManifest(manifest) {
  if (manifest != null && manifest.mapping != null && typeof manifest.mapping === "object" && manifest.symbols != null && typeof manifest.symbols === "object" && manifest.bundles != null && typeof manifest.bundles === "object") {
    return manifest;
  }
  return void 0;
}

// packages/qwik/src/server/prefetch-utils.ts
function workerFetchScript() {
  const fetch = `Promise.all(e.data.map(u=>fetch(u))).finally(()=>{setTimeout(postMessage({}),9999)})`;
  const workerBody = `onmessage=(e)=>{${fetch}}`;
  const blob = `new Blob(['${workerBody}'],{type:"text/javascript"})`;
  const url = `URL.createObjectURL(${blob})`;
  let s = `const w=new Worker(${url});`;
  s += `w.postMessage(u.map(u=>new URL(u,origin)+''));`;
  s += `w.onmessage=()=>{w.terminate()};`;
  return s;
}
function prefetchUrlsEventScript(prefetchResources) {
  const data = {
    bundles: flattenPrefetchResources(prefetchResources).map((u) => u.split("/").pop())
  };
  return `document.dispatchEvent(new CustomEvent("qprefetch",{detail:${JSON.stringify(data)}}))`;
}
function flattenPrefetchResources(prefetchResources) {
  const urls = [];
  const addPrefetchResource = (prefetchResources2) => {
    if (Array.isArray(prefetchResources2)) {
      for (const prefetchResource of prefetchResources2) {
        if (!urls.includes(prefetchResource.url)) {
          urls.push(prefetchResource.url);
          addPrefetchResource(prefetchResource.imports);
        }
      }
    }
  };
  addPrefetchResource(prefetchResources);
  return urls;
}
function getMostReferenced(prefetchResources) {
  const common = /* @__PURE__ */ new Map();
  let total = 0;
  const addPrefetchResource = (prefetchResources2, visited2) => {
    if (Array.isArray(prefetchResources2)) {
      for (const prefetchResource of prefetchResources2) {
        const count = common.get(prefetchResource.url) || 0;
        common.set(prefetchResource.url, count + 1);
        total++;
        if (!visited2.has(prefetchResource.url)) {
          visited2.add(prefetchResource.url);
          addPrefetchResource(prefetchResource.imports, visited2);
        }
      }
    }
  };
  const visited = /* @__PURE__ */ new Set();
  for (const resource of prefetchResources) {
    visited.clear();
    addPrefetchResource(resource.imports, visited);
  }
  const threshold = total / common.size * 2;
  const urls = Array.from(common.entries());
  urls.sort((a, b) => b[1] - a[1]);
  return urls.slice(0, 5).filter((e) => e[1] > threshold).map((e) => e[0]);
}

// packages/qwik/src/server/prefetch-implementation.ts
function applyPrefetchImplementation(prefetchStrategy, prefetchResources, nonce) {
  const prefetchImpl = normalizePrefetchImplementation(prefetchStrategy?.implementation);
  const prefetchNodes = [];
  if (prefetchImpl.prefetchEvent === "always") {
    prefetchUrlsEvent(prefetchNodes, prefetchResources, nonce);
  }
  if (prefetchImpl.linkInsert === "html-append") {
    linkHtmlImplementation(prefetchNodes, prefetchResources, prefetchImpl);
  }
  if (prefetchImpl.linkInsert === "js-append") {
    linkJsImplementation(prefetchNodes, prefetchResources, prefetchImpl, nonce);
  } else if (prefetchImpl.workerFetchInsert === "always") {
    workerFetchImplementation(prefetchNodes, prefetchResources, nonce);
  }
  if (prefetchNodes.length > 0) {
    return jsx(Fragment, { children: prefetchNodes });
  }
  return null;
}
function prefetchUrlsEvent(prefetchNodes, prefetchResources, nonce) {
  const mostReferenced = getMostReferenced(prefetchResources);
  for (const url of mostReferenced) {
    prefetchNodes.push(
      jsx("link", {
        rel: "modulepreload",
        href: url,
        nonce
      })
    );
  }
  prefetchNodes.push(
    jsx("script", {
      "q:type": "prefetch-bundles",
      dangerouslySetInnerHTML: prefetchUrlsEventScript(prefetchResources) + `;document.dispatchEvent(new CustomEvent('qprefetch', {detail:{links: [location.pathname]}}))`,
      nonce
    })
  );
}
function linkHtmlImplementation(prefetchNodes, prefetchResources, prefetchImpl) {
  const urls = flattenPrefetchResources(prefetchResources);
  const rel = prefetchImpl.linkRel || "prefetch";
  for (const url of urls) {
    const attributes = {};
    attributes["href"] = url;
    attributes["rel"] = rel;
    if (rel === "prefetch" || rel === "preload") {
      if (url.endsWith(".js")) {
        attributes["as"] = "script";
      }
    }
    prefetchNodes.push(jsx("link", attributes, void 0));
  }
}
function linkJsImplementation(prefetchNodes, prefetchResources, prefetchImpl, nonce) {
  const rel = prefetchImpl.linkRel || "prefetch";
  let s = ``;
  if (prefetchImpl.workerFetchInsert === "no-link-support") {
    s += `let supportsLinkRel = true;`;
  }
  s += `const u=${JSON.stringify(flattenPrefetchResources(prefetchResources))};`;
  s += `u.map((u,i)=>{`;
  s += `const l=document.createElement('link');`;
  s += `l.setAttribute("href",u);`;
  s += `l.setAttribute("rel","${rel}");`;
  if (prefetchImpl.workerFetchInsert === "no-link-support") {
    s += `if(i===0){`;
    s += `try{`;
    s += `supportsLinkRel=l.relList.supports("${rel}");`;
    s += `}catch(e){}`;
    s += `}`;
  }
  s += `document.body.appendChild(l);`;
  s += `});`;
  if (prefetchImpl.workerFetchInsert === "no-link-support") {
    s += `if(!supportsLinkRel){`;
    s += workerFetchScript();
    s += `}`;
  }
  if (prefetchImpl.workerFetchInsert === "always") {
    s += workerFetchScript();
  }
  prefetchNodes.push(
    jsx("script", {
      type: "module",
      "q:type": "link-js",
      dangerouslySetInnerHTML: s,
      nonce
    })
  );
}
function workerFetchImplementation(prefetchNodes, prefetchResources, nonce) {
  let s = `const u=${JSON.stringify(flattenPrefetchResources(prefetchResources))};`;
  s += workerFetchScript();
  prefetchNodes.push(
    jsx("script", {
      type: "module",
      "q:type": "prefetch-worker",
      dangerouslySetInnerHTML: s,
      nonce
    })
  );
}
function normalizePrefetchImplementation(input) {
  return { ...PrefetchImplementationDefault, ...input };
}
var PrefetchImplementationDefault = {
  linkInsert: null,
  linkRel: null,
  workerFetchInsert: null,
  prefetchEvent: "always"
};

// packages/qwik/src/server/render.ts
var DOCTYPE = "<!DOCTYPE html>";
async function renderToStream(rootNode, opts) {
  let stream = opts.stream;
  let bufferSize = 0;
  let totalSize = 0;
  let networkFlushes = 0;
  let firstFlushTime = 0;
  let buffer = "";
  let snapshotResult;
  const inOrderStreaming = opts.streaming?.inOrder ?? {
    strategy: "auto",
    maximunInitialChunk: 5e4,
    maximunChunk: 3e4
  };
  const containerTagName = opts.containerTagName ?? "html";
  const containerAttributes = opts.containerAttributes ?? {};
  const nativeStream = stream;
  const firstFlushTimer = createTimer();
  const buildBase = getBuildBase(opts);
  const resolvedManifest = resolveManifest(opts.manifest);
  function flush() {
    if (buffer) {
      nativeStream.write(buffer);
      buffer = "";
      bufferSize = 0;
      networkFlushes++;
      if (networkFlushes === 1) {
        firstFlushTime = firstFlushTimer();
      }
    }
  }
  function enqueue(chunk) {
    const len = chunk.length;
    bufferSize += len;
    totalSize += len;
    buffer += chunk;
  }
  switch (inOrderStreaming.strategy) {
    case "disabled":
      stream = {
        write: enqueue
      };
      break;
    case "direct":
      stream = nativeStream;
      break;
    case "auto":
      let count = 0;
      let forceFlush = false;
      const minimunChunkSize = inOrderStreaming.maximunChunk ?? 0;
      const initialChunkSize = inOrderStreaming.maximunInitialChunk ?? 0;
      stream = {
        write(chunk) {
          if (chunk === "<!--qkssr-f-->") {
            forceFlush || (forceFlush = true);
          } else if (chunk === "<!--qkssr-pu-->") {
            count++;
          } else if (chunk === "<!--qkssr-po-->") {
            count--;
          } else {
            enqueue(chunk);
          }
          const chunkSize = networkFlushes === 0 ? initialChunkSize : minimunChunkSize;
          if (count === 0 && (forceFlush || bufferSize >= chunkSize)) {
            forceFlush = false;
            flush();
          }
        }
      };
      break;
  }
  if (containerTagName === "html") {
    stream.write(DOCTYPE);
  } else {
    stream.write("<!--cq-->");
    if (opts.qwikLoader) {
      if (opts.qwikLoader.include === void 0) {
        opts.qwikLoader.include = "never";
      }
      if (opts.qwikLoader.position === void 0) {
        opts.qwikLoader.position = "bottom";
      }
    } else {
      opts.qwikLoader = {
        include: "never"
      };
    }
    if (!opts.qwikPrefetchServiceWorker) {
      opts.qwikPrefetchServiceWorker = {};
    }
    if (!opts.qwikPrefetchServiceWorker.include) {
      opts.qwikPrefetchServiceWorker.include = false;
    }
    if (!opts.qwikPrefetchServiceWorker.position) {
      opts.qwikPrefetchServiceWorker.position = "top";
    }
  }
  if (!opts.manifest) {
    console.warn(
      `Missing client manifest, loading symbols in the client might 404. Please ensure the client build has run and generated the manifest for the server build.`
    );
  }
  await setServerPlatform(opts, resolvedManifest);
  const injections = resolvedManifest?.manifest.injections;
  const beforeContent = injections ? injections.map((injection) => jsx(injection.tag, injection.attributes ?? {})) : void 0;
  const renderTimer = createTimer();
  const renderSymbols = [];
  let renderTime = 0;
  let snapshotTime = 0;
  await _renderSSR(rootNode, {
    stream,
    containerTagName,
    containerAttributes,
    serverData: opts.serverData,
    base: buildBase,
    beforeContent,
    beforeClose: async (contexts, containerState, _dynamic, textNodes) => {
      renderTime = renderTimer();
      const snapshotTimer = createTimer();
      snapshotResult = await _pauseFromContexts(contexts, containerState, void 0, textNodes);
      const children = [];
      if (opts.prefetchStrategy !== null) {
        const prefetchResources = getPrefetchResources(snapshotResult, opts, resolvedManifest);
        if (prefetchResources.length > 0) {
          const prefetchImpl = applyPrefetchImplementation(
            opts.prefetchStrategy,
            prefetchResources,
            opts.serverData?.nonce
          );
          if (prefetchImpl) {
            children.push(prefetchImpl);
          }
        }
      }
      const jsonData = JSON.stringify(snapshotResult.state, void 0, void 0);
      children.push(
        jsx("script", {
          type: "qwik/json",
          dangerouslySetInnerHTML: escapeText(jsonData),
          nonce: opts.serverData?.nonce
        })
      );
      if (snapshotResult.funcs.length > 0) {
        children.push(
          jsx("script", {
            "q:func": "qwik/json",
            dangerouslySetInnerHTML: serializeFunctions(snapshotResult.funcs),
            nonce: opts.serverData?.nonce
          })
        );
      }
      const needLoader = !snapshotResult || snapshotResult.mode !== "static";
      const includeMode = opts.qwikLoader?.include ?? "auto";
      const includeLoader = includeMode === "always" || includeMode === "auto" && needLoader;
      if (includeLoader) {
        const qwikLoaderScript = getQwikLoaderScript({
          events: opts.qwikLoader?.events,
          debug: opts.debug
        });
        children.push(
          jsx("script", {
            id: "qwikloader",
            dangerouslySetInnerHTML: qwikLoaderScript,
            nonce: opts.serverData?.nonce
          })
        );
      }
      const extraListeners = Array.from(containerState.$events$, (s) => JSON.stringify(s));
      if (extraListeners.length > 0) {
        let content = `window.qwikevents.push(${extraListeners.join(", ")})`;
        if (!includeLoader) {
          content = `window.qwikevents||=[];${content}`;
        }
        children.push(
          jsx("script", {
            dangerouslySetInnerHTML: content,
            nonce: opts.serverData?.nonce
          })
        );
      }
      collectRenderSymbols(renderSymbols, contexts);
      snapshotTime = snapshotTimer();
      return jsx(Fragment, { children });
    },
    manifestHash: resolvedManifest?.manifest.manifestHash || "dev"
  });
  if (containerTagName !== "html") {
    stream.write("<!--/cq-->");
  }
  flush();
  const isDynamic = snapshotResult.resources.some((r) => r._cache !== Infinity);
  const result = {
    prefetchResources: void 0,
    snapshotResult,
    flushes: networkFlushes,
    manifest: resolvedManifest?.manifest,
    size: totalSize,
    isStatic: !isDynamic,
    timing: {
      render: renderTime,
      snapshot: snapshotTime,
      firstFlush: firstFlushTime
    },
    _symbols: renderSymbols
  };
  return result;
}
function resolveManifest(manifest) {
  if (!manifest) {
    return void 0;
  }
  if ("mapper" in manifest) {
    return manifest;
  }
  manifest = getValidManifest(manifest);
  if (manifest) {
    const mapper = {};
    Object.entries(manifest.mapping).forEach(([key, value]) => {
      mapper[getSymbolHash(key)] = [key, value];
    });
    return {
      mapper,
      manifest
    };
  }
  return void 0;
}
var escapeText = (str) => {
  return str.replace(/<(\/?script)/gi, "\\x3C$1");
};
function collectRenderSymbols(renderSymbols, elements) {
  for (const ctx of elements) {
    const symbol = ctx.$componentQrl$?.getSymbol();
    if (symbol && !renderSymbols.includes(symbol)) {
      renderSymbols.push(symbol);
    }
  }
}
var Q_FUNCS_PREFIX = 'document.currentScript.closest("[q\\\\:container]").qFuncs=';
function serializeFunctions(funcs) {
  return Q_FUNCS_PREFIX + `[${funcs.join(",\n")}]`;
}

// packages/qwik/src/server/index.ts
async function setServerPlatform2(manifest) {
  const platform = createPlatform({ manifest }, resolveManifest(manifest));
  setPlatform(platform);
}

// @qwik-client-manifest
const manifest = {"manifestHash":"ulqfct","symbols":{"s_02wMImzEAbk":{"origin":"../node_modules/@builder.io/qwik-city/index.qwik.mjs","displayName":"QwikCityProvider_component_useTask","canonicalFilename":"s_02wmimzeabk","hash":"02wMImzEAbk","ctxKind":"function","ctxName":"useTask$","captures":true,"parent":"s_TxCFOy819ag","loc":[27091,36262]},"s_8gdLBszqbaM":{"origin":"../node_modules/@builder.io/qwik-city/index.qwik.mjs","displayName":"Link_component","canonicalFilename":"s_8gdlbszqbam","hash":"8gdLBszqbaM","ctxKind":"function","ctxName":"component$","captures":false,"loc":[38246,40918]},"s_Nk9PlpjQm9Y":{"origin":"../node_modules/@builder.io/qwik-city/index.qwik.mjs","displayName":"GetForm_component","canonicalFilename":"s_nk9plpjqm9y","hash":"Nk9PlpjQm9Y","ctxKind":"function","ctxName":"component$","captures":false,"loc":[51079,52430]},"s_NuUWtFC0yY0":{"origin":"routes/index.tsx","displayName":"routes_component","canonicalFilename":"s_nuuwtfc0yy0","hash":"NuUWtFC0yY0","ctxKind":"function","ctxName":"component$","captures":false,"loc":[134,307]},"s_PpMpiMPB0t0":{"origin":"routes/layout.tsx","displayName":"layout_component","canonicalFilename":"s_ppmpimpb0t0","hash":"PpMpiMPB0t0","ctxKind":"function","ctxName":"component$","captures":false,"loc":[589,617]},"s_TxCFOy819ag":{"origin":"../node_modules/@builder.io/qwik-city/index.qwik.mjs","displayName":"QwikCityProvider_component","canonicalFilename":"s_txcfoy819ag","hash":"TxCFOy819ag","ctxKind":"function","ctxName":"component$","captures":false,"loc":[23821,36549]},"s_WmYC5H00wtI":{"origin":"../node_modules/@builder.io/qwik-city/index.qwik.mjs","displayName":"QwikCityMockProvider_component","canonicalFilename":"s_wmyc5h00wti","hash":"WmYC5H00wtI","ctxKind":"function","ctxName":"component$","captures":false,"loc":[36833,38127]},"s_e0ssiDXoeAM":{"origin":"../node_modules/@builder.io/qwik-city/index.qwik.mjs","displayName":"RouterOutlet_component","canonicalFilename":"s_e0ssidxoeam","hash":"e0ssiDXoeAM","ctxKind":"function","ctxName":"component$","captures":false,"loc":[7931,8645]},"s_g185BADJLYE":{"origin":"root.tsx","displayName":"root_component","canonicalFilename":"s_g185badjlye","hash":"g185BADJLYE","ctxKind":"function","ctxName":"component$","captures":false,"loc":[268,793]},"s_ksGvWVvmPFA":{"origin":"components/router-head/router-head.tsx","displayName":"RouterHead_component","canonicalFilename":"s_ksgvwvvmpfa","hash":"ksGvWVvmPFA","ctxKind":"function","ctxName":"component$","captures":false,"loc":[243,854]},"s_RPDJAz33WLA":{"origin":"../node_modules/@builder.io/qwik-city/index.qwik.mjs","displayName":"QwikCityProvider_component_useStyles","canonicalFilename":"s_rpdjaz33wla","hash":"RPDJAz33WLA","ctxKind":"function","ctxName":"useStyles$","captures":false,"parent":"s_TxCFOy819ag","loc":[23876,23910]},"s_A5bZC7WO00A":{"origin":"../node_modules/@builder.io/qwik-city/index.qwik.mjs","displayName":"routeActionQrl_action_submit","canonicalFilename":"s_a5bzc7wo00a","hash":"A5bZC7WO00A","ctxKind":"function","ctxName":"submit","captures":true,"loc":[41964,43598]},"s_DyVc0YBIqQU":{"origin":"../node_modules/@builder.io/qwik-city/index.qwik.mjs","displayName":"spa_init","canonicalFilename":"s_dyvc0ybiqqu","hash":"DyVc0YBIqQU","ctxKind":"function","ctxName":"spaInit","captures":false,"loc":[1391,6872]},"s_wOIPfiQ04l4":{"origin":"../node_modules/@builder.io/qwik-city/index.qwik.mjs","displayName":"serverQrl_stuff","canonicalFilename":"s_woipfiq04l4","hash":"wOIPfiQ04l4","ctxKind":"function","ctxName":"stuff","captures":true,"loc":[46920,48965]},"s_BUbtvTyvVRE":{"origin":"../node_modules/@builder.io/qwik-city/index.qwik.mjs","displayName":"QwikCityMockProvider_component_goto","canonicalFilename":"s_bubtvtyvvre","hash":"BUbtvTyvVRE","ctxKind":"function","ctxName":"goto","captures":false,"parent":"s_WmYC5H00wtI","loc":[37248,37326]},"s_Osdg8FnYTw4":{"origin":"../node_modules/@builder.io/qwik-city/index.qwik.mjs","displayName":"Link_component_handlePrefetch","canonicalFilename":"s_osdg8fnytw4","hash":"Osdg8FnYTw4","ctxKind":"function","ctxName":"handlePrefetch","captures":false,"parent":"s_8gdLBszqbaM","loc":[38989,39320]},"s_fX0bDjeJa0E":{"origin":"../node_modules/@builder.io/qwik-city/index.qwik.mjs","displayName":"QwikCityProvider_component_goto","canonicalFilename":"s_fx0bdjeja0e","hash":"fX0bDjeJa0E","ctxKind":"function","ctxName":"goto","captures":true,"parent":"s_TxCFOy819ag","loc":[25160,26479]},"s_p9MSze0ojs4":{"origin":"../node_modules/@builder.io/qwik-city/index.qwik.mjs","displayName":"GetForm_component_form_onSubmit","canonicalFilename":"s_p9msze0ojs4","hash":"p9MSze0ojs4","ctxKind":"function","ctxName":"_jsxS","captures":true,"parent":"s_Nk9PlpjQm9Y","loc":[51386,52083]},"s_pIf0khHUxfY":{"origin":"../node_modules/@builder.io/qwik-city/index.qwik.mjs","displayName":"Link_component_handleClick","canonicalFilename":"s_pif0khhuxfy","hash":"pIf0khHUxfY","ctxKind":"function","ctxName":"handleClick","captures":true,"parent":"s_8gdLBszqbaM","loc":[39747,40267]}},"mapping":{"s_02wMImzEAbk":"q-DBLcOqdA.js","s_8gdLBszqbaM":"q-DUvyp6by.js","s_Nk9PlpjQm9Y":"q-ClCXw8Ns.js","s_NuUWtFC0yY0":"q-CBndDGBV.js","s_PpMpiMPB0t0":"q-Di0cI9pX.js","s_TxCFOy819ag":"q-DBLcOqdA.js","s_WmYC5H00wtI":"q-n4vAh1lk.js","s_e0ssiDXoeAM":"q-CKgayjyp.js","s_g185BADJLYE":"q-wOYNZKQO.js","s_ksGvWVvmPFA":"q-B0Y2bRGr.js","s_RPDJAz33WLA":"q-DBLcOqdA.js","s_A5bZC7WO00A":"q-CHigxMMC.js","s_DyVc0YBIqQU":"q-fJkQnue_.js","s_wOIPfiQ04l4":"q-BQR43Xg4.js","s_BUbtvTyvVRE":"q-n4vAh1lk.js","s_Osdg8FnYTw4":"q-DUvyp6by.js","s_fX0bDjeJa0E":"q-DBLcOqdA.js","s_p9MSze0ojs4":"q-ClCXw8Ns.js","s_pIf0khHUxfY":"q-DUvyp6by.js"},"bundles":{"q-B0Y2bRGr.js":{"size":671,"imports":["q-BhAMKswq.js","q-DRr4nx7L.js"],"origins":["src/entry_RouterHead.js","src/s_ksgvwvvmpfa.js"],"symbols":["s_ksGvWVvmPFA"]},"q-BhAMKswq.js":{"size":49050,"origins":["node_modules/@builder.io/qwik/core.min.mjs"]},"q-Bq36Wx9q.js":{"size":2539,"origins":["node_modules/@builder.io/qwik-city/service-worker.mjs","src/routes/service-worker.ts"]},"q-BQR43Xg4.js":{"size":895,"imports":["q-BhAMKswq.js","q-DRr4nx7L.js"],"origins":["src/entry_serverQrl.js","src/s_woipfiq04l4.js"],"symbols":["s_wOIPfiQ04l4"]},"q-BzWJi9lo.js":{"size":322,"imports":["q-BhAMKswq.js"],"dynamicImports":["q-Bq36Wx9q.js"],"origins":["@qwik-city-entries"]},"q-CBndDGBV.js":{"size":268,"imports":["q-BhAMKswq.js"],"origins":["src/entry_routes.js","src/s_nuuwtfc0yy0.js"],"symbols":["s_NuUWtFC0yY0"]},"q-CHigxMMC.js":{"size":751,"imports":["q-BhAMKswq.js"],"origins":["src/entry_routeActionQrl.js","src/s_a5bzc7wo00a.js"],"symbols":["s_A5bZC7WO00A"]},"q-CKgayjyp.js":{"size":462,"imports":["q-BhAMKswq.js","q-DRr4nx7L.js"],"origins":["src/entry_RouterOutlet.js","src/s_e0ssidxoeam.js"],"symbols":["s_e0ssiDXoeAM"]},"q-ClCXw8Ns.js":{"size":1217,"imports":["q-BhAMKswq.js","q-DRr4nx7L.js"],"origins":["src/entry_GetForm.js","src/s_nk9plpjqm9y.js","src/s_p9msze0ojs4.js"],"symbols":["s_Nk9PlpjQm9Y","s_p9MSze0ojs4"]},"q-Cw0odyl_.js":{"size":339,"imports":["q-BhAMKswq.js"],"dynamicImports":["q-wOYNZKQO.js"],"origins":["src/global.css","src/root.tsx"]},"q-DBLcOqdA.js":{"size":5798,"imports":["q-BhAMKswq.js","q-DRr4nx7L.js"],"dynamicImports":["q-BzWJi9lo.js","q-Dt3AIoy4.js","q-gUBrWqMM.js"],"origins":["@qwik-city-plan","src/entry_QwikCityProvider.js","src/s_02wmimzeabk.js","src/s_fx0bdjeja0e.js","src/s_rpdjaz33wla.js","src/s_txcfoy819ag.js"],"symbols":["s_02wMImzEAbk","s_fX0bDjeJa0E","s_RPDJAz33WLA","s_TxCFOy819ag"]},"q-Di0cI9pX.js":{"size":102,"imports":["q-BhAMKswq.js"],"origins":["src/entry_layout.js","src/s_ppmpimpb0t0.js"],"symbols":["s_PpMpiMPB0t0"]},"q-DRr4nx7L.js":{"size":7944,"imports":["q-BhAMKswq.js"],"dynamicImports":["q-CKgayjyp.js","q-DBLcOqdA.js","q-fJkQnue_.js"],"origins":["@qwik-city-sw-register","node_modules/@builder.io/qwik-city/index.qwik.mjs"]},"q-Dt3AIoy4.js":{"size":437,"imports":["q-BhAMKswq.js"],"dynamicImports":["q-CBndDGBV.js"],"origins":["src/routes/index.tsx"]},"q-DUvyp6by.js":{"size":1786,"imports":["q-BhAMKswq.js","q-DRr4nx7L.js"],"origins":["src/entry_Link.js","src/s_8gdlbszqbam.js","src/s_osdg8fnytw4.js","src/s_pif0khhuxfy.js"],"symbols":["s_8gdLBszqbaM","s_Osdg8FnYTw4","s_pIf0khHUxfY"]},"q-fJkQnue_.js":{"size":2286,"origins":["src/entry_spaInit.js","src/s_dyvc0ybiqqu.js"],"symbols":["s_DyVc0YBIqQU"]},"q-gUBrWqMM.js":{"size":442,"imports":["q-BhAMKswq.js"],"dynamicImports":["q-Di0cI9pX.js"],"origins":["src/routes/layout.tsx"]},"q-n4vAh1lk.js":{"size":996,"imports":["q-BhAMKswq.js","q-DRr4nx7L.js"],"origins":["src/entry_QwikCityMockProvider.js","src/s_bubtvtyvvre.js","src/s_wmyc5h00wti.js"],"symbols":["s_BUbtvTyvVRE","s_WmYC5H00wtI"]},"q-wOYNZKQO.js":{"size":675,"imports":["q-BhAMKswq.js","q-DRr4nx7L.js"],"dynamicImports":["q-B0Y2bRGr.js"],"origins":["src/components/router-head/router-head.tsx","src/entry_root.js","src/s_g185badjlye.js"],"symbols":["s_g185BADJLYE"]}},"injections":[{"tag":"style","location":"head","attributes":{"data-src":"/build/q-x9_4VFci.css","dangerouslySetInnerHTML":"/*! tailwindcss v3.4.1 | MIT License | https://tailwindcss.com\n */*,:before,:after{box-sizing:border-box;border-width:0;border-style:solid;border-color:#e5e7eb}:before,:after{--tw-content: \"\"}html,:host{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;-o-tab-size:4;tab-size:4;font-family:ui-sans-serif,system-ui,sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\",Segoe UI Symbol,\"Noto Color Emoji\";font-feature-settings:normal;font-variation-settings:normal;-webkit-tap-highlight-color:transparent}body{margin:0;line-height:inherit}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,samp,pre{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;font-feature-settings:normal;font-variation-settings:normal;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}button,input,optgroup,select,textarea{font-family:inherit;font-feature-settings:inherit;font-variation-settings:inherit;font-size:100%;font-weight:inherit;line-height:inherit;color:inherit;margin:0;padding:0}button,select{text-transform:none}button,[type=button],[type=reset],[type=submit]{-webkit-appearance:button;background-color:transparent;background-image:none}:-moz-focusring{outline:auto}:-moz-ui-invalid{box-shadow:none}progress{vertical-align:baseline}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}blockquote,dl,dd,h1,h2,h3,h4,h5,h6,hr,figure,p,pre{margin:0}fieldset{margin:0;padding:0}legend{padding:0}ol,ul,menu{list-style:none;margin:0;padding:0}dialog{padding:0}textarea{resize:vertical}input::-moz-placeholder,textarea::-moz-placeholder{opacity:1;color:#9ca3af}input::placeholder,textarea::placeholder{opacity:1;color:#9ca3af}button,[role=button]{cursor:pointer}:disabled{cursor:default}img,svg,video,canvas,audio,iframe,embed,object{display:block;vertical-align:middle}img,video{max-width:100%;height:auto}[hidden]{display:none}[type=text],input:where(:not([type])),[type=email],[type=url],[type=password],[type=number],[type=date],[type=datetime-local],[type=month],[type=search],[type=tel],[type=time],[type=week],[multiple],textarea,select{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:#fff;border-color:#6b7280;border-width:1px;border-radius:0;padding:.5rem .75rem;font-size:1rem;line-height:1.5rem;--tw-shadow: 0 0 #0000}[type=text]:focus,input:where(:not([type])):focus,[type=email]:focus,[type=url]:focus,[type=password]:focus,[type=number]:focus,[type=date]:focus,[type=datetime-local]:focus,[type=month]:focus,[type=search]:focus,[type=tel]:focus,[type=time]:focus,[type=week]:focus,[multiple]:focus,textarea:focus,select:focus{outline:2px solid transparent;outline-offset:2px;--tw-ring-inset: var(--tw-empty, );--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: #2563eb;--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow);border-color:#2563eb}input::-moz-placeholder,textarea::-moz-placeholder{color:#6b7280;opacity:1}input::placeholder,textarea::placeholder{color:#6b7280;opacity:1}::-webkit-datetime-edit-fields-wrapper{padding:0}::-webkit-date-and-time-value{min-height:1.5em;text-align:inherit}::-webkit-datetime-edit{display:inline-flex}::-webkit-datetime-edit,::-webkit-datetime-edit-year-field,::-webkit-datetime-edit-month-field,::-webkit-datetime-edit-day-field,::-webkit-datetime-edit-hour-field,::-webkit-datetime-edit-minute-field,::-webkit-datetime-edit-second-field,::-webkit-datetime-edit-millisecond-field,::-webkit-datetime-edit-meridiem-field{padding-top:0;padding-bottom:0}select{background-image:url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\");background-position:right .5rem center;background-repeat:no-repeat;background-size:1.5em 1.5em;padding-right:2.5rem;-webkit-print-color-adjust:exact;print-color-adjust:exact}[multiple],[size]:where(select:not([size=\"1\"])){background-image:initial;background-position:initial;background-repeat:unset;background-size:initial;padding-right:.75rem;-webkit-print-color-adjust:unset;print-color-adjust:unset}[type=checkbox],[type=radio]{-webkit-appearance:none;-moz-appearance:none;appearance:none;padding:0;-webkit-print-color-adjust:exact;print-color-adjust:exact;display:inline-block;vertical-align:middle;background-origin:border-box;-webkit-user-select:none;-moz-user-select:none;user-select:none;flex-shrink:0;height:1rem;width:1rem;color:#2563eb;background-color:#fff;border-color:#6b7280;border-width:1px;--tw-shadow: 0 0 #0000}[type=checkbox]{border-radius:0}[type=radio]{border-radius:100%}[type=checkbox]:focus,[type=radio]:focus{outline:2px solid transparent;outline-offset:2px;--tw-ring-inset: var(--tw-empty, );--tw-ring-offset-width: 2px;--tw-ring-offset-color: #fff;--tw-ring-color: #2563eb;--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}[type=checkbox]:checked,[type=radio]:checked{border-color:transparent;background-color:currentColor;background-size:100% 100%;background-position:center;background-repeat:no-repeat}[type=checkbox]:checked{background-image:url(\"data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e\")}@media (forced-colors: active){[type=checkbox]:checked{-webkit-appearance:auto;-moz-appearance:auto;appearance:auto}}[type=radio]:checked{background-image:url(\"data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3ccircle cx='8' cy='8' r='3'/%3e%3c/svg%3e\")}@media (forced-colors: active){[type=radio]:checked{-webkit-appearance:auto;-moz-appearance:auto;appearance:auto}}[type=checkbox]:checked:hover,[type=checkbox]:checked:focus,[type=radio]:checked:hover,[type=radio]:checked:focus{border-color:transparent;background-color:currentColor}[type=checkbox]:indeterminate{background-image:url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 16 16'%3e%3cpath stroke='white' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M4 8h8'/%3e%3c/svg%3e\");border-color:transparent;background-color:currentColor;background-size:100% 100%;background-position:center;background-repeat:no-repeat}@media (forced-colors: active){[type=checkbox]:indeterminate{-webkit-appearance:auto;-moz-appearance:auto;appearance:auto}}[type=checkbox]:indeterminate:hover,[type=checkbox]:indeterminate:focus{border-color:transparent;background-color:currentColor}[type=file]{background:unset;border-color:inherit;border-width:0;border-radius:0;padding:0;font-size:unset;line-height:inherit}[type=file]:focus{outline:1px solid ButtonText;outline:1px auto -webkit-focus-ring-color}*,:before,:after{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }::backdrop{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }.container{width:100%}@media (min-width: 640px){.container{max-width:640px}}@media (min-width: 768px){.container{max-width:768px}}@media (min-width: 1024px){.container{max-width:1024px}}@media (min-width: 1280px){.container{max-width:1280px}}@media (min-width: 1536px){.container{max-width:1536px}}.link:hover{text-decoration:underline}.entry{padding:.5rem 1rem;border-width:2px;border-radius:.375rem}\n"}}],"version":"1","options":{"target":"client","buildMode":"production","entryStrategy":{"type":"smart"}},"platform":{"qwik":"1.4.5","vite":"","rollup":"4.12.0","env":"node","os":"linux","node":"20.11.1"}};

const swRegister = "((i,a,r,s)=>{r=e=>{const t=document.querySelector(\"[q\\\\:base]\");t&&a.active&&a.active.postMessage({type:\"qprefetch\",base:t.getAttribute(\"q:base\"),...e})},document.addEventListener(\"qprefetch\",e=>{const t=e.detail;a?r(t):i.push(t)}),navigator.serviceWorker.register(\"/service-worker.js\").then(e=>{s=()=>{a=e,i.forEach(r),r({bundles:i})},e.installing?e.installing.addEventListener(\"statechange\",t=>{t.target.state==\"activated\"&&s()}):e.active&&s()}).catch(e=>console.error(e))})([])";

const RouteStateContext = /* @__PURE__ */ createContextId("qc-s");
const ContentContext = /* @__PURE__ */ createContextId("qc-c");
const ContentInternalContext = /* @__PURE__ */ createContextId("qc-ic");
const DocumentHeadContext = /* @__PURE__ */ createContextId("qc-h");
const RouteLocationContext = /* @__PURE__ */ createContextId("qc-l");
const RouteNavigateContext = /* @__PURE__ */ createContextId("qc-n");
const RouteActionContext = /* @__PURE__ */ createContextId("qc-a");
const RouteInternalContext = /* @__PURE__ */ createContextId("qc-ir");
const s_DyVc0YBIqQU = (currentScript)=>{
    const win = window;
    const currentPath = location.pathname + location.search;
    const spa = "_qCitySPA";
    const historyPatch = "_qCityHistoryPatch";
    const bootstrap = "_qCityBootstrap";
    const initPopstate = "_qCityInitPopstate";
    const initAnchors = "_qCityInitAnchors";
    const initVisibility = "_qCityInitVisibility";
    const initScroll = "_qCityInitScroll";
    const scrollEnabled = "_qCityScrollEnabled";
    const debounceTimeout = "_qCityScrollDebounce";
    const scrollHistory = "_qCityScroll";
    const checkAndScroll = (scrollState)=>{
        if (scrollState) win.scrollTo(scrollState.x, scrollState.y);
    };
    const currentScrollState2 = ()=>{
        const elm = document.documentElement;
        return {
            x: elm.scrollLeft,
            y: elm.scrollTop,
            w: Math.max(elm.scrollWidth, elm.clientWidth),
            h: Math.max(elm.scrollHeight, elm.clientHeight)
        };
    };
    const saveScrollState = (scrollState)=>{
        const state = history.state || {};
        state[scrollHistory] = scrollState || currentScrollState2();
        history.replaceState(state, "");
    };
    if (!win[spa] && !win[initPopstate] && !win[initAnchors] && !win[initVisibility] && !win[initScroll]) {
        saveScrollState();
        win[initPopstate] = ()=>{
            if (win[spa]) return;
            win[scrollEnabled] = false;
            clearTimeout(win[debounceTimeout]);
            if (currentPath !== location.pathname + location.search) {
                const container = currentScript.closest("[q\\:container]");
                const link = container.querySelector('a[q\\:key="AD_1"]');
                if (link) {
                    const container2 = link.closest("[q\\:container]");
                    const bootstrapLink = link.cloneNode();
                    bootstrapLink.setAttribute("q:nbs", "");
                    bootstrapLink.style.display = "none";
                    container2.appendChild(bootstrapLink);
                    win[bootstrap] = bootstrapLink;
                    bootstrapLink.click();
                } else location.reload();
            } else if (history.scrollRestoration === "manual") {
                const scrollState = history.state?.[scrollHistory];
                checkAndScroll(scrollState);
                win[scrollEnabled] = true;
            }
        };
        if (!win[historyPatch]) {
            win[historyPatch] = true;
            const pushState = history.pushState;
            const replaceState = history.replaceState;
            const prepareState = (state)=>{
                if (state === null || typeof state === "undefined") state = {};
                else if (state?.constructor !== Object) state = {
                    _data: state
                };
                state._qCityScroll = state._qCityScroll || currentScrollState2();
                return state;
            };
            history.pushState = (state, title, url)=>{
                state = prepareState(state);
                return pushState.call(history, state, title, url);
            };
            history.replaceState = (state, title, url)=>{
                state = prepareState(state);
                return replaceState.call(history, state, title, url);
            };
        }
        win[initAnchors] = (event)=>{
            if (win[spa] || event.defaultPrevented) return;
            const target = event.target.closest("a[href]");
            if (target && !target.hasAttribute("preventdefault:click")) {
                const href = target.getAttribute("href");
                const prev = new URL(location.href);
                const dest = new URL(href, prev);
                const sameOrigin = dest.origin === prev.origin;
                const samePath = dest.pathname + dest.search === prev.pathname + prev.search;
                if (sameOrigin && samePath) {
                    event.preventDefault();
                    if (dest.href !== prev.href) history.pushState(null, "", dest);
                    if (!dest.hash) {
                        if (dest.href.endsWith("#")) window.scrollTo(0, 0);
                        else {
                            win[scrollEnabled] = false;
                            clearTimeout(win[debounceTimeout]);
                            saveScrollState({
                                ...currentScrollState2(),
                                x: 0,
                                y: 0
                            });
                            location.reload();
                        }
                    } else {
                        const elmId = dest.hash.slice(1);
                        const elm = document.getElementById(elmId);
                        if (elm) elm.scrollIntoView();
                    }
                }
            }
        };
        win[initVisibility] = ()=>{
            if (!win[spa] && win[scrollEnabled] && document.visibilityState === "hidden") saveScrollState();
        };
        win[initScroll] = ()=>{
            if (win[spa] || !win[scrollEnabled]) return;
            clearTimeout(win[debounceTimeout]);
            win[debounceTimeout] = setTimeout(()=>{
                saveScrollState();
                win[debounceTimeout] = void 0;
            }, 200);
        };
        win[scrollEnabled] = true;
        setTimeout(()=>{
            addEventListener("popstate", win[initPopstate]);
            addEventListener("scroll", win[initScroll], {
                passive: true
            });
            document.body.addEventListener("click", win[initAnchors]);
            if (!win.navigation) document.addEventListener("visibilitychange", win[initVisibility], {
                passive: true
            });
        }, 0);
    }
};
const spaInit = /*#__PURE__*/ inlinedQrl(s_DyVc0YBIqQU, "s_DyVc0YBIqQU");
const shim = ()=>{
    {
        const [symbol, bundle] = getPlatform().chunkForSymbol(spaInit.getSymbol(), null);
        const path = basePathname + "build/" + bundle;
        return `(${shim$1.toString()})('${path}','${symbol}');`;
    }
};
const shim$1 = async (path, symbol)=>{
    if (!window._qcs && history.scrollRestoration === "manual") {
        window._qcs = true;
        const scrollState = history.state?._qCityScroll;
        if (scrollState) window.scrollTo(scrollState.x, scrollState.y);
        const currentScript = document.currentScript;
        (await import(path))[symbol](currentScript);
    }
};
const s_e0ssiDXoeAM = ()=>{
    const shimScript = shim();
    _jsxBranch();
    const nonce = useServerData("nonce");
    const context = useContext(ContentInternalContext);
    if (context.value && context.value.length > 0) {
        const contentsLen = context.value.length;
        let cmp = null;
        for(let i = contentsLen - 1; i >= 0; i--)if (context.value[i].default) cmp = _jsxC(context.value[i].default, {
            children: cmp
        }, 1, "zl_0");
        return /* @__PURE__ */ _jsxC(Fragment, {
            children: [
                cmp,
                /* @__PURE__ */ _jsxQ("script", {
                    dangerouslySetInnerHTML: shimScript
                }, {
                    nonce
                }, null, 3, null)
            ]
        }, 1, "zl_1");
    }
    return SkipRender;
};
const RouterOutlet = /* @__PURE__ */ componentQrl(/*#__PURE__*/ inlinedQrl(s_e0ssiDXoeAM, "s_e0ssiDXoeAM"));
const toUrl = (url, baseUrl)=>new URL(url, baseUrl.href);
const isSameOrigin = (a, b)=>a.origin === b.origin;
const withSlash = (path)=>path.endsWith("/") ? path : path + "/";
const isSamePathname = ({ pathname: a  }, { pathname: b  })=>{
    const lDiff = Math.abs(a.length - b.length);
    return lDiff === 0 ? a === b : lDiff === 1 && withSlash(a) === withSlash(b);
};
const isSameSearchQuery = (a, b)=>a.search === b.search;
const isSamePath = (a, b)=>isSameSearchQuery(a, b) && isSamePathname(a, b);
const isPromise = (value)=>{
    return value && typeof value.then === "function";
};
const resolveHead = (endpoint, routeLocation, contentModules, locale)=>{
    const head = createDocumentHead();
    const getData = (loaderOrAction)=>{
        const id = loaderOrAction.__id;
        if (loaderOrAction.__brand === "server_loader") {
            if (!(id in endpoint.loaders)) throw new Error("You can not get the returned data of a loader that has not been executed for this request.");
        }
        const data = endpoint.loaders[id];
        if (isPromise(data)) throw new Error("Loaders returning a promise can not be resolved for the head function.");
        return data;
    };
    const headProps = {
        head,
        withLocale: (fn)=>withLocale(locale, fn),
        resolveValue: getData,
        ...routeLocation
    };
    for(let i = contentModules.length - 1; i >= 0; i--){
        const contentModuleHead = contentModules[i] && contentModules[i].head;
        if (contentModuleHead) {
            if (typeof contentModuleHead === "function") resolveDocumentHead(head, withLocale(locale, ()=>contentModuleHead(headProps)));
            else if (typeof contentModuleHead === "object") resolveDocumentHead(head, contentModuleHead);
        }
    }
    return headProps.head;
};
const resolveDocumentHead = (resolvedHead, updatedHead)=>{
    if (typeof updatedHead.title === "string") resolvedHead.title = updatedHead.title;
    mergeArray(resolvedHead.meta, updatedHead.meta);
    mergeArray(resolvedHead.links, updatedHead.links);
    mergeArray(resolvedHead.styles, updatedHead.styles);
    mergeArray(resolvedHead.scripts, updatedHead.scripts);
    Object.assign(resolvedHead.frontmatter, updatedHead.frontmatter);
};
const mergeArray = (existingArr, newArr)=>{
    if (Array.isArray(newArr)) for (const newItem of newArr){
        if (typeof newItem.key === "string") {
            const existingIndex = existingArr.findIndex((i)=>i.key === newItem.key);
            if (existingIndex > -1) {
                existingArr[existingIndex] = newItem;
                continue;
            }
        }
        existingArr.push(newItem);
    }
};
const createDocumentHead = ()=>({
        title: "",
        meta: [],
        links: [],
        styles: [],
        scripts: [],
        frontmatter: {}
    });
let Char;
(function(Char2) {
    Char2[Char2["EOL"] = 0] = "EOL";
    Char2[Char2["OPEN_BRACKET"] = 91] = "OPEN_BRACKET";
    Char2[Char2["CLOSE_BRACKET"] = 93] = "CLOSE_BRACKET";
    Char2[Char2["DOT"] = 46] = "DOT";
    Char2[Char2["SLASH"] = 47] = "SLASH";
})(Char || (Char = {}));
const useDocumentHead = ()=>useContext(DocumentHeadContext);
const useLocation = ()=>useContext(RouteLocationContext);
const useQwikCityEnv = ()=>noSerialize(useServerData("qwikcity"));
const s_RPDJAz33WLA = `:root{view-transition-name:none}`;
const s_fX0bDjeJa0E = async (path, opt)=>{
    const [actionState2, navResolver2, routeInternal2, routeLocation2] = useLexicalScope();
    const { type ="link" , forceReload =path === void 0 , replaceState =false , scroll =true  } = typeof opt === "object" ? opt : {
        forceReload: opt
    };
    const lastDest = routeInternal2.value.dest;
    const dest = path === void 0 ? lastDest : toUrl(path, routeLocation2.url);
    if (!isSameOrigin(dest, lastDest)) return;
    if (!forceReload && isSamePath(dest, lastDest)) return;
    routeInternal2.value = {
        type,
        dest,
        forceReload,
        replaceState,
        scroll
    };
    actionState2.value = void 0;
    routeLocation2.isNavigating = true;
    return new Promise((resolve)=>{
        navResolver2.r = resolve;
    });
};
const s_02wMImzEAbk = ({ track  })=>{
    const [actionState2, content2, contentInternal2, documentHead2, env2, goto2, loaderState2, navResolver2, props2, routeInternal2, routeLocation2] = useLexicalScope();
    async function run() {
        const [navigation, action] = track(()=>[
                routeInternal2.value,
                actionState2.value
            ]);
        const locale = getLocale("");
        const prevUrl = routeLocation2.url;
        const navType = action ? "form" : navigation.type;
        navigation.replaceState;
        let trackUrl;
        let clientPageData;
        let loadedRoute = null;
        trackUrl = new URL(navigation.dest, routeLocation2.url);
        loadedRoute = env2.loadedRoute;
        clientPageData = env2.response;
        if (loadedRoute) {
            const [routeName, params, mods, menu] = loadedRoute;
            const contentModules = mods;
            const pageModule = contentModules[contentModules.length - 1];
            routeLocation2.prevUrl = prevUrl;
            routeLocation2.url = trackUrl;
            routeLocation2.params = {
                ...params
            };
            routeInternal2.untrackedValue = {
                type: navType,
                dest: trackUrl
            };
            const resolvedHead = resolveHead(clientPageData, routeLocation2, contentModules, locale);
            content2.headings = pageModule.headings;
            content2.menu = menu;
            contentInternal2.value = noSerialize(contentModules);
            documentHead2.links = resolvedHead.links;
            documentHead2.meta = resolvedHead.meta;
            documentHead2.styles = resolvedHead.styles;
            documentHead2.scripts = resolvedHead.scripts;
            documentHead2.title = resolvedHead.title;
            documentHead2.frontmatter = resolvedHead.frontmatter;
        }
    }
    const promise = run();
    return promise;
};
const s_TxCFOy819ag = (props)=>{
    useStylesQrl(/*#__PURE__*/ inlinedQrl(s_RPDJAz33WLA, "s_RPDJAz33WLA"));
    const env = useQwikCityEnv();
    if (!env?.params) throw new Error(`Missing Qwik City Env Data`);
    const urlEnv = useServerData("url");
    if (!urlEnv) throw new Error(`Missing Qwik URL Env Data`);
    const url = new URL(urlEnv);
    const routeLocation = useStore({
        url,
        params: env.params,
        isNavigating: false,
        prevUrl: void 0
    }, {
        deep: false
    });
    const navResolver = {};
    const loaderState = _weakSerialize(useStore(env.response.loaders, {
        deep: false
    }));
    const routeInternal = useSignal({
        type: "initial",
        dest: url,
        forceReload: false,
        replaceState: false,
        scroll: true
    });
    const documentHead = useStore(createDocumentHead);
    const content = useStore({
        headings: void 0,
        menu: void 0
    });
    const contentInternal = useSignal();
    const currentActionId = env.response.action;
    const currentAction = currentActionId ? env.response.loaders[currentActionId] : void 0;
    const actionState = useSignal(currentAction ? {
        id: currentActionId,
        data: env.response.formData,
        output: {
            result: currentAction,
            status: env.response.status
        }
    } : void 0);
    const goto = /*#__PURE__*/ inlinedQrl(s_fX0bDjeJa0E, "s_fX0bDjeJa0E", [
        actionState,
        navResolver,
        routeInternal,
        routeLocation
    ]);
    useContextProvider(ContentContext, content);
    useContextProvider(ContentInternalContext, contentInternal);
    useContextProvider(DocumentHeadContext, documentHead);
    useContextProvider(RouteLocationContext, routeLocation);
    useContextProvider(RouteNavigateContext, goto);
    useContextProvider(RouteStateContext, loaderState);
    useContextProvider(RouteActionContext, actionState);
    useContextProvider(RouteInternalContext, routeInternal);
    useTaskQrl(/*#__PURE__*/ inlinedQrl(s_02wMImzEAbk, "s_02wMImzEAbk", [
        actionState,
        content,
        contentInternal,
        documentHead,
        env,
        goto,
        loaderState,
        navResolver,
        props,
        routeInternal,
        routeLocation
    ]));
    return /* @__PURE__ */ _jsxC(Slot, null, 3, "qY_0");
};
const QwikCityProvider = /* @__PURE__ */ componentQrl(/*#__PURE__*/ inlinedQrl(s_TxCFOy819ag, "s_TxCFOy819ag"));
const ServiceWorkerRegister = (props)=>_jsxQ("script", {
        nonce: _wrapSignal(props, "nonce")
    }, {
        dangerouslySetInnerHTML: swRegister
    }, null, 3, "1Z_0");

const s_ksGvWVvmPFA = () => {
  const head = useDocumentHead();
  const loc = useLocation();
  return /* @__PURE__ */ _jsxC(Fragment, {
    children: [
      /* @__PURE__ */ _jsxQ("title", null, null, head.title, 1, null),
      /* @__PURE__ */ _jsxQ("link", null, {
        href: _fnSignal((p0) => p0.url.href, [
          loc
        ], "p0.url.href"),
        rel: "canonical"
      }, null, 3, null),
      /* @__PURE__ */ _jsxQ("meta", null, {
        content: "width=device-width, initial-scale=1.0",
        name: "viewport"
      }, null, 3, null),
      /* @__PURE__ */ _jsxQ("link", null, {
        href: "/favicon.svg",
        rel: "icon",
        type: "image/svg+xml"
      }, null, 3, null),
      head.meta.map((m) => /* @__PURE__ */ _jsxS("meta", {
        ...m
      }, null, 0, m.key)),
      head.links.map((l) => /* @__PURE__ */ _jsxS("link", {
        ...l
      }, null, 0, l.key)),
      head.styles.map((s) => /* @__PURE__ */ _jsxS("style", {
        ...s.props,
        dangerouslySetInnerHTML: _wrapSignal(s, "style")
      }, null, 0, s.key))
    ]
  }, 1, "ew_0");
};
const RouterHead = /* @__PURE__ */ componentQrl(/* @__PURE__ */ inlinedQrl(s_ksGvWVvmPFA, "s_ksGvWVvmPFA"));

const s_g185BADJLYE = () => {
  return /* @__PURE__ */ _jsxC(QwikCityProvider, {
    children: [
      /* @__PURE__ */ _jsxQ("head", null, null, [
        /* @__PURE__ */ _jsxQ("meta", null, {
          charSet: "utf-8"
        }, null, 3, null),
        /* @__PURE__ */ _jsxQ("link", null, {
          href: "/manifest.json",
          rel: "manifest"
        }, null, 3, null),
        /* @__PURE__ */ _jsxC(RouterHead, null, 3, "1P_0")
      ], 1, null),
      /* @__PURE__ */ _jsxQ("body", null, {
        lang: "en"
      }, [
        /* @__PURE__ */ _jsxC(RouterOutlet, null, 3, "1P_1"),
        /* @__PURE__ */ _jsxC(ServiceWorkerRegister, null, 3, "1P_2")
      ], 1, null)
    ]
  }, 1, "1P_3");
};
const Root = /* @__PURE__ */ componentQrl(/* @__PURE__ */ inlinedQrl(s_g185BADJLYE, "s_g185BADJLYE"));

function render(opts) {
  return renderToStream(/* @__PURE__ */ _jsxC(Root, null, 3, "1S_0"), {
    manifest,
    ...opts,
    // Use container attributes to set attributes on the html tag.
    containerAttributes: {
      lang: "en-us",
      ...opts.containerAttributes
    }
  });
}

export { manifest as m, render as r, setServerPlatform2 as s };
