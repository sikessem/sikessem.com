import { component$, render } from '@builder.io/qwik';
import '@builder.io/qwik/qwikloader.js';
import {counter} from '~/components/counter';
import './vendor';
import.meta.glob(['@/**']);

for (const element of document.querySelectorAll('q-counter')) {
    const props: Record<string, any> = {};
    const content = element.innerHTML;
    const pattern = /\(\{([^\(\)]+?)\}\)\s*(?:\=\>|\{)\s*/g
    const re = new RegExp(pattern);
    const fn = counter.toString();
    const res = re.exec(fn);
    if (res) {
        const defaultProps = parseProps(res[1]);
        for (const [prop, defaultValue] of Object.entries(defaultProps)) {
            const value = parseValue(element.getAttribute(prop) || 'null') ?? defaultValue;
            props[prop] = value;
        };
    }
    const Counter = component$<{ init: number; step: number }>(counter);
    render(
        element,
        <Counter init={props.init} step={props.step}>
            {content}
        </Counter>,
    );
}

function parseValue(value: string): any {
    value = value.trim();

    if (value === 'null') {
        return null;
    }

    if (value === 'undefined') {
        return undefined;
    }

    if (value === 'true') {
        return true;
    }

    if (value === 'false') {
        return false;
    }

    if (! Number.isNaN(Number(value))) {
        return Number(value);
    }

    if (new RegExp(/^('|")(.*?)\1$/gsm).test(value)) {
        return parseString(value);
    }

    if (new RegExp(/^\[(.*?)\]$/gsm).test(value)) {
        return parseArray(value);
    }

    if (new RegExp(/^\{(.*?)\}$/gsm).test(value)) {
        return parseObject(value);
    }

    return value;
}

function parseString(value: string): string {
    let res = new RegExp(/^('|")(.*?)\1$/gsm).exec(value)
    if (res) {
        value = res[2];
    }
    return value;
}

function parseArray(value: string): any[] {
    const res = new RegExp(/^\[(.*?)\]$/gsm).exec(value)
    if (res) {
        value = res[1];
    }
    const arr: any[] = [];
    const parts = value.split(',');
    for (const i in parts) {
        arr[i] = parseValue(parts[i].trim())
    }
    return arr;
}

function parseObject(value: string): Record<any,any> {
    const res = new RegExp(/^\{(.*?)\}$/gsm).exec(value)
    if (res) {
        value = res[1];
    }
    const obj: Record<any,any> = {};
    const parts = value.split(',');
    for (const part of parts) {
        let [key, value] = part.split(':', 2);
        key = parseValue(key);
        value = parseValue(value);
        obj[key] = value;
    }
    return obj;
}

function parseParams(value: string): Record<string,any> {
    const res = new RegExp(/^\((.*?)\)$/gsm).exec(value)
    if (res) {
        value = res[1];
    }
    const params: Record<string,any> = {};
    const parts = value.split(',');
    for (const part of parts) {
        let [name, value] = part.split('=', 2);
        name = parseString(name.trim());
        value = parseValue(value);
        params[name] = value;
    }
    return params;
}

function parseProps(value: string): Record<string,any> {
    const res = new RegExp(/^\{(.*?)\}$/gsm).exec(value)
    if (res) {
        value = res[1];
    }
    return parseParams(value);
}
