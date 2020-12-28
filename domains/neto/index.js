const byExample = require('./routes/byExample')

module.exports = (abstract) => ({
    routes: {
        byExampleNeto: byExample(abstract),
    },
    domains: {
        getUserByIdAndEmail: (id, email) => ({id, email, name: 'Higor diego' })
    }
})