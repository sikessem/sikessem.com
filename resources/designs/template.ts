import { JSXNode, QwikJSX } from "@builder.io/qwik";

export interface Template {
    render: <PROPS extends Record<any, any>>(props: PROPS) => JSXNode|QwikJSX.Element|null
}
