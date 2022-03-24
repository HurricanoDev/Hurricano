function define(props, options = {}) {
    for (const key of Object.keys(props)) {
        if (options[key]) {
            const option = options[key];
            if (option.get)
                option.get = props[key];
            Object.defineProperty(eval("this"), key, option);
        }
        else
            eval("this")[key] = props[key]; // to get typescript off my back, the function is meant to be bound
    }
}
export class ErisExtension {
    name;
    extend;
    define;
    promise;
    constructor(name, extend) {
        this.name = name;
        this.promise = this.defineProps(extend);
    }
    defineProps(extend) {
        return new Promise(async (resolve) => {
            const { name } = this;
            const BaseStructure = (await import("eris"))[name];
            this.define = define.bind(BaseStructure);
            this.extend = () => extend.call(this, {
                define: this.define,
                Structure: BaseStructure,
            });
            resolve();
        });
    }
}
