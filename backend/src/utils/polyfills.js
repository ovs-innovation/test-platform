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
