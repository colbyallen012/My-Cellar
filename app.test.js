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

  describe('POST /api/v1/vinos', () => {
    it('HAPPY PATH should return 201 status and new object with id', async () => {
      const newVino = {name: 'mines vineyard', vineyard: 'ours', color: 'red', type: 'merlot', year: 2011, rating: 5}
      const response = await request(app).post('/api/v1/vinos').send(newVino)
      const wines = await database('vinos').where('id', response.body.id).select()
      const wine = wines[0]
      expect(response.status).toBe(201)
      expect(wine.name).toEqual(newVino.name)
    })
  })

  describe('DELETE /api/v1/projects/:id', () => {
    it('HAPPY PATH: should return a status of 204 when a wine is deleted', async () => {
      const expectedId = await database('vinos').first('id').then(object => object.id);
      const response = await request(app).delete(`/api/v1/vinos/${expectedId}`)
      expect(response.status).toBe(204)
    })

    it('SAD PATH: should return a 404 if a request id is bad', async () => {
      const response = await request(app).delete('/api/v1/vinos/-2')
      expect(response.status).toBe(404)
    })
  })
})