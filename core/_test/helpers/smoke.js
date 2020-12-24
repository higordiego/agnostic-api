const { expect }  = require('chai')
const fs = require('fs')
const path = require('path')

const DIRECTORY = '../../../'

const replaceJs = archive => archive.replace('.js', '')
const isArchive = archive => !archive.startsWith('.')

exports.ExecuteTestSmoke = (smoke) => (PATH, cases, name) => {
    const directories =
        fs.readdirSync(path.join(__dirname, DIRECTORY, PATH))
            .filter(isArchive)
            .map(replaceJs).sort()

    const receive = cases.filter(value => {
        return directories.filter(directory => value.case === directory)
    })

    receive.map(value =>
            smoke(value.smoke, require(`${DIRECTORY}${PATH}/${value.case}`)(null), `${name} ${value.case.toUpperCase()}`)
    )
}

exports.Smoke = (Case, Modulo, NameModulo) => {
    console.log('modulo', Modulo)
    const helpersFunctionsDefaut = Object.values(Modulo)

    const describeExist = helperFunction => (value, index) =>
        it(`Should exist the ${value}`, () => expect(helperFunction[index]).to.exist)

    const describeInFunction = helpersFunctions => (value, index) =>
        it(`${value} it is function`, () => expect(helpersFunctions[index]).to.be.an('function'))

    describe(`${NameModulo} test smoke`, () => {
        it('It is function', () => Case.map(describeInFunction(helpersFunctionsDefaut)))
        it('Should exist', () => Case.map(describeExist(helpersFunctionsDefaut)))
    })
}