function flattenArray(arr) {
	let flatArray = [];
	while (arr.length > 0) {
		let element = arr.shift();
		if (Array.isArray(element)) {
			let flatSubarray = flattenArray(element);
			// We can work with a single depth array element
			// it gets tricky when we have arrays in arrays in arrays etc
			flatArray = flatArray.concat(flatSubarray);
		} else {
			flatArray.push(element);
		}
	}
	return flatArray;
}