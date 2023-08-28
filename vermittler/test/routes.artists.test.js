const request = require('supertest');
const app = require('../app');
const expect = require('chai').expect;

// retrieve the artist using the slug
describe('GET /artists/slug/:slug', function () {
    it('returns the artist', async function () {
        const slug = "spb"
        const name = "SPB"
        const response = await request(app).get(`/artists/slug/${slug}`);
        expect(response.status).to.eql(200);
        expect(response.body.name).to.eql(`${name}`);
    });

    // non-existing slug
    it('returns 404 for non-existing slug', async function () {
        const slug = "non-existing-slug"
        const response = await request(app).get(`/artists/slug/${slug}`);
        expect(response.status).to.eql(404);
    });
});