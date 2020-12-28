const fs = require('fs')
const path = require('path')
const env = path.join(__dirname, '../../core/.env')

require('dotenv').config({ path: env})

const app = require('../../core/index')

const { IntegrationRoutes } = require('../helpers/routes')

const pathDirname = path.join(__dirname, '../../domains')
fs.readdir(pathDirname, (err, files) => {

    fs.readdir(`${pathDirname}/${files}/_test`, (_, archive) => {
        for (let i=0; i < archive.length; i++) {
            const element = archive[i]
            if (element !== undefined) {
                const test = require(`${pathDirname}/${files}/_test/${archive[i]}`)
                IntegrationRoutes(app)(test)
            }
        }
    })

})