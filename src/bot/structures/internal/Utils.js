export const bindObject = moduleExports.bindObject;
const moduleExports = {
    /**
     * Binds all functions in an object.
     * @param {{ ...any }} obj Object to bind to.
     * @param {{ ...any }} that Context to bind with.
     * @returns {{ ...any }}
     */
    bindObject(obj, that) {
        return Object.keys(obj).reduce((acc, key) => {
            switch (typeof obj[key]) {
                case "object":
                    // eslint
                    return {
                        ...acc,
                        [key]: this.recursiveBind(obj[key], that),
                    };
                case "function":
                    return { ...acc, [key]: obj[key].bind(that) };
            }
            return { ...acc, [key]: obj[key] };
        }, {});
    }
};
export default moduleExports;
