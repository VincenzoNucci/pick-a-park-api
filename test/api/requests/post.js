process.env.NODE_ENV = 'test';

const expect = require('chai').expect;
const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const express = require('express');
const app = express();
var server;

describe('POST /api/request', () => {
    before((done) => {
        const app = require('../../../server.js');
        
        server = app.listen(3000, () => console.log('Test server started!'));
        done()
    });
    after(async (done) => {
        await server.close();
    })
    
    it('OK, sending a request works', (done) => {
        request(app).post('/')
            .send({
                "startingLocation": "Rome",
                "targetLocation": "Camerino",
                "duration": 120,
                "plateNumber": "AB 123 CD"
            })
            .then((res) => {
                const body = res.body;
                expect(body).to.contain.property('_id');
                expect(body).to.contain.property('startingLocation');
                expect(body).to.contain.property('targetLocation');
                expect(body).to.contain.property('duration');
                expect(body).to.contain.property('plateNumber');
                expect(body).to.contain.property('status');
                done();
            })
            .catch((err) => done(err));
    })
})

