module.exports = {
    describe: `Route by neto`,
    object: {
        get: [],
        post: [
            {
                it: {
                    describe: `Route post ${'/api/neto'}`,
                    description: `should send request neto not contains body expected 400`,
                    url: '/api/neto',
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