import routes from "./routes.js";

export default function matchRoute(path) {
  for (const route of routes) {
    const regexPath = route.path.replace(/:\w+/g, "([^/]+)");
    const regex = new RegExp("^" + regexPath + "$");

    const m = path.match(regex);
    if (!m) continue;

    const keys = Array.from(route.path.matchAll(/:(\w+)/g)).map(x => x[ 1 ]);
    const values = m.slice(1);

    const params = {};
    keys.forEach((k, i) => params[ k ] = values[ i ]);

    return { route, params };
  }

  return null;
}