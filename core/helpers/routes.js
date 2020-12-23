const fs = require('fs')
const path = require('path')
const fg = require('fast-glob');

const { validateAuthorization } = require('./jwt')

const getRoutesAndDomains = async (dir) => {
    const getArchive = await fg(path.join(dir))
    const array = []
    for (let index = 0; index < getArchive.length; index++) {
        const element = getArchive[index]
        const { routes = [], domains = {} } = require(element)
        array.push({ routes, domains })
    }
    return array
}

/**
 * @function
 * @description Função feita para ordenação de rotas com parâmetros e sem.
 * @param  {Array} list
 * @return {Array}
 */
const orderByExpressRoutes = (list) => {
    const params = []
    const notParams = []
    for (let index = 0; index < list.length; index++) {
        const val = list[index]
        const c = require(val.dir)
        if (c.path.search(':') > 0) params.push(c)
        else notParams.push(c)
    }
    return [...notParams, ...params]
}

const constructorDomains = (arrayConstructor) => {
    let domainsConstructor = {}
    for (let index = 0; index < arrayConstructor.length; index ++) {
        const { domains = {} } = arrayConstructor[index]
        domainsConstructor = {...domainsConstructor, ...domains}
    }
    return domainsConstructor
}


const constructorHandlerResponse = (domains, { handler }) => async (req, res) => {
    const { data = {}, status = 500 } = await handler({
        ...domains
    },
    {
        data: req.body,
        params: req.params,
        query: req.query
    })
    return res.status(status).json(data)
}


const functionKey = (object) => {
    const keys = Object.keys(object)
    return keys.map(val => ({ handler: object[val] }))
}

const generateRoute = (arrayConstructor, app) => {
    const domainsConstructor = constructorDomains(arrayConstructor)
    for (let index = 0; index < arrayConstructor.length; index ++) {
        const { routes } = arrayConstructor[index]
        if (Object.keys(routes).length > 0) {
            const routeInit = functionKey(routes)
            initRoutes(domainsConstructor, routeInit, app)
        }
    }
}

const getInjectable = (domains, injectable) => {
    return injectable.reduce((acc, val) => {
        acc = {...acc, [val]: domains[val] }
        return acc
    }, {})
}

const initRoutes = (domainsConstructor, list, app) => list.map(({ handler }) => {
    let args = [`/api${handler.path}`]
    let domains = {}
    if (handler.authenticate) args = args.concat(validateAuthorization)
    if (handler.middleware && handler.middleware.length > 0) args = args.concat(handler.middleware)
    if (handler.injectable && handler.injectable.length > 0) domains = getInjectable(domainsConstructor, handler.injectable)

    const handlerRoute = constructorHandlerResponse(domains, handler)
    args.push(handlerRoute)

    app._router[handler.method.toLowerCase()].apply(app._router, args)
})

module.exports = async app => {
    try {
        const listRoutes = await getRoutesAndDomains(path.join(__dirname, '../../domains/**/index.js'))
        generateRoute(listRoutes, app)
    } catch (error) {
        console.warn(`Error in generate modules routes express: ${error}`)
    }
}
