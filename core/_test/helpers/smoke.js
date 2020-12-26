const { expect }  = require('chai')
const fs = require('fs')

const replaceJs = archive => archive.replace('.js', '')
const isArchive = archive => !archive.startsWith('.')

exports.ExecuteTestSmoke = (smoke) => (PATH, cases, name) => {
    const directories =
        fs.readdirSync(PATH)
            .filter(isArchive)
            .map(replaceJs).sort()

    const receive = cases.filter(value => {
        return directories.filter(directory => value.case === directory)
    })
    receive.map(value =>
        smoke(value.smoke, require(`${PATH}/${value.case}`)(null), `${name}`)
    )
}

const arrayTest = (array, equal) => {
    const keys = Object.keys(array)
    for (let index = 0; index < keys.length; index ++) {
        const equalKey = keys[index]
        expect(equalKey).to.be.an(equal)
    }
}

exports.Smoke = (Case, Modulo, NameModulo) => {

    const mockRequestMethod = ['POST', 'GET', 'PUT', 'DELETE', 'PATCH']
    const mockRoutesExport = ['path', 'method', 'injectable', 'middleware', 'authenticate', 'handler']

    const routeKeys = Object.keys(Modulo.routes) || []

    describe(`Validate exist contract: ${NameModulo}`, () => {
        it(`Should exist routes ${NameModulo}`, () => expect(Modulo.routes).to.be.exist)
        it(`Should exist domains ${NameModulo}`, () => expect(Modulo.routes).to.be.exist)
    })


    for (let i = 0; i < routeKeys.length; i++) {
        const element = routeKeys[i]
        const keys = Object.keys(Modulo.routes[element])
        describe(`Validate contract routes: ${NameModulo}`, () => {
            it(`Should exist the required params export: ${element}`, () => expect(keys).to.deep.equal(mockRoutesExport))
            it(`Should exist the required and length keys object: ${element}`, () => expect(keys).to.length(6))
            it(`Should middleware is Array: ${element}`, () => expect(Modulo.routes[element].middleware).to.be.an('array'))
            it(`Should authenticate is boolean: ${element}`, () => expect(Modulo.routes[element].authenticate).to.be.an('boolean'))
            it(`Should middleware is Array: ${element}`, () => expect(Modulo.routes[element].injectable).to.be.an('array'))
            it(`Should injectable is array contains string: ${element}`, () => arrayTest(Modulo.routes[element].injectable, 'string'))
            it(`Should exist handler and to equal function: ${element}`, () => expect(Modulo.routes[element].handler).to.be.an('function'))
            it(`Should exist method and request mock http: ${element}`, () => expect(mockRequestMethod).include(Modulo.routes[element].method.toUpperCase()))
            it(`Should exist path and is string: ${element}`, () => expect(Modulo.routes[element].path).to.be.an('string'))
        })
    }

    const domainsKeys = Object.keys(Modulo.domains) || []

    describe(`Validate exist contract domains: ${NameModulo}`, () => {
        for (let i=0; i < domainsKeys.length; i++) {
            const element = domainsKeys[i]
            it(`Should exist domains and to equal function: ${element}`, () => expect(Modulo.domains[element]).to.be.an('function'))
        }
    })
}