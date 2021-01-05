const byExample = require('./routes/byExample')

module.exports = (abstract) => ({
    route: {
        byExampleHigor: byExample(abstract),
    },
    domain: {
        getUserByIdAndEmailHigor: (id, email) => ({id, email, name: 'Higor diego 2' })
    }
})