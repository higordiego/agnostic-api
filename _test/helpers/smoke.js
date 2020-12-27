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

const arrayTestDomains = (array, equal) => {
    const keys = Object.keys(array)
    for (let index = 0; index < keys.length; index ++) {
        const equalKey = keys[index]
        expect(equalKey).to.be.an(equal)
    }
}

const arrayDomainsTest = (array) => {
    for (let index = 0; index < array.length; index ++) {
        const equalKey = array[index]
        const mockKeysEqual = ['describe', 'description', 'url', 'token', 'be', 'status', 'body']
        const keys = Object.keys(equalKey.it)
        it (`Should exit it and object values`, () => {
            expect(equalKey.it).to.be.exist
            expect(equalKey.it).to.be.an('object')
            expect(keys).to.deep.equal(mockKeysEqual)
        })

        it('Should describe is string', () => expect(equalKey.it.describe).to.be.an('string'))
        it('Should description is string', () => expect(equalKey.it.description).to.be.an('string'))
        it('Should url is string', () => expect(equalKey.it.url).to.be.an('string'))
        it('Should token is string', () => expect(equalKey.it.token).to.be.an('string'))
        it('Should be is string', () => expect(equalKey.it.be).to.be.an('string'))
        it('Should status is string', () => expect(equalKey.it.status).to.be.an('number'))
        it('Should body is object', () => expect(equalKey.it.status).to.be.an('object'))
    }
}

exports.smokeContractTest = (Case, NameModulo) => {

    const mockTest = Object.keys(Case.object) || []
    const mockKeys = ['get', 'post', 'put', 'delete']

    describe(`Validate exist contract _test domain: ${NameModulo}`, () => {
        it(`Should exist describe ${NameModulo}`, () => expect(Case.describe).to.be.exist)
        it(`Should exist object ${NameModulo}`, () => expect(Case.object).to.be.exist)
        it(`Should exist the required object keys: ${NameModulo}`, () => expect(mockTest).to.deep.equal(mockKeys))
    })


    for (let i=0; i < mockTest.length;  i++) {
        const elementTest = mockTest[i]
        describe(`Should object is contract it _test: ${elementTest}`, () => arrayDomainsTest(Case.object[elementTest]))
    }
}

exports.SmokeDomains = (Case, Modulo, NameModulo) => {

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
            it(`Should injectable is array contains string: ${element}`, () => arrayTestDomains(Modulo.routes[element].injectable, 'string'))
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