import React, { useEffect, useState, useRef } from "react";
import { dbEndpoint } from "../config";
import {
	GridContainer,
	GridWrapper,
	GridCell,
	WordContainer,
	NoDataContainer,
} from "./DisplayElements";
import TextInfo from "./TextInfo";
import useSocket from "../utils/useSocket";
import calculateMajorityColor from "../utils/calculateMajorityColor";
import captureScreen from "../utils/captureScreen"; // Ensure this import is correct
import storeImageData from "../utils/storeImageData";

const Display = () => {
	const [grid, setGrid] = useState([]);
	const [gridAcceleration, setGridAcceleration] = useState(null);
	const [word, setWord] = useState(null);
	const [wordColor, setWordColor] = useState(null);
	const [majorityColor, setMajorityColor] = useState("#000000");
	const gridRef = useRef(null);
	const [attributes, setAttributes] = useState([]);
	const [imageDataURL, setImageDataURL] = useState(null);
	const [imageId, setImageId] = useState(null);
	const [loading, setLoading] = useState(false);
	const [chipId, setChipId] = useState("6c36c227843c");
	const [isImagePosted, setIsImagePosted] = useState(false);

	useSocket(
		setLoading,
		setGrid,
		setGridAcceleration,
		setWord,
		setWordColor,
		setAttributes,
		setChipId,
		() => captureScreen(gridRef, majorityColor, setImageDataURL)
	);

	useEffect(() => {
		if (imageDataURL && Array.isArray(attributes) && attributes.length > 0) {
			storeImageData(
				imageDataURL,
				attributes,
				chipId,
				dbEndpoint,
				grid,
				setImageId,
				setIsImagePosted
			);
		}
	}, [imageDataURL, attributes, chipId, dbEndpoint, grid]);

	useEffect(() => {
		if (grid.length > 0) {
			const majorityColor = calculateMajorityColor(grid);
			setMajorityColor(majorityColor);
		}
	}, [grid]);

	return (
		<>
			<TextInfo
				gridAcceleration={gridAcceleration}
				id={loading ? null : imageId}
				chipId={chipId}
				bgcolor={majorityColor}
				isImagePosted={isImagePosted}
				word={word}
			/>
			{loading ? (
				<NoDataContainer bgcolor={majorityColor}>
					<p>Generating...</p>
				</NoDataContainer>
			) : (
				<GridContainer ref={gridRef} bgcolor={majorityColor}>
					{grid.length === 0 && !word ? (
						<NoDataContainer bgcolor={majorityColor}>
							<h2>Interaction Required.</h2>
							<p>
								Please move the device with a double up / down motion to
								initiate recording of acceleration.
							</p>
						</NoDataContainer>
					) : word ? (
						<WordContainer
							bgcolor={majorityColor}
							color={convertColorCodeToHex(wordColor)}
						>
							<p>{word}</p>
						</WordContainer>
					) : (
						<GridWrapper bgcolor={majorityColor}>
							{grid.map((color, index) => (
								<GridCell key={index} color={color} />
							))}
						</GridWrapper>
					)}
				</GridContainer>
			)}
		</>
	);
};

export default Display;

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
			return `#${colorCode}`;
	}
};
