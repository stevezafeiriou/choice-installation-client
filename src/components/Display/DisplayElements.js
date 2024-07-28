import styled from "styled-components";

// Display Elements

// Reduced cell dimensions
const cellWidth = 20; // Decrease the width of each cell
const cellHeight = 20; // Decrease the height of each cell

export const GridContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100vh;
	background-color: ${(props) => `${props.bgcolor}`};
	overflow: hidden;
`;

export const GridWrapper = styled.div`
	width: 160px;
	height: 85px;
	display: grid;
	grid-template-columns: repeat(
		8,
		${cellWidth}px
	); /* Adjust number of columns */
	grid-template-rows: repeat(5, ${cellHeight}px); /* Adjust number of rows */
	justify-content: center; /* Center the grid horizontally */
	align-items: center; /* Center the grid vertically */
`;

export const GridCell = styled.div`
	width: ${cellWidth}px;
	height: ${cellHeight}px;
	background-color: ${(props) => `${props.color}`};

	/* Adjust the size of the image inside each cell */
	img {
		max-width: 100%; /* Ensure image does not exceed cell width */
		max-height: 100%; /* Ensure image does not exceed cell height */
		object-fit: contain; /* Maintain aspect ratio while fitting the image */
	}
`;

export const WordContainer = styled.div`
	font-size: 16px;
	font-weight: bold;
	text-align: center;
	margin-top: 20px;
	background-color: transparent;
	p {
		font-size: 1.6rem;
		font-weight: 300;
		color: ${(props) => props.color};
	}
`;

export const NoDataContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100vh;
	background-color: ${(props) => props.bgcolor};
	color: ${(props) => (props.bgcolor === "#000000" ? "#ffffff" : "#000000")};

	h2 {
		font-weight: 600;

		margin: 5px;
		max-width: 300px;
		text-align: center;
		font-size: 1rem;
	}

	p {
		margin: 5px;
		max-width: 300px;
		text-align: center;
		font-size: 0.785rem;
	}
`;

// TextInfo Elements
export const TextInfoWrapper = styled.div`
	position: absolute;
	bottom: 20px;
	right: 20px;
	text-align: justify;
	color: ${(props) => (props.bgcolor === "#000000" ? "#ffffff" : "#000000")};
	background-color: ${(props) => props.bgcolor};
	padding: 20px;
	margin: 10px;
	border-radius: 12px;
	z-index: 999;

	h2 {
		font-size: 1rem;
		margin-bottom: 12px;
		font-weight: 600;
		max-width: 140px;
	}
	p {
		font-size: 0.785rem;
		max-width: 140px;

		span {
			font-weight: 600;
			font-size: 0.785rem;
		}
	}

	.qr-code {
		p {
			font-size: 0.685rem;
			max-width: 140px;
		}
	}

	@media screen and (max-width: 768px) {
		bottom: 10px;
		right: 10px;
		padding: 10px;
		margin: 5px;

		h2 {
			font-size: 0.758rem;
		}
		p {
			font-size: 0.685rem;
		}
	}
`;
