const byExample = require('./routes/byExample')

module.exports = (abstract) => ({
    routes: {
        byExample: byExample(abstract),
    },
    domains: {
        getByExampleDomain: (user) => console.log('user', user)
    }
})