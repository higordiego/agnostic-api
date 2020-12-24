const byUser = require('./routes/byUser')
const byEmail = require('./routes/byEmail')

module.exports = {
    routes: { byEmail, byUser },
    domains: { getUser: (user) => user + 1 }
}