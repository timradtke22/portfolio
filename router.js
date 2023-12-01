"use strict";

/**
 * @description add in all route to new html pages here
 */

// I am making an SPA, while this is not SEO
class Router {
    constructor(routes) {
        this.routes = routes;
        this._initRoute();
    }

    _initRoute() {
        const pathnameSplit = window.location.pathname.split("/");
        const pathSegs = pathnameSplit.length > 1 ? pathnameSplit.slice(1) : "";

        this.loadRoute(...pathSegs);
    }

    _getURL() {
        const path = window.location.pathname;
        return path;
    }

    _matchUrlToRoute(segment) {
        console.log("seg", segment);
        const matchedRoute = this.routes.find(
            (route) => route.path === segment
        );
        return matchedRoute;
    }

    loadRoute(...urlSegs) {
        const matchedRoute = this._matchUrlToRoute(urlSegs);
        if (!matchedRoute) {
            console.log(matchedRoute);
            throw new Error("Route not found");
        }
        matchedRoute.callback();
    }

    navigate(path) {
        window.history.pushState({}, "", path);
        this.loadRoute(path);
    }
}

module.exports = Router;