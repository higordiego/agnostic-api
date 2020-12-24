const byUser = require('./routes/byUser')
const byEmail = require('./routes/byEmail')

module.exports = (abstract) => ({
    routes: {
        byEmail: byEmail(abstract),
        byUser: byUser(abstract)
    },
    domains: {
        getUser: (user) => console.log('user', user)
    }
})