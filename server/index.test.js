const request = require('supertest')
const app = require('./index')
const { expect } = require('chai')
const db = require('./db')
const seedUsers = require('../script/users.json')


describe('GET /users', () => {

  before(async (done) => {
    try {
      await db.sync({ force: true })
      await db.models.user.bulkCreate(seedUsers)
      done()
    } catch (err) {
      done(err);
    }
    // await db.sync({ force: true })
    // await db.models.user.bulkCreate(seedUsers)
  })

  it('should return list of users', async (done) => {
    try {
      const res = await request(app).get('/api/users')
      expect(res.status).to.equal(200)
      expect(res.body.length).to.equal(seedUsers.length)
      done()
    } catch(err) {
      done(err)
    }


    // const res = await request(app).get('/api/users')
    // expect(res.status).to.equal(200)
    // expect(res.body.length).to.equal(seedUsers.length)
  })
})
