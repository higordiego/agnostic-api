/**
 * @type {function(*=): {path: string, handler: {status: Number, data: Object}, injectable: [], authenticate: boolean, method: string, middleware: []}}
 */
const byExample = require('./routes/byExample')
module.exports = (abstract) => ({
    routes: {
        byExample: byExample(abstract),
    },
    domains: {
        getByExampleDomain: (user) => console.log('user', user)
    }
})