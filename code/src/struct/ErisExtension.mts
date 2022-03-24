import { ObjectKeys, ErisExports } from "#types";

export interface DefinePropertyOptions {
	enumerable?: boolean;
	configurable?: boolean;
	writable?: boolean;
	get?: boolean;
}

export interface DefineOptions {
	[x: string]: DefinePropertyOptions;
}

function define<T extends ErisExportsKeys>(
	props: { [x: ObjectKeys]: any } & ThisType<ErisExports[T]>,
	options: DefineOptions = {},
): void {
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

export type ErisExportsKeys = keyof ErisExports;
export type ErisExtensionExtender<T, StructKey extends ErisExportsKeys> = (
	this: T,
	struct: { Structure: ErisExports[StructKey]; define: typeof define },
) => any;

export class ErisExtension<T extends ErisExportsKeys> {
	public extend!: ErisExtensionExtender<this, T>;
	public define!: typeof define;
	public promise: Promise<void>;

	public constructor(
		public name: ErisExportsKeys,
		extend: ErisExtension<T>["extend"],
	) {
		this.promise = this.defineProps(extend);
	}
	private defineProps(extend: ErisExtensionExtender<this, T>): Promise<void> {
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
