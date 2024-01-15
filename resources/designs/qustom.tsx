import { type Component, type JSXNode, type QwikJSX, render } from "@builder.io/qwik";

import { parse_props, parse_val } from './parser';

export type Template = <PROPS extends Record<any, any>>(props: PROPS) => JSXNode | QwikJSX.Element | null;

class QwikElement extends HTMLElement {
    constructor() {
        super();
    }
}

const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
        switch (mutation.type) {
            case 'attributes':
                break;
            case 'characterData':
                break;
            case 'childList':
                break;
        }
    }
});

export function define(name: string, template: Template, component: Component) {
    const q_tag = `q-${name}`;

    if (! customElements.get(q_tag)) {
        customElements.define(q_tag, QwikElement);
    }

    for (const element of document.getElementsByTagName(q_tag)) {
        observer.observe(element, { attributes: true, characterData: true, childList: true, subtree: true });
        const props: Record<string, any> = {};
        const slot = element.innerHTML;
        const exp = /\(\{([^\(\)\{\}]+?)\}\)\s*(?:\=\>)?\s*\{?/mg
        const reg = new RegExp(exp);
        const tpl = template.toString();
        const res = reg.exec(tpl);
        if (res) {
            const default_props = parse_props(res[1]);
            for (const [prop, default_val] of Object.entries(default_props)) {
                const value = parse_val(element.getAttribute(prop) || 'null') ?? default_val;
                props[prop] = value;
            };
        }

        const Qomponent = component;

        render(
            element,
            <Qomponent {...props}>
                {slot}
            </Qomponent>,
        );
    }
}
