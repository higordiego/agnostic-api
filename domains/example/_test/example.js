module.exports = {
    describe: `Route by example`,
    object: {
        get: [],
        post: [
            {
                it: {
                    describe: `Route get ${'/api/byexample/:id/email'}`,
                    description: `should send send request byexample parse id expected 200`,
                    url: '/api/byExample/1/email',
                    token: '',
                    be: 'object',
                    status: 200,
                    body: {}
                }
            }
        ],
        put: [],
        delete: []
    }
}