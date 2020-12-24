const { Smoke, ExecutTestSmoke } = require('../../helpers/smoke')

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

ExecutTestSmoke(Smoke)(PATH, cases, 'Domains User')