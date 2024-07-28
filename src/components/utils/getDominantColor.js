// src/utils/getDominantColor.js
export const getDominantColor = (imageSrc, callback) => {
	const img = new Image();
	img.crossOrigin = "Anonymous"; // Handle cross-origin images
	img.src = imageSrc;

	img.onload = () => {
		const canvas = document.createElement("canvas");
		const ctx = canvas.getContext("2d");

		// Set canvas dimensions to match image size
		canvas.width = img.width;
		canvas.height = img.height;

		// Draw the image onto the canvas
		ctx.drawImage(img, 0, 0);

		// Extract image data
		const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
		const data = imageData.data;

		// Count occurrences of each color
		const colorCounts = {};
		let dominantColor = [0, 0, 0];
		let maxCount = 0;

		for (let i = 0; i < data.length; i += 4) {
			const r = data[i];
			const g = data[i + 1];
			const b = data[i + 2];
			const rgb = `${r},${g},${b}`;

			colorCounts[rgb] = (colorCounts[rgb] || 0) + 1;

			if (colorCounts[rgb] > maxCount) {
				maxCount = colorCounts[rgb];
				dominantColor = [r, g, b];
			}
		}

		callback(dominantColor);
	};

	img.onerror = (error) => {
		console.error("Error loading image:", error);
		callback([0, 0, 0]); // Return a default color in case of an error
	};
};
