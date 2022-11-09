const request = require('supertest');
const app = require('../app');

describe('launches', () => {
    it('return status 201 if post success', async() => {
        const response = await request(app).post('/launches').send({
            mission: "ZTM155",
            rocket: 'ZTM Experimental IS1',
            target: 'Kepler-186 f',
            launchDate: 'January 17, 2030'
        });
        expect(response.statusCode).toEqual(201);
    });

    it('return bad request if post false', async() => {
        const response = await request(app).post('/launches').send({});
        expect(response.statusCode).toEqual(400);
        expect(response.body).toEqual({
            error: "Missing required launch property",
        });
    });

    it('return bad request if post launchDate false', async() => {
        const response = await request(app).post('/launches').send({
            "mission": "ZTM155",
            "rocket": "ZTM Experimental IS1",
            "target": "Kepler-186 f",
            "launchDate": "Januasas"
        });
        expect(response.statusCode).toEqual(400);
        expect(response.body).toEqual({
            error: "Invalid launch date",
        });
    });
});

describe('GET /launches', function() {
    it('response with json success', function(done) {
        request(app)
            .get('/launches')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

});

describe('DELETE /launches/:id', function() {
    it('return delete success', async() => {
        const response = await request(app).delete('/launches/100');
        expect(response.statusCode).toEqual(200);
    });

    it('return delete id not exists success', async() => {
        const response = await request(app).delete('/launches/aasa');
        expect(res.statusCode).toEqual(404);
        expect(res.body).toEqual({
            error: "launch not found",
        });
    });
});


describe('GET /planets', function() {
    it('responds planets with json success', function(done) {
        request(app)
            .get('/planets')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200,done);
    });
});