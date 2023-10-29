const app = require("../app");
const request = require("supertest")(app);

const authToken = "mysecrettoken";
const mockTimestamp = new Date("2019-04-07T10:20:30Z").getTime();

const defaultMetrics = [
  "http_request_duration_seconds_bucket",
  "http_request_duration_seconds_sum",
  "http_request_duration_seconds_count",
  "http_requests_total",
  "http_response_length_bytes_bucket",
  "http_response_length_bytes_sum",
  "http_response_length_bytes_count",
  "process_cpu_user_seconds_total",
  "process_cpu_system_seconds_total",
  "process_cpu_seconds_total",
  "process_start_time_seconds",
  "process_resident_memory_bytes",
  "nodejs_eventloop_lag_seconds",
  "nodejs_eventloop_lag_min_seconds",
  "nodejs_eventloop_lag_max_seconds",
  "nodejs_eventloop_lag_mean_seconds",
  "nodejs_eventloop_lag_stddev_seconds",
  "nodejs_eventloop_lag_p50_seconds",
  "nodejs_eventloop_lag_p90_seconds",
  "nodejs_eventloop_lag_p99_seconds",
  "nodejs_active_handles",
  "nodejs_active_handles_total",
  "nodejs_active_requests",
  "nodejs_active_requests_total",
  "nodejs_heap_size_total_bytes",
  "nodejs_heap_size_used_bytes",
  "nodejs_external_memory_bytes",
  "nodejs_heap_space_size_total_bytes",
  "nodejs_heap_space_size_used_bytes",
  "nodejs_heap_space_size_available_bytes",
  "nodejs_version_info",
  "nodejs_gc_duration_seconds",
];

test("true to be truthy", () => {
  expect(true).toBe(true);
});

test("return valid time", async () => {
  global.Date.now = jest.fn(() => mockTimestamp);

  const { body } = await request
    .get("/time")
    .set("Authorization", authToken)
    .expect(200);

  expect(body).toEqual({ epoch: expect.any(Number) });
  expect(body.epoch).toBe(mockTimestamp);
});

test("return default prometheus metrics", async () => {
  const { text } = await request
    .get("/metrics")
    .set("Authorization", authToken)
    .expect(200);

  defaultMetrics.forEach((item) => {
    expect(text).toContain(item);
  });
});

describe("Forbidden for invalid token", () => {
  test("Forbidden missing token", async () => {
    const { body } = await request.get("/time").expect(403);

    expect(body.error).toBe("Forbidden: Invalid Authorization token");
  });

  test("Forbidden wrong token", async () => {
    const { body } = await request
      .get("/time")
      .set("Authorization", "sausages")
      .expect(403);

    expect(body.error).toBe("Forbidden: Invalid Authorization token");
  });
});
