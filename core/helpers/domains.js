const fg = require('fast-glob')
const path = require('path')

exports.getRoutesAndDomains = async (dir) => {
    const getArchive = await fg(path.join(dir))
    const array = []
    for (let index = 0; index < getArchive.length; index++) {
        const element = getArchive[index]
        const { routes = [], domains = {} } = require(element)
        array.push({ routes, domains })
    }
    return array
}

exports.constructorDomains = (arrayConstructor) => {
    let domainsConstructor = {}
    for (let index = 0; index < arrayConstructor.length; index ++) {
        const { domains = {} } = arrayConstructor[index]
        domainsConstructor = {...domainsConstructor, ...domains}
    }
    return domainsConstructor
}


exports.getInjectable = (domains, injectable) => {
    return injectable.reduce((acc, val) => {
        acc = {...acc, [val]: domains[val] }
        return acc
    }, {})
}
