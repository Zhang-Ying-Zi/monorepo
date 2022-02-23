import { addTimeoutToPromise } from "./addTimeoutToPromise.js";
import { delay } from "./delay.js";

test("** addTimeoutToPromise **", () => {
  addTimeoutToPromise(
    delay(1000).then(() => "Completed"),
    2000
  ).then((data) => expect(data).toBe("Completed"));

  addTimeoutToPromise(delay(2000), 1000).catch((e) =>
    expect(e.message).toBe("Timeout exceeded")
  );
});
