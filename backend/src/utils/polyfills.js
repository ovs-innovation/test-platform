// Polyfills for Node.js runtime compatibility (< v22, including Node v20.x)

if (typeof Promise.withResolvers !== 'function') {
  Promise.withResolvers = function withResolvers() {
    let resolve;
    let reject;
    const promise = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });
    return { promise, resolve, reject };
  };
}

if (typeof Object.groupBy !== 'function') {
  Object.groupBy = function groupBy(items, callbackFn) {
    const result = Object.create(null);
    let i = 0;
    for (const item of items) {
      const key = callbackFn(item, i++);
      if (key in result) {
        result[key].push(item);
      } else {
        result[key] = [item];
      }
    }
    return result;
  };
}

// Polyfill global fetch for file:// URLs (required by pdfjs-dist WASM decoders like jbig2.wasm in Node.js)
if (typeof globalThis.fetch === 'function') {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async function (url, options) {
    const urlStr = typeof url === 'string' ? url : (url?.href || String(url));
    if (urlStr.startsWith('file://')) {
      try {
        const { fileURLToPath } = await import('url');
        const { promises: fsPromises } = await import('fs');
        const filePath = fileURLToPath(urlStr);
        const data = await fsPromises.readFile(filePath);
        return new Response(data, {
          status: 200,
          headers: { 'content-type': 'application/wasm' },
        });
      } catch (err) {
        return new Response(null, { status: 404, statusText: err.message });
      }
    }
    return originalFetch.call(this, url, options);
  };
}
