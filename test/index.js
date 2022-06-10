const request = require('supertest')
const expect = require('chai').expect
const host = 'http://' + 'localhost' + ':' + 3000
const accessToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkZyYW1lc3RhIEZlcm5hbmRvIiwiZW1haWwiOiJmcmFkb3RlY2guaWRAZ21haWwuY29tIiwiaWF0IjoxNjUzNDU2MDU0LCJleHAiOjE2NTQwNjA4NTR9.wlAM0LzRfkEeJAJVGADZIkR7N_4g5q2U6ILleeubNtE'

describe("auth", () => {
  const baseUrl = "/auth"
  const user = {
    email: 'fradotech.id@gmail.com', 
    password: 'fradoo'
  }

  it('Login gagal password salah', function (done) {
    const path = baseUrl + "/login"
    console.log(path)

    request(host)
    .post(path)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .send({
      email: 'fradotech.id@gmail.com', 
      password: 'passwordSalah'
    })
    .expect(401)
    .expect('Content-Type', /json/)
    .expect(function(response) {
      expect(response.body.message).equal('Incorrect User or Password')
    })
    .end(done);
  })

  it('Login berhasil', function (done) {
    const path = baseUrl + "/login"
    console.log(path)

    request(host)
    .post(path)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .send(user)
    .expect(200)
    .expect('Content-Type', /json/)
    .expect(function(response) {
      expect(response.body.message).equal('Successful operation!')
      expect(response.body.data.accessToken).not.to.be.empty
    })
    .end(done);
  })
})