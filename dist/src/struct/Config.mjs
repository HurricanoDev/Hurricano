export class Config {
    usesEnv = false;
    constructor(options) {
        if (options) {
            this.usesEnv = false;
            Object.assign(this, options);
        }
    }
    fillInEnvironmentalVariables() {
        Object.assign(this, JSON.parse(process.env.CONFIG));
        this.isModified = true;
        this.usesEnv = true;
    }
}
