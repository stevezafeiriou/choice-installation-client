import React from "react";
import QRCode from "react-qr-code";
import { Link } from "react-router-dom";
import { appDomain } from "../config";

const QRCodeComponent = ({ id }) => {
	const qrCodeValue = `${appDomain}/finder?id=${id}`;

	return (
		<>
			{id !== null ? (
				<Link to={qrCodeValue}>
					<QRCode value={qrCodeValue} size={140} />
				</Link>
			) : null}
		</>
	);
};

export default QRCodeComponent;
