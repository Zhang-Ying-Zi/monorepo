import templateCompile from "./templateCompile";

test("** templateCompile **", () => {
  let template = `<ul><% for(let i=0; i < data.supplies.length; i++) { %><li><%= data.supplies[i] %></li><% } %></ul>`;
  let parse = eval(templateCompile(template));
  let compiledHtml = parse({ supplies: ["broom", "mop", "cleaner"] });
  expect(compiledHtml).toBe(
    "<ul><li>broom</li><li>mop</li><li>cleaner</li></ul>"
  );
});
