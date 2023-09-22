const routeProduct = require("./product");
const routes = (app) => {
  app.use("/", routeProduct);
};
module.exports = routes;
