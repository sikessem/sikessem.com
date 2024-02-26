import { parse_params } from "./parser";

export function reflect<T>(value: T, objectThis?: object): Reflection {
  if (typeof value === "function" || value instanceof Function) {
    return new ReflectionFunction(value, objectThis);
  }

  if (typeof value === "object" || value instanceof Object) {
    return new ReflectionObject(value, objectThis);
  }

  return new ReflectionValue(value);
}

export class ReflectionError extends Error {}

export abstract class Reflection<T> {
  constructor(protected value: T) {}

  get value(): T {
    return this.value;
  }

  toString(): string {
    return String(this.value);
  }
}

export class ReflectionObject extends Reflection<object> {
  constructor(
    value: typeof Function,
    protected objectThis?: object,
  ) {
    super(value);
  }

  override toString(): string {
    return String(this.value.constructor);
  }
}

export class ReflectionFunction<
  T extends typeof Function,
> extends Reflection<T> {
  protected is_arrow = false;
  protected name: string;
  protected parameters: ReflectionParameter[] = [];
  constructor(
    value: T,
    protected objectThis?: object,
  ) {
    super(value);
    const str_val = value.toString();
    const arrow_re = /^\(([^\(\)]*?)\)\s*\=\>\s*(.+)$/gms;
    const named_re =
      /^(?:function\s+)?([a-zA-Z$_]+[a-zA-Z0-9$_]*)\s*\(([^\(\)]*?)\)\s*\{(.*)\}$/gms;
    const arrow_res = arrow_re.exec(str_val);
    const named_res = named_re.exec(str_val);
    if (arrow_res) {
      this.is_arrow = true;
      this.#parseParameters(arrow_res[1]);
      this.#parseReturn(arrow_res[2]);
    } else if (named_res) {
      this.is_arrow = false;
      this.name = named_res[1] || "anonymous";
      this.#parseParameters(named_res[2]);
      this.#parseReturn(named_res[3]);
    } else {
      throw new ReflectionError(`${value} is not a function`);
    }
  }

  #parseParameters(str_params: string) {
    const parameters = parse_params(str_params);
    this.parameters = [];

    const entries = Object.entries(parameters);
    if (
      entries.length === 1 &&
      entries[0][0] === "0" &&
      entries[0][1] === undefined
    ) {
      return;
    }

    const i = 0;
    for (const param of entries) {
      this.parameters.push(
        new ReflectionParameter(this, param[0], i, param[1]),
      );
    }
  }

  get paramters(): ReflectionParameter[] {
    return this.parameters;
  }

  getParameter(name: string): ReflectionParameter | undefined {
    for (const param of this.parameters) {
      if (param.name === name) {
        return param;
      }
    }
    return undefined;
  }

  hasParameter(name: string): boolean {
    for (const param of this.parameters) {
      if (param.name === name) {
        return true;
      }
    }
    return false;
  }

  #parseReturn(str_ret: string) {
    // TODO: throw new ReflectionError("Not implemented!");
  }
}

export class ReflectionParameter<T> extends Reflection<T> {
  constructor(
    protected func: ReflectionFunction,
    protected name: string,
    protected index: number,
    value: T,
  ) {
    super(value);
  }

  get name(): string {
    return this.name;
  }

  get index(): number {
    return this.index;
  }

  getFunction(): ReflectionFunction {
    return this.func;
  }

  hasDefaultValue(): boolean {
    return this.value !== undefined;
  }

  getDefaultValue(): ReflectionParameterValue {
    return new ReflectionParameterValue(this, this.value);
  }
}

export class ReflectionValue extends Reflection {
  get type(): string {
    return typeof this.value;
  }
}

export class ReflectionParameterValue<T> extends ReflectionValue<T> {
  constructor(
    protected param: ReflectionParameter,
    value: T,
  ) {
    super(value);
  }

  getParameter(): ReflectionParameter {
    return this.param;
  }
}

export class ReflectionReturnValue<T> extends ReflectionValue<T> {
  constructor(
    protected func: ReflectionFunction,
    value: T,
  ) {
    super(value);
  }

  getFunction(): ReflectionFunction {
    return this.func;
  }
}

export type Context = Record<string, any>;

export class Container {
  constructor(protected context: Context) {}

  call<T>(
    callback: typeof Function,
    context: Context = {},
  ): U extends T ? U : T {
    return callback(...this.getArgs(callback, context));
  }

  getArgs(callback: typeof Function, context: Context = {}): any[] {
    const reflection = reflect(callback);
    const args: Array = [];

    for (const param of reflection.parameters) {
      args.push(this.get(param.name, param.value, context));
    }

    return args;
  }

  get<T>(id: string, defaultValue: T = undefined, context: Context = {}): T {
    context = this.mergeContext(context);
    return this.make(context[id] || defaultValue, context);
  }

  make<T>(value: T, context: Context = {}): U extends T ? U : T {
    return typeof value === "function" || value instanceof Function
      ? this.call(value, context)
      : value;
  }

  mergeContext(context: Context): Context {
    return {
      ...context,
      ...this.context,
    };
  }
}

export default function (context: Context) {
  return new Container(context);
}
