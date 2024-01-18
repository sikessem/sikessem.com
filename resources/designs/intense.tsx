import { type QwikJSX, render, component$ } from "@builder.io/qwik";
import { parse_props, parse_val } from './parser';

export type Props = Record<any, any>;
export type Template = <T extends Props>(props: T) => QwikJSX.Element;

export interface Renderer {
    name: string
    render: Template
}

export declare const Renderer : {
    prototype: Renderer;
    new(): Renderer;
};

class Element extends HTMLElement {}

export function use(rendererType: typeof Renderer, prefix = 'q') {
    const renderer = new rendererType;
    const template = renderer.render;
    const Component = component$(<T extends Props>(props: T) => template(props));
    const tag = `${prefix}-${renderer.name}`;
    if (! customElements.get(tag)) {
        customElements.define(tag, Element);
    }
    for (const elt of document.getElementsByTagName(tag)) {
        const props: Props = {};
        const slot = elt.innerHTML;
        const exp = /render\s*\(\{([^\(\)\{\}]+?)\}\)\s*(?:\=\>)?\s*\{?/mg
        const reg = new RegExp(exp);
        const tpl = template.toString();
        const res = reg.exec(tpl);
        if (res) {
            const default_props = parse_props(res[1]);
            for (const [prop, default_val] of Object.entries(default_props)) {
                const value = parse_val(elt.getAttribute(prop) || 'null') ?? default_val;
                props[prop] = value;
            };
        }
        render(
            elt,
            <Component {...props}>
                {slot}
            </Component>,
        );
    }
}
