const { Smoke, ExecuteTestSmoke } = require('../helpers/smoke')
const fs = require('fs')
const path = require('path')
fs.readdir(path.join(__dirname, '../../../domains'), (err, files) => {

    for (let i=0; i < files.length; i++) {
        const element = files[i]
        const pathDir = path.join(__dirname, `../../../domains/${element}`)
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
        ExecuteTestSmoke(Smoke)(pathDir, cases, 'User')
    }
})
