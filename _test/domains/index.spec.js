const fs = require('fs')
const path = require('path')
const pathDirname = path.join(__dirname, '../../domains')

const { SmokeDomains, ExecuteTestSmoke } = require('../helpers/smoke')

const testCaseSmoke = (array) => {
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

fs.readdir(pathDirname, (err, files) => {
    testCaseSmoke(files)
})
