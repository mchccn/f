(function() {
    const meta = Symbol("internal");

    globalThis.Fill = class Fill {
        #blueprint;
        #args;

        constructor(blueprint, ...args) {
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
                return new this.#blueprint(...args);
            }
        }

        static async fill(object) {
            const out = Object.assign({}, object);

            Object.defineProperty(out, meta, {
                configurable: false,
                enumerable: false,
                value: {},
            });

            await Promise.all(Reflect.ownKeys(out).map(async (k) => {
                if (out[k] instanceof Fill) {
                    out[meta][k] = [out[k].blueprint, out[k].args];

                    out[k] = await out[k].init();
                }

                if (typeof out[k] === "object" && out[k]) out[k] = Fill.fill(out[k]);
            }));

            return out;
        }

        static async unfill(object) {
            if (!object[meta]) throw new Error("Unable to restore object because it was never filled.");

            const out = Object.assign({}, object);

            await Promise.all(Reflect.ownKeys(out[meta]).map(async (k) => {
                out[k] = new Fill(out[meta][k][0], ...out[meta][k][1]);

                if (!(out[k] instanceof Fill) && typeof out[k] === "object" && out[k]) out[k] = Fill.unfill(out[k]);
            }));

            return out;
        }

        static async populate(object) {
            Object.defineProperty(object, meta, {
                configurable: false,
                enumerable: false,
                value: {},
            });

            await Promise.all(Reflect.ownKeys(object).map(async (k) => {
                if (object[k] instanceof Fill) {
                    object[meta][k] = [object[k].blueprint, object[k].args];

                    object[k] = await object[k].init();
                }

                if (typeof object[k] === "object" && object[k]) Fill.populate(object[k]);
            }));

            return;
        }

        static async unpopulate(object) {
            if (!Reflect.defineProperty(object, meta)) throw new Error("Unable to restore object because it was never filled.");

            await Promise.all(Reflect.ownKeys(object).map(async (k) => {
                if (object[k] instanceof Fill) {
                    object[meta][k] = [object[k].blueprint, object[k].args];

                    object[k] = await object[k].init();
                }

                if (typeof object[k] === "object" && object[k]) Fill.populate(object[k]);
            }));

            return;
        }
    }
})();
