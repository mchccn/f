const meta = Symbol("internal");

export default class Fill<F extends (...args: any) => void | Promise<void>, A extends Parameters<F>> {
    #blueprint: F;
    #args: A;

    constructor(blueprint: F, ...args: A) {
        //@ts-ignore
        this.#blueprint = blueprint;
        this.#args = args;
    }

    get blueprint() {
        return this.#blueprint;
    }

    get args() {
        return this.#args;
    }

    async init() {
        const args = this.#args.length === 1 && typeof this.#args[0] === "function" ? await this.#args[0]() : this.#args;

        try {
            return this.#blueprint(...args);
        } catch {
            //@ts-ignore
            return new this.#blueprint(...args);
        }
    }

    static async fill(object: object) {
        const out = Object.assign<{ [k: string]: any; [meta]?: any }, object>({}, object);

        Object.defineProperty(out, meta, {
            configurable: false,
            enumerable: false,
            value: {},
        });

        await Promise.all(
            Reflect.ownKeys(out).map(async (k) => {
                if (out[k as string] instanceof Fill) {
                    out[meta][k] = [out[k as string].blueprint, out[k as string].args];

                    out[k as string] = await out[k as string].init();
                }

                if (typeof out[k as string] === "object" && out[k as string]) out[k as string] = Fill.fill(out[k as string]);
            })
        );

        return out;
    }

    static async unfill(object: object) {
        //@ts-ignore
        if (!object[meta]) throw new Error("Unable to restore object because it was never filled.");

        const out = Object.assign({}, object);

        await Promise.all(
            //@ts-ignore
            Reflect.ownKeys(out[meta]).map(async (k) => {
                //@ts-ignore
                out[k as string] = new Fill(out[meta][k][0], ...out[meta][k][1]);

                //@ts-ignore
                if (!(out[k as string] instanceof Fill) && typeof out[k as string] === "object" && out[k as string]) out[k as string] = Fill.unfill(out[k as string]);
            })
        );

        return out;
    }

    static async populate(object: object) {
        Object.defineProperty(object, meta, {
            configurable: false,
            enumerable: false,
            value: {},
        });

        await Promise.all(
            Reflect.ownKeys(object).map(async (k) => {
                //@ts-ignore
                if (object[k as string] instanceof Fill) {
                    //@ts-ignore
                    object[meta][k] = [object[k as string].blueprint, object[k as string].args];

                    //@ts-ignore
                    object[k as string] = await object[k as string].init();
                }

                //@ts-ignore
                if (typeof object[k as string] === "object" && object[k as string]) Fill.populate(object[k as string]);
            })
        );

        return;
    }

    static async unpopulate(object: object) {
        if (!Reflect.deleteProperty(object, meta)) throw new Error("Unable to restore object because it was never filled.");

        await Promise.all(
            Reflect.ownKeys(object).map(async (k) => {
                //@ts-ignore
                if (object[k as string] instanceof Fill) {
                    //@ts-ignore
                    object[meta][k] = [object[k as string].blueprint, object[k as string].args];

                    //@ts-ignore
                    object[k as string] = await object[k as string].init();
                }

                //@ts-ignore
                if (typeof object[k as string] === "object" && object[k as string]) Fill.populate(object[k as string]);
            })
        );

        return;
    }
}
