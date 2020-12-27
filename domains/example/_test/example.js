module.exports = {
    describe: `Route Authenticate`,
    object: {
        // beforeEach: {
        //     // fn: (done) => {
        //     //     done()
        //     // }
        // },
        get: [],
        post: [
            {
                it: {
                    describe: `Route get ${'/api/byexample/:id/email'}`,
                    description: `should send send request byexample parse id expected 200`,
                    url: '/api/byExample/1/email',
                    token: '',
                    be: 'object',
                    status: 400,
                    body: {}
                }
            }
        ],
        put: []
    }
}