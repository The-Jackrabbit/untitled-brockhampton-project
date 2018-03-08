/* 
The question description is a bit vague,
it could also be interpreted as some form of hashing
a string to a float value.  I interpreted it as 
converting a number like str to its float value, and casting all
number non-like strings to 0.
*/

function weeblyFloat(str) {
	// Catch case where string isn't number like or where str === "0"	
	// Technically this uses a full Number() just for the zero case,
	// but the method below it also works for 0.
	if (str.length == 0 || Number(str) === 0) {
		return 0;
	}
	
	let val = 0;
	let decimalLength = 0;
	let isPostDecimal = 0;
	let isNegative = (str[0] === "-") ? 1 : 0;
	// If isNegative, that means we should analyze all but the last char
	for (let i = str.length - 1 ; i >= isNegative; i--) {
		if (str[i] === ".") {
			isPostDecimal = 1;
			decimalLength = str.length - i - 1;
		}
		else {
			val += Number(str[i])*Math.pow(10, str.length - i - isPostDecimal - 1);	
		}
	}
	isNegative = (isNegative === 1) ? -1 : 1;
	return isNegative*(val/Math.pow(10, decimalLength));
}