
exports.constructorHandlerResponse = (domains, { handler }) => async (req, res) => {
    try {
        const { data = {}, status = 500 } = await handler({
                ...domains
            },
            {
                data: req.body,
                params: req.params,
                query: req.query
            })
        return res.status(status).json(data)
    } catch (error) {
        return res.status(error).json(error.message)
    }
}
