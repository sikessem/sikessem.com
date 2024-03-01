import { expect, test } from "bun:test";
import { Element, Node, Slot, Text, element, text } from "./view";

test("Test text", () => {
  const txt = text("Hello", {
    fr_CI: "Salut",
  });

  expect(txt).toBeInstanceOf(Text);
  expect(txt).toBeInstanceOf(Node);
  expect(txt.value).toEqual("Hello");
  expect(txt.render()).toEqual("Hello");
  expect(txt.render("fr_CI")).toEqual("Salut");
  expect(txt.translateTo("fr_CI")).toEqual("Salut");
  expect(Text.translate("Salut").to("en_US")).toEqual("Hello");
  expect(Text.translate("Salut").to("fr_CI")).toEqual("Salut");
});

test("Test element", () => {
  const elt = element(
    "div",
    {
      id: "MyDiv",
    },
    text("Hello"),
    element("b", {}, text("World")),
  );
  expect(elt).toBeInstanceOf(Element);
  expect(elt).toBeInstanceOf(Node);
  expect(elt.slot).toBeInstanceOf(Slot);
  expect(elt.slot).toBeInstanceOf(Node);
  expect(elt.slot.render()).toEqual("Hello<b>World</b>");
  expect(elt.render()).toEqual('<div id="MyDiv">Hello<b>World</b></div>');
});
