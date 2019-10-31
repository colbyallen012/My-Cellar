const request = require('supertest');
const app = require('./app')
const environment = process.env.NODE_ENV || 'development'
const configuration = require('./knexfile')[environment]
const database = require('knex')(configuration)

describe('API', () => {
  beforeEach(async () => {
    await database.seed.run()
  })

  describe('GET /api/v1/vinos', () => {
    it('should return a status of 200 and all of the wines', async () => {
      const expectedLists = await database('vinos').select();
      const response = await request(app).get('/api/v1/vinos')
      const wines = response.body
      expect(response.status).toBe(200);
      expect(wines[0].name).toEqual('their vineyard')
    })
  })
})