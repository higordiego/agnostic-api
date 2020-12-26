
const byCategoryId = require('./routes/byCategory')

module.exports = (abstract) => ({
    routes: {
        byCategoryId: byCategoryId(abstract)
    },
    domains: {
        getCategory: () => console.log('category')
    }
})