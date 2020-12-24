const databaseFn = require('../models')
const models = databaseFn

exports.models = models
exports.findAll = (collection, query) => models[collection].findAll(query)
exports.findAllPaginate = async (collection, query, pages) => {
    const Model = models[collection]
    const HelperPaginate = require('../../helpers/paginate')(Model)
    const page = await HelperPaginate.countAll(pages, query)
    return HelperPaginate.listAll(query)(page)
}

exports.findOne = (collection, query) => models[collection].findOne(query)
exports.create = (collection, data) => models[collection].create(data, { raw: true })
exports.update = (collection, query, data) => models[collection].update(data, query)
exports.remove = (collection, query) => models[collection].destroy(query)