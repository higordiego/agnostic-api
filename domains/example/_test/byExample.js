module.exports = {
    describe: `Route by example`,
    object: {
        get: [],
        post: [
            {
                it: {
                    describe: `Route get ${'/api/byExample/:id/email'}`,
                    description: `should send request byexample parse id expected 200`,
                    url: '/api/byExample/1/email',
                    token: '',
                    be: 'object',
                    status: 200,
                    body: {
                        email: "higordiego@contato.com.br"
                    }
                }
            }
        ],
        put: [],
        delete: []
    }
}