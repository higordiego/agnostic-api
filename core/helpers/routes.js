const path = require('path')
const { getRoutesAndDomains, constructorDomains, getInjectable } = require('./domains')
const { validateAuthorization } = require('./jwt')
const { constructorHandlerResponse } = require('./handler')

const abstract = require('../database/abstract')

const functionKeyHandler = (object) => {
    const keys = Object.keys(object)
    return keys.map(val => ({ handler: object[val] }))
}

const generateRoute = (arrayConstructor) => {
    let arrayRoutes = []
    const domainsConstructor = constructorDomains(arrayConstructor)
    for (let index = 0; index < arrayConstructor.length; index ++) {
        const { routes } = arrayConstructor[index]
        if (Object.keys(routes).length > 0) {
            const routeInit = functionKeyHandler(routes)
            arrayRoutes = arrayRoutes.concat(initRoutes(domainsConstructor, routeInit))
        }
    }
    return arrayRoutes
}

const applyRouter = (routes, app) => {
    for (let index = 0; index < routes.length; index++) {
        const handler = routes[index]
        const method = handler[1].method
        const args = [handler[0], handler[1].handler]
        app._router[method.toLowerCase()].apply(app._router, args)
    }
}

const initRoutes = (domainsConstructor, list) => list.map(({ handler }) => {
    let args = [`/api${handler.path}`]
    let domains = {}
    if (handler.authenticate) args = args.concat(validateAuthorization)
    if (handler.middleware && handler.middleware.length > 0) args = args.concat(handler.middleware)
    if (handler.injectable && handler.injectable.length > 0) domains = getInjectable(domainsConstructor, handler.injectable)

    const routerHandler = constructorHandlerResponse(domains, handler)
    args.push({ handler: routerHandler, method: handler.method })
    return args
})

const orderByExpressRoutes = (list) => {
    const params = []
    const notParams = []
    for (let index = 0; index < list.length; index++) {
        const val = list[index]
        if (val[0].search(':') > 0) params.push(val)
        else notParams.push(val)
    }
    return [...notParams, ...params]
}

module.exports = async app => {
    try {
        const listRoutes = await getRoutesAndDomains(path.join(__dirname, '../../domains/**/index.js'), abstract)
        const routes = generateRoute(listRoutes)
        const orderByRoutes = orderByExpressRoutes(routes)
        applyRouter(orderByRoutes, app)
    } catch (error) {
        console.log('error', error)
        console.warn(`Error in generate modules routes express: ${error.message}`)
    }
}
