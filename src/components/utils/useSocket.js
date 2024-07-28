// src/hooks/useSocket.js
import { useEffect } from "react";
import io from "socket.io-client";
import { localIp } from "../config";

const socket = io(`http://${localIp}:4000`);

const useSocket = (
	setLoading,
	setGrid,
	setGridAcceleration,
	setWord,
	setWordColor,
	setAttributes,
	setChipId,
	captureScreen
) => {
	useEffect(() => {
		socket.on("pixel-art", (data) => {
			if (data.loading === true) {
				setLoading(true);
			} else if (data.loading === false) {
				setLoading(false);
			}

			if (data.word && data.color) {
				setWord(data.word);
				setWordColor(data.color);
				setGrid([]);
				setGridAcceleration(null);
				setAttributes([]);
				setChipId(data.chip_id);
			} else if (data.grid) {
				const convertedGrid = data.grid.slice(0, 40).map(convertColorCodeToHex);
				setGrid(convertedGrid);
				setGridAcceleration(data.acceleration);
				setWord(null);
				setChipId(data.chip_id);

				let colorCounter = {};
				convertedGrid.forEach((color) => {
					if (colorCounter[color]) {
						colorCounter[color]++;
					} else {
						colorCounter[color] = 1;
					}
				});

				// Create attributes for each color
				const colorAttributes = Object.keys(colorCounter).map((color) => ({
					trait_type: `Color ${color}`,
					value: colorCounter[color],
				}));

				const newAttributes = [
					{
						trait_type: "Acceleration",
						value: data.acceleration,
					},
					{
						trait_type: "Created By",
						value: data.chip_id,
					},
					...colorAttributes,
				];

				setAttributes(newAttributes);

				setTimeout(() => {
					if (data.grid.length > 0) {
						captureScreen();
					}
				}, 500);
			}
		});

		return () => {
			socket.off("pixel-art");
		};
	}, [
		setLoading,
		setGrid,
		setGridAcceleration,
		setWord,
		setWordColor,
		setAttributes,
		setChipId,
		captureScreen,
	]);
};

// Function to convert color codes to hex
const convertColorCodeToHex = (colorCode) => {
	switch (colorCode) {
		case "da73":
			return "#dc4c99";
		case "dd09":
			return "#dca24c";
		case "4eeb":
			return "#4cdc58";
		case "4a9b":
			return "#4c51dc";
		case "ffff":
			return "#ffffff";
		case "0":
			return "#000000";
		default:
			return "#000000";
	}
};

export default useSocket;
