export function parse_val(val: string): any {
    val = val.trim();
    const lc_val = val.toLowerCase();

    if (lc_val === 'null') {
        return null;
    }

    if (lc_val === 'undefined') {
        return undefined;
    }

    if (lc_val === 'true') {
        return true;
    }

    if (lc_val === 'false') {
        return false;
    }

    if (! Number.isNaN(Number(val))) {
        return Number(val);
    }

    if (new RegExp(/^('|")(.*?)\1$/gsm).test(val)) {
        return parse_str(val);
    }

    if (new RegExp(/^\[(.*?)\]$/gsm).test(val)) {
        return parse_arr(val);
    }

    if (new RegExp(/^\{(.*?)\}$/gsm).test(val)) {
        return parse_obj(val);
    }

    return val;
}

export function parse_str(val: string): string {
    let res = new RegExp(/^('|")(.*?)\1$/gsm).exec(val)
    if (res) {
        val = res[2];
    }
    return val;
}

export function parse_arr(val: string): any[] {
    const res = new RegExp(/^\[(.*?)\]$/gsm).exec(val)
    if (res) {
        val = res[1];
    }
    const arr: any[] = [];
    const parts = val.split(',');
    for (const i in parts) {
        arr[i] = parse_val(parts[i].trim())
    }
    return arr;
}

export function parse_obj(val: string): Record<any,any> {
    const res = new RegExp(/^\{(.*?)\}$/gsm).exec(val)
    if (res) {
        val = res[1];
    }
    const obj: Record<any,any> = {};
    const parts = val.split(',');
    for (const part of parts) {
        let [key, val] = part.split(':', 2);
        key = parse_val(key);
        val = parse_val(val);
        obj[key] = val;
    }
    return obj;
}

export function parse_params(val: string): Record<string,any> {
    const res = new RegExp(/^\((.*?)\)$/gsm).exec(val)
    if (res) {
        val = res[1];
    }
    const params: Record<string,any> = {};
    const parts = val.split(',');
    for (const part of parts) {
        let [name, val] = part.split('=', 2);
        name = parse_str(name.trim());
        val = parse_val(val);
        params[name] = val;
    }
    return params;
}

export function parse_props(val: string): Record<string,any> {
    const res = new RegExp(/^\{(.*?)\}$/gsm).exec(val)
    if (res) {
        val = res[1];
    }
    return parse_params(val);
}
