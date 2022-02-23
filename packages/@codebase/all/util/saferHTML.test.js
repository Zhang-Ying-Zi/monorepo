import saferHTML from "./saferHTML";

test("** saferHTML **", () => {
  let sender = '<script>alert("abc")</script>'; // 恶意代码
  let message = saferHTML`<p>${sender} has sent you a message.</p>`;
  expect(message).toBe(
    '<p>&lt;script&gt;alert("abc")&lt;/script&gt; has sent you a message.</p>'
  );
});
