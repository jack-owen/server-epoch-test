const index = require('../src/index');

describe("/time endpoint", () => {
  test("return server epoch", async () => {
    const { body } = await request
      .get("/time")
      .expect(200);
  });
});
