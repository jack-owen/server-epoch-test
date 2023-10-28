const app = require('../app');
const request = require("supertest")(app);

const mockTimestamp = new Date('2019-04-07T10:20:30Z').getTime();

test('true to be truthy', () => {
  expect(true).toBe(true);
});

test('return valid time', async () => {
  global.Date.now = jest.fn(() => mockTimestamp)

  const { body } = await request
    .get("/time")
    .expect(200);

  expect(body).toEqual({ epoch: expect.any(Number) });
  expect(body.epoch).toBe(mockTimestamp);
});

test('return prometheus metrics', async () => {
  await request
    .get("/metrics")
    .expect(200);
});
