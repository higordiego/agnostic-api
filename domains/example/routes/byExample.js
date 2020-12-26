/**
 *
 * @param abstract
 * @returns {function({findByUserId: *}, {data: *, params: *, query: *}): {data: {title: string, message: string}, status: number}}
 */
const handler = (abstract) => ({ findByUserId }, { data, params, query }) => {
    return {
        status: 200,
        data: { title: 'Aqui retorno', message: 'retorno' }
    }
}
/**
 *
 * @param abstract
 * @returns {{path: string, handler: (function({findByUserId: *}, {data: *, params: *, query: *}): {data: {title: string, message: string}, status: number}), injectable: [], authenticate: boolean, method: string, middleware: []}}
 */
module.exports = (abstract) => ({
    path: '/byexample/:id/email',
    method: 'post',
    injectable: [],
    middleware: [],
    authenticate: false,
    handler: handler(abstract)
})

