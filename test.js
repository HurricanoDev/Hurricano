const _ = require("lodash");

function recursiveShallowClone(obj1, obj2) {
	for (const key of Object.getOwnPropertyNames(obj2)) {
		if (_.isObject(obj2[key]) && obj1[key]) recursiveShallowClone(obj1[key] ?? obj1, obj2[key]);
		else Object.defineProperty(obj1, key, Object.getOwnPropertyDescriptor(obj2, key));
	}

	return obj1;
}

const obj1 = { String },
	obj2 = {};

Object.defineProperty(obj2, "Object", {
	get() {
		return this.String;
	},
});

console.log(recursiveShallowClone(obj1, obj2));

console.log(obj1, obj1.Object);
