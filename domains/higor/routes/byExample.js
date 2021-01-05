/**
 * @param abstract
 * @returns {function({findByUserId: *}, {data: *, params: *, query: *}): {data: {title: string, message: string}, status: number}}
 */
const handler = (abstract) => ({ data, params, query }, domains ) => {
    return {
        status: 200,
        data: { id: 1, email: data.email }
    }
}

/**
 * @param abstract
 * @returns {{path: string, handler: (function({findByUserId: *}, {data: *, params: *, query: *}): {data: {title: string, message: string}, status: number}), injectable: [], authenticate: boolean, method: string, middleware: []}}
 */
module.exports = (abstract) => ({
    path: '/byExample/:id/email',
    method: 'post',
    injectable: [],
    middleware: [],
    authenticate: false,
    handler: handler(abstract)
})

