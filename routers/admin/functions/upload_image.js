const { initEdgeStore } = require("@edgestore/server");
const {
  createEdgeStoreExpressHandler,
} = require("@edgestore/server/adapters/express");

const es = initEdgeStore.create();

const edgeStoreRouter = es.router({
  publicFiles: es.imageBucket({
    maxSize: 1024 * 1024 * 2,
    accept: ["image/jpeg", "image/png"],
  }),
});

module.exports = createEdgeStoreExpressHandler({
  router: edgeStoreRouter,
});
