import React from "react";
import QRCodeComponent from "./QRCodeComponent";
import { TextInfoWrapper } from "./DisplayElements";

const TextInfo = ({
	gridAcceleration,
	id,
	bgcolor,
	chipId,
	isImagePosted,
	word,
}) => {
	return (
		<TextInfoWrapper bgcolor={bgcolor}>
			<h2>Our Behaviour Shapes Our Reality.</h2>
			<p>
				<span>Title:</span> Choice
			</p>
			<p>
				<span>Artist:</span> Steve Zafeiriou
			</p>
			<p>
				<span>Unique / Edition:</span> AP
			</p>

			<p>
				<span>Version:</span> 1.0.1
			</p>

			{gridAcceleration !== null ? (
				<>
					<p>
						<br />
						<span>Acceleration:</span> {gridAcceleration}
					</p>
					<p>
						<br />
						<span>ChipID:</span> {chipId}
					</p>
				</>
			) : null}
			{isImagePosted && id && word === null ? (
				<div className="qr-code">
					<br />
					<QRCodeComponent id={id} />
					<br />
					<br />
					<p>Scan the QR code to save the image.</p>
				</div>
			) : null}
		</TextInfoWrapper>
	);
};

export default TextInfo;
