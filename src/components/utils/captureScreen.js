// src/utils/captureScreen.js
import html2canvas from "html2canvas";
import { getDominantColor } from "./getDominantColor";

const captureScreen = (gridRef, majorityColor, setImageDataURL) => {
	if (gridRef.current) {
		const gridWidth = gridRef.current.offsetWidth;
		const gridHeight = gridRef.current.offsetHeight;

		const canvasWidth = 1080;
		const canvasHeight = 1080;
		const canvas = document.createElement("canvas");
		canvas.width = canvasWidth;
		canvas.height = canvasHeight;
		const ctx = canvas.getContext("2d");

		html2canvas(gridRef.current, {
			useCORS: true,
			allowTaint: true,
			scale: 1,
			logging: true,
			backgroundColor: null,
		})
			.then((gridCanvas) => {
				// Draw the grid onto the canvas
				const x = (canvasWidth - gridWidth) / 2;
				const y = (canvasHeight - gridHeight) / 2;
				ctx.drawImage(gridCanvas, x, y);

				// Get the data URL of the captured image
				const capturedImageDataURL = canvas.toDataURL();

				// Use getDominantColor to find the dominant color from the captured image
				getDominantColor(capturedImageDataURL, (dominantColor) => {
					const [r, g, b] = dominantColor;
					const dominantColorHex = `rgb(${r},${g},${b})`;

					// Fill the entire canvas with the dominant color
					ctx.fillStyle = dominantColorHex;
					ctx.fillRect(0, 0, canvasWidth, canvasHeight);

					// Draw the grid onto the canvas again, centered
					ctx.drawImage(gridCanvas, x, y);

					// Get the final data URL with the correct background color
					const finalImageDataURL = canvas.toDataURL();
					setImageDataURL(finalImageDataURL);
				});
			})
			.catch((error) => {
				console.error("Failed to capture grid container:", error);
			});
	}
};

export default captureScreen;
