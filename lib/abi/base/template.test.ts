import { expect, test } from "bun:test";
import view from "./view";

test("Test parser", () => {
  const template = view`p[id="myP" class="my-4 mx-8" title='Hello world'] { Bonjour le monde }`;
  const render = '<p id="myP" class="my-4 mx-8" title="Hello world">Bonjour le monde</p>';
  expect(template.render()).toEqual(render);
});
