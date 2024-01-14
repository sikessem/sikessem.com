import { render } from '@builder.io/qwik';
import '@builder.io/qwik/qwikloader.js';
import { Counter } from '~/components/Counter';
import './vendor';
import.meta.glob(['@/**']);

for (const element of document.querySelectorAll('q-counter')) {
    const props: Record<string, string> = {};
    for (const param of ['init', 'step']) {
        const prop = element.getAttribute(param);
        if (prop) {
            props[param] = prop;
        }
    }
    const content = element.innerHTML;
    render(
        element,
        <Counter init={Number(props.init)} step={Number(props.step)}>
            {content}
        </Counter>,
    );
}
