import { render } from '@builder.io/qwik';
import { components } from '~/components';
import './vendor';
import { parse_props, parse_val } from './parser';
import.meta.glob(['@/**']);

class QwikComponent extends HTMLElement {
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

for (const [tag, [component, Qomponent]] of Object.entries(components)) {
    const q_tag= `q-${tag}`;
    if (! customElements.get(q_tag)) {
        customElements.define(q_tag, QwikComponent);
    }
    for (const element of document.getElementsByTagName(q_tag)) {
        observer.observe(element, { attributes: true, characterData: true, childList: true, subtree: true });
        const props: Record<string, any> = {};
        const content = element.innerHTML;
        const pattern = /\(\{([^\(\)]+?)\}\)\s*(?:\=\>|\{)\s*/g
        const re = new RegExp(pattern);
        const fn = component.toString();
        const res = re.exec(fn);
        if (res) {
            const default_props = parse_props(res[1]);
            for (const [prop, default_val] of Object.entries(default_props)) {
                const value = parse_val(element.getAttribute(prop) || 'null') ?? default_val;
                props[prop] = value;
            };
        }
        render(
            element,
            <Qomponent {...props}>
                {content}
            </Qomponent>,
        );
    }
}
