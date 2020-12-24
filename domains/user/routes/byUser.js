
const handler = (abstract) => ({ getUser, userById }, { data, params, query }) => {
    return {
        status: 200,
        data: { title: 'Aqui porra', message: 'aqui' }
    }
}

module.exports = (abstract) => ({
    path: '/authenticate',
    method: 'POST',
    injectable: ['getUser'],
    middleware: [],
    authenticate: false,
    handler: handler(abstract)
})
