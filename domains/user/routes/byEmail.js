
const handler = (abstract) => ({ findByUserId }, { data, params, query }) => {
    return {
        status: 200,
        data: { title: 'Aqui porra', message: 'aqui' }
    }
}

module.exports = (abstract) => ({
    path: '/users/:id/email',
    method: 'post',
    injectable: ['findByUserId'],
    middleware: [],
    authenticate: false,
    handler: handler(abstract)
})

