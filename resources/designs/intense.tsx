import { type JSXNode, type QwikJSX, render, Component } from "@builder.io/qwik";
import { parse_props, parse_val } from './parser';

export type Template = <PROPS extends Record<any, any>>(props: PROPS) => JSXNode | QwikJSX.Element | null

export interface Element {
    template: Template
}

export declare const Element: {
    prototype: Element;
    new(): Element;
};

class QElement extends HTMLElement {}

export function use(name: string, template: Template, component: Component) {
    const q_tag = `q-${name}`;
    if (! customElements.get(q_tag)) {
        customElements.define(q_tag, QElement);
    }
    for (const q_elt of document.getElementsByTagName(q_tag)) {
        const props: Record<string, any> = {};
        const q_slot = q_elt.innerHTML;
        const exp = /template\s*\(\{([^\(\)\{\}]+?)\}\)\s*(?:\=\>)?\s*\{?/mg
        const reg = new RegExp(exp);
        const tpl = template.toString();
        const res = reg.exec(tpl);
        if (res) {
            const default_props = parse_props(res[1]);
            for (const [prop, default_val] of Object.entries(default_props)) {
                const value = parse_val(q_elt.getAttribute(prop) || 'null') ?? default_val;
                props[prop] = value;
            };
        }
        const QComponent = component;
        render(
            q_elt,
            <QComponent {...props}>
                {q_slot}
            </QComponent>,
        );
    }
}
