import { expect, test } from "bun:test";
import view from "./view";

test("Test parser", () => {
  const template = view`Bonjour le monde`;
  const render = "Bonjour le monde";
  expect(template.render()).toEqual(render);
});
