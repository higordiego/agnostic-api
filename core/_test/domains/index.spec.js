const { Smoke, ExecuteTestSmoke } = require('../../helpers/smoke')

const PATH = 'domains/user'

const cases = [
    {
        case: 'authenticate',
        smoke: ['authenticate', 'logout']
    },
    {
        case: 'typeUser',
        smoke: ['listAll']
    }
]

ExecuteTestSmoke(Smoke)(PATH, cases, 'Domains User')