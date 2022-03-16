import { valueof } from "src/types/index.mjs";

export interface DefinePropertyOptions {
	enumerable?: boolean;
	configurable?: boolean;
	writable?: boolean;
	get?: boolean;
}

export interface DefineOptions {
	[x: string]: DefinePropertyOptions;
}

function define(props: { [x: string]: any }, options: DefineOptions = {}) {
	for (const key of Object.keys(props)) {
		if (options[key]) {
			const option = options[key] as DefinePropertyOptions & {
				get?: () => any;
			};

			if (option.get) option.get = props[key];

			Object.defineProperty(eval("this"), key, option);
		} else eval("this")[key] = props[key]; // to get typescript off my back, the function is meant to be bound
	}
}

export type ErisExports = typeof import("eris");
export type ErisExportsKeys = keyof ErisExports;
export type ErisExtensionExtender<T> = (
	this: T,
	struct: { Structure: valueof<ErisExports>; define: typeof define },
) => any;

export class ErisExtension<T extends ErisExportsKeys> {
	public extend!: ErisExtensionExtender<this>;
	public define!: typeof define;
	private promise: Promise<void>;

	public constructor(
		public name: ErisExportsKeys,
		extend: ErisExtension<T>["extend"],
	) {
		this.promise = this.defineProps(extend);
	}
	private defineProps(extend: ErisExtensionExtender<this>): Promise<void> {
		return new Promise(async (resolve) => {
			const { name } = this;

			const BaseStructure = (await import("eris"))[
				name
			] as ErisExports[T];

			this.define = define.bind(BaseStructure);

			this.extend = () =>
				extend.call(this, {
					define: this.define,
					Structure: BaseStructure,
				});

			resolve();
		});
	}
}
