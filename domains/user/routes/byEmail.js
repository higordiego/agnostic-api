exports.path = '/users/:id/email'
exports.method = 'POST'
exports.injectable = ['findByUserId']
exports.middleware = []
exports.authenticate = false

exports.handler = ({ findByUserId }, { data, params, query }) => {
    return {
        status: 200,
        data: { title: 'Aqui porra', message: 'aqui' }
    }
}
