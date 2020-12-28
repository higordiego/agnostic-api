const byExample = require('./routes/byExample')

module.exports = (abstract) => ({
    route: {
        byExample: byExample(abstract),
    },
    domains: {
        getUserByIdAndEmail: (id, email) => ({id, email, name: 'Higor diego' })
    }
})