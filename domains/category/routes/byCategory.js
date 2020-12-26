
const handler = (abstract) => ({ data, params, query }, { findByUserId }) => {
    return {
        status: 200,
        data: { title: 'message', message: 'status message' }
    }
}

module.exports = (abstract) => ({
    path: '/category/:id',
    method: 'get',
    injectable: ['findByUserId'],
    middleware: [],
    authenticate: false,
    handler: handler(abstract)
})

