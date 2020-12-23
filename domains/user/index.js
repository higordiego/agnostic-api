const byUser = require('./routes/byUser')

module.exports = {
    routes: { byUser },
    domains: { getUser: (user) => user + 1 }
}