
const fg = require('fast-glob')
const path = require('path')

exports.getRoutesAndDomains = async () => {
    const dir = path.join(__dirname, '../../../domains/**/index.spec.js')
    const getArchive = await fg(path.join(dir))
    return getArchive
}