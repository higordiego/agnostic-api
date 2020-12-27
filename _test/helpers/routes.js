
const routes = require('./integration')

const describeGet = (value) => (app) => {
    describe(value.describe, () => {
        it(value.description, (done) => {
            routes.defaultGet(app, value.url, value.status, value.token, value.be, done)
        })
    })
}

const describePost = value => app =>
    describe(value.describe, () => {
        it(value.description, (done) => {
            routes.defaultPost(app, value.url, value.body, value.status, value.token, value.be, done)
        })
    })

const describePut = value => app =>
    describe(value.describe, () => {
        it(value.description, (done) => {
            routes.defaultPut(app, value.url, value.body, value.status, value.token, value.be, done)
        })
    })

const describeDelete = value => app =>
    describe(value.describe, () => {
        it(value.description, (done) => {
            routes.defaultDelete(app, value.url, value.body, value.status, value.token, value.be, done)
        })
    })

exports.IntegrationRoutes = (app) => (json) => {

    if (json.object.beforeEach && json.object.beforeEach.fn)  beforeEach((done) => json.object.beforeEach.fn(done))

    describe(json.describe, () => {

        // get
        if (json.object.get && json.object.get.length > 0) json.object.get.map(value => describeGet(value.it)(app))

        // post
        if(json.object.post && json.object.post.length > 0) json.object.post.map(value => describePost(value.it)(app))

        // put
        if(json.object.put && json.object.put.length > 0) json.object.put.map(value => describePut(value.it)(app))

        // delete
        if(json.object.delete && json.object.delete.length > 0) json.object.delete.map(value => describeDelete(value.it)(app))

    })
}