const byExample = require('./routes/byExample')

module.exports = (abstract) => ({
    route: {
        byExample: byExample(abstract),
    },
    domains: {
        getByExampleDomain: (user) => console.log('user', user)
    }
})