// src/utils/calculateMajorityColor.js

const calculateMajorityColor = (gridData) => {
	let colorCount = {};
	gridData.forEach((color) => {
		if (colorCount[color]) {
			colorCount[color]++;
		} else {
			colorCount[color] = 1;
		}
	});

	// console.log("Color Count:", colorCount); // Debugging line

	let maxCount = 0;
	let majorityColor = "#000000";
	Object.keys(colorCount).forEach((color) => {
		if (colorCount[color] > maxCount) {
			maxCount = colorCount[color];
			majorityColor = color;
		}
	});

	// console.log("Majority Color:", majorityColor); // Debugging line

	return majorityColor;
};

export default calculateMajorityColor;
