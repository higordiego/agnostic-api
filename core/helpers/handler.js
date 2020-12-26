
exports.constructorHandlerResponse = (domains, { handler }) => async (req, res) => {
    try {
        const { data = {}, status = 500 } = await handler(
            {
                data: req.body,
                params: req.params,
                query: req.query
            },
            {
            ...domains
        })
        return res.status(status || 200).json(data || {})
    } catch (error) {
        return res.status(error).json(error.message)
    }
}
