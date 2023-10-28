const app = require('../app');
const request = require("supertest")(app);

test('true to be truthy', () => {
  expect(true).toBe(true);
});

test('return valid time', async () => {
    const { body } = await request
    .get("/time")
    .expect(200);
});
