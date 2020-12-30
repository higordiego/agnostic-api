const fs = require('fs')
const path = require('path')
const pathDirname = path.join(__dirname, '../../domains')

const { SmokeDomains, ExecuteTestSmoke, smokeContractTest } = require('../helpers/smoke')

const testCaseSmokeDomain = (array) => {
    for (let i=0; i < array.length; i++) {
        const element = array[i]
        const pathDir = path.join(__dirname, `../../domains/${element}`)
        const cases = [
            {
                case: 'index',
                smoke: [
                    {
                        val: 'routes',
                        type: 'object',
                        equalKeys: ['path', 'method', 'injectable', 'middleware', 'authenticate']
                    },
                    {
                        val: 'domains',
                        type: 'function'
                    }
                ]
            }
        ]
        ExecuteTestSmoke(SmokeDomains)(pathDir, cases, element)
    }
}

const testCaseSmokeTest = (array) => {
    for (let i = 0; i < array.length; i++) {
        const files = array[i]
        fs.readdir(`${pathDirname}/${files}/_test`, (_, archive) => {
            const element = archive[i]
            if(element !== undefined) {
                const test = require(`${pathDirname}/${files}/_test/${element}`)
                smokeContractTest(test, element)
            }
        })
    }
}

fs.readdir(pathDirname, (_, files) => {
    testCaseSmokeDomain(files)
    testCaseSmokeTest(files)
})

