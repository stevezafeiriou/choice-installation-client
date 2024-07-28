import React, { useState, useEffect, useRef } from "react";
import { getDominantColor } from "../getDominantColor";
import {
	GalleryContainer,
	GalleryGrid,
	ImageWrapper,
	ImageElement,
	InfoOverlay,
	InfoTextContainer,
	InfoText,
} from "./InformationElements";
import { dbEndpoint } from "../config";
import localData from "./safetyDb"; // Import local fallback data

const Information = () => {
	const [images, setImages] = useState(localData); // Initialize with local data
	const [dominantColors, setDominantColors] = useState({});
	const galleryRef = useRef(null);

	const fetchImages = async () => {
		try {
			const response = await fetch(`${dbEndpoint}/choice/v1/image-data`);

			if (!response.ok) throw new Error("Network response was not ok");
			const data = await response.json();

			// Save the latest 20 items to local storage
			const latestImages = data.slice(0, 20);
			localStorage.setItem("images", JSON.stringify(latestImages));

			setImages(latestImages);
			await getDominantColors(latestImages);
		} catch (error) {
			console.error("Error fetching images:", error);
			// Use local fallback data
			const localImages =
				JSON.parse(localStorage.getItem("images")) || localData;
			setImages(localImages);
			await getDominantColors(localImages);
		}
	};

	const getDominantColors = async (imageData) => {
		const colors = {};
		const promises = imageData.map(
			(image) =>
				new Promise((resolve) => {
					getDominantColor(image.image, (color) => {
						colors[image.id] = color;
						resolve();
					});
				})
		);
		await Promise.all(promises);
		setDominantColors(colors);
	};

	useEffect(() => {
		fetchImages();
		const interval = setInterval(fetchImages, 3 * 60 * 1000); // Fetch every 3 minutes

		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		const interval = setInterval(() => {
			if (galleryRef.current) {
				galleryRef.current.scrollBy(0, -1);
				if (galleryRef.current.scrollTop === 0) {
					const firstImage = galleryRef.current.children[0];
					galleryRef.current.appendChild(firstImage);
					galleryRef.current.scrollTop = galleryRef.current.scrollHeight / 2;
				}
			}
		}, 20);

		return () => clearInterval(interval);
	}, [images]);

	return (
		<GalleryContainer ref={galleryRef}>
			<GalleryGrid>
				{images.map((image) => {
					const dominantColor = dominantColors[image.id] || [0, 0, 0];
					const textColor =
						dominantColor.reduce((acc, color) => acc + color, 0) > 382
							? "black"
							: "white";

					return (
						<ImageWrapper key={image.id}>
							<ImageElement src={image.image} alt={image.name} />
							<InfoOverlay>
								<InfoTextContainer textcolor={textColor}>
									<InfoText> {image.name}</InfoText>
									<InfoText> {image.time_since_creation} ago</InfoText>
									<InfoText>
										{image.validated === "0" ? "Not Validated" : "Validated"}
									</InfoText>
								</InfoTextContainer>
							</InfoOverlay>
						</ImageWrapper>
					);
				})}
			</GalleryGrid>
		</GalleryContainer>
	);
};

export default Information;
