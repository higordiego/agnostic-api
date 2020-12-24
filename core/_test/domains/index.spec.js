const { Smoke, ExecuteTestSmoke } = require('../helpers/smoke')

const PATH = 'domains/user'

const cases = [
    {
        case: 'index',
        smoke: ['authenticate', 'logout']
    },
    {
        case: 'index',
        smoke: ['listAll']
    }
]

ExecuteTestSmoke(Smoke)(PATH, cases, 'Domains User')