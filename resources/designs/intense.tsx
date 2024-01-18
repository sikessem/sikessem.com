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
        const reg = /render\s*\(\{([^\(\)\{\}]+?)\}\)\s*(?:\=\>)?\s*\{?/mg
        const tpl = template.toString();
        const res = reg.exec(tpl);
        if (res) {
            const default_props = parse_props(res[1]);
            for (const [prop, default_val] of Object.entries(default_props)) {
                let attr = elt.getAttribute(`:${prop}`);
                if (attr) {
                    props[prop] = parse_val(attr);
                    continue;
                }

                attr = elt.getAttribute(prop);
                if (attr) {
                    props[prop] = attr;
                    continue;
                }

                props[prop] = default_val;
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
