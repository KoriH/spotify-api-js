/**
 * 
 * @class
 * @classdesc Router for url path
 */
class Router {
  constructor() {
    this.routes = [];
  }

  /**
   * Create a url path and call back function what to do
   * @param {String} path the route
   * @param {Function} callback for a function
   */
  createPath(path, callback) {
    if (!path || !callback) {
      throw new Error('uri or callback required');
    }

    if (typeof path !== "string") {
      throw new Error('uri must be a String');
    }
    if (typeof callback !== "function") {
      throw new Error('callback must be a function');
    }

    this.routes.forEach(route => {
      if (route.path === path) throw new Error(`path ${route.path} already exists`)
    })
    // This is the structure of a route as an object
    const route = {
      path,
      callback
    }

    // pushing the route onto the routes list
    this.routes.push(route);
  }

  handleRequest(req, res) {
    const url = req.url;
    this.routes.some(route => {
      let regEx = new RegExp(`^${route.path}`);
      if (typeof url !== 'string') {
        console.log(url)
        throw new Error("path must be string, is type" + `${typeof url}`)
      }

      if (url.match(regEx)) {
        return route.callback(req, res);
      }
    })
  }


  getPaths() {
    console.log(this.routes)
  }
}

export default Router;
