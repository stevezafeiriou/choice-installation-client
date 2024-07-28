import styled from "styled-components";

export const GalleryContainer = styled.div`
	width: 100vw;
	height: 100vh;
	overflow: hidden;
	position: relative;
	background: black; /* Set background to black */
`;

export const GalleryGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(
		auto-fill,
		minmax(300px, 1fr)
	); /* Responsive columns with a minimum size */
	grid-auto-rows: minmax(
		300px,
		1fr
	); /* Responsive row height with a minimum size */
	gap: 0;
	width: 100%;
	height: 100%;
`;

export const ImageWrapper = styled.div`
	position: relative;
	width: 100%;
	height: 100%;
`;

export const ImageElement = styled.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
`;

export const InfoOverlay = styled.div`
	position: absolute;
	bottom: 20px;
	right: 40px;
	width: 100%;
	height: 100%;
	padding: 10px;
	box-sizing: border-box;
	display: flex;
	justify-content: flex-end;
	align-items: flex-end;
`;

export const InfoTextContainer = styled.div`
	color: ${(props) => props.textcolor}; /* Use dynamic text color */
	width: 100%;
	font-size: 0.7rem;
	line-height: 1.1;
	text-align: right;
	margin: 10px;
`;

export const InfoText = styled.div`
	text-transform: lowercase;
`;
