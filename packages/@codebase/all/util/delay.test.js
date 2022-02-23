import { delay } from "./delay.js";

test("** delay **", async () => {
  let timeStart = new Date().getTime();
  await delay(1000);
  let timeEnd = new Date().getTime();
  expect(timeEnd - timeStart).toBeGreaterThanOrEqual(1000);
});
