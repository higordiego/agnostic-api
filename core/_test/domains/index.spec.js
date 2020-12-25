const { Smoke, ExecuteTestSmoke } = require('../helpers/smoke')

const PATH = 'domains/user'

const cases = [
    {
        case: 'index',
        smoke: [
            {
            val: 'routes',
            type: 'object',
            equalKeys: ['path', 'method', 'injectable', 'middleware', 'authenticate']
            },
            {
                val: 'domains',
                type: 'function'
            }]
    }
]

ExecuteTestSmoke(Smoke)(PATH, cases, 'User')