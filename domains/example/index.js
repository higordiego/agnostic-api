const byExample = require('./routes/byExample')

module.exports = (abstract) => ({
    routes: {
        byExample: byExample(abstract),
    },
    domains: {
        getUserByIdAndEmail: (id, email) => ({id, email, name: 'Higor diego 2' })
    }
})