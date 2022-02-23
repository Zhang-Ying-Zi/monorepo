import Sleep from "./Sleep.js";

test("** Sleep **", () => {
  return new Promise((resolve) => {
    (async () => {
      const sleepTime = await new Sleep(1000);
      expect(sleepTime).toBeGreaterThanOrEqual(1000);

      return resolve();
    })();
  });
});
