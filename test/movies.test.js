process.env.NODE_ENV = 'test';

const { expect } = require('chai');
const chai = require('chai');
// const expect = require('chai').expect;
const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);

let id = {};

describe('Movies API', () => {
  describe('Get movies', () => {
    it('returns status 200', (done) => {
      chai
        .request(server)
        .get('/movies')
        .then((res) => {
          // console.log(res.body);
          expect(res.statusCode).to.equal(200);
          done();
        })
        .catch((err) => {
          // console.log(err);
          done(err);
        });
    });

    it('return movie list', (done) => {
      chai
        .request(server)
        .get('/movies')
        .then((res) => {
          // console.log(res.body);
          expect(res.body).to.be.an('array');
          expect(res.body[0]).to.have.property('title');
          expect(res.body[0]).to.have.property('genre');
          expect(res.body[0]).to.have.property('year');
          done();
        })
        .catch((err) => {
          // console.log(err);
          done(err);
        });
    });
  });

  describe('Insert movie', () => {
    it('inserts a new movie returning status 200', (done) => {
      chai
        .request(server)
        .post('/movies')
        .send({
          title: 'test movie',
          genre: 'test genre',
          year: 'test 2021'
        })
        .then((res) => {
          // console.log(res.body);
          id = res.body._id;
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.have.property(
            'title',
            'test movie'
          );
          expect(res.body).to.have.property(
            'genre',
            'test genre'
          );
          expect(res.body).to.have.property(
            'year',
            'test 2021'
          );
          done();
        })
        .catch((err) => {
          // console.log(err);
          done(err);
        });
    });
  });

  describe('Update movie', () => {
    it('updates existing movie returning status 200', (done) => {
      chai
        .request(server)
        .put('/movies')
        .send({
          _id: id,
          title: 'updated movie',
          genre: 'updated genre',
          year: 'updated 2021'
        })
        .then((res) => {
          // console.log(res.body);
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.have.property('nModified', 1);
          done();
        })
        .catch((err) => {
          // console.log(err);
          done(err);
        });
    });
  });

  describe('Delete movie', () => {
    it('deleted existing movie returning status 200', (done) => {
      chai
        .request(server)
        .delete('/movies/' + id)
        .then((res) => {
          // console.log(res.body);
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.have.property(
            'deletedCount',
            1
          );
          done();
        })
        .catch((err) => {
          // console.log(err);
          done(err);
        });
    });
  });
});
