declare const meta: unique symbol;
export default class Fill<F extends (...args: any) => void | Promise<void>, A extends Parameters<F>> {
    #private;
    constructor(blueprint: F, ...args: A);
    get blueprint(): F;
    get args(): A;
    init(): Promise<any>;
    static fill(object: object): Promise<{
        [k: string]: any;
        [meta]?: any;
    } & object>;
    static unfill(object: object): Promise<{} & object>;
    static populate(object: object): Promise<void>;
    static unpopulate(object: object): Promise<void>;
}
export {};
