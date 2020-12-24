
exports.path = '/users/:id/email'
exports.method = 'POST'
exports.injectable = ['getUser']
exports.middleware = []
exports.authenticate = false

exports.handler = ({ getUser, userById }, { data, params, query }) => {
    return {
        status: 200,
        data: { title: 'Aqui porra', message: 'aqui' }
    }
}
