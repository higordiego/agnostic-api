const byUser = require('./routes/byUser')
const byEmail = require('./routes/byEmail')
const { findByUserId } = require('./repository')

module.exports = {
    routes: { byEmail, byUser },
    domains: {
        getUser: (user) => user + 1,
        findByUserId
    }
}