const fs = require('fs')
const path = require('path')

const { Smoke, ExecuteTestSmoke } = require('../helpers/smoke')

const pathDirname = path.join(__dirname, '../../domains')
fs.readdir(pathDirname, (err, files) => {

    for (let i=0; i < files.length; i++) {
        const element = files[i]
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
                    }]
            }
        ]
        ExecuteTestSmoke(Smoke)(pathDir, cases, element)
    }
})
