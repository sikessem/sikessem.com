import { expect, test } from "bun:test";
import view from "./view";

test("Test parser", () => {
  const template = view`p { Bonjour le monde }`;
  const render = "<p>Bonjour le monde</p>";
  expect(template.render()).toEqual(render);
});
