import { render } from '@builder.io/qwik';
import { components } from '~/components';
import './vendor';
import { parse_props, parse_val } from './parser';
import.meta.glob(['@/**']);

for (const [selector, [component, Qomponent]] of Object.entries(components)) {
    for (const element of document.querySelectorAll(`q-${selector}`)) {
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
