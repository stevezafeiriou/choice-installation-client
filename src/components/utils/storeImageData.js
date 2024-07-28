import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

const storeImageData = async (
	_imageDataURL,
	_attributes,
	chipId,
	dbEndpoint,
	grid,
	setImageId,
	setIsImagePosted
) => {
	if (
		!_imageDataURL ||
		!Array.isArray(_attributes) ||
		_attributes.length === 0 ||
		!Array.isArray(grid) ||
		grid.length === 0
	) {
		// Check attributes and grid length
		console.error(
			"Image data URL, attributes, or grid are empty or undefined."
		);
		return;
	}

	const id = uuidv4();
	const description =
		"The collection of interactive artworks emphasizes the importance of cognitive, emotional, social, and cultural factors in shaping human behavior. In the work 'Choice', the correlations between small, consistent actions and significant life outcomes are examined, delving into the evolutionary and artistic dimensions of human behavior.";
	const name = `Choice ${id.substring(0, 5)}`;
	const artist = "Steve Zafeiriou";

	const accelerationTrait = _attributes.find(
		(attr) => attr.trait_type === "Acceleration"
	);
	const acceleration = accelerationTrait ? accelerationTrait.value : null;

	const imageData = {
		id,
		description,
		image: _imageDataURL,
		name,
		artist,
		attributes: _attributes,
		chip_id: chipId,
		grid: grid,
	};

	const imageDataForLocalStorage = {
		id,
		description,
		image: _imageDataURL,
		name,
		chip_id: chipId,
		acceleration,
	};

	toast.promise(
		new Promise(async (resolve, reject) => {
			try {
				const response = await fetch(`${dbEndpoint}/choice/v1/image-data/`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(imageData),
				});

				if (!response.ok) {
					throw new Error("Failed to store image data on the server");
				}

				const result = await response.json();
				console.log(result);

				setImageId(id);
				setIsImagePosted(true);
				resolve(result);

				clearPreviousLocalStorage();

				localStorage.setItem(
					`imageData_${id}`,
					JSON.stringify(imageDataForLocalStorage)
				);
			} catch (error) {
				console.error("Error storing image data:", error);
				setIsImagePosted(false); // Ensure that isImagePosted is set to false in case of an error
				reject(error);
			}
		}),
		{
			pending: "Saving to Database",
		},
		{
			toastId: "Saving to Database",
		}
	);
};

const clearPreviousLocalStorage = () => {
	const subscribed = localStorage.getItem("subscribed");
	const validatedIds = localStorage.getItem("validatedIds");

	localStorage.clear();

	if (subscribed) {
		localStorage.setItem("subscribed", subscribed);
	}
	if (validatedIds) {
		localStorage.setItem("validatedIds", validatedIds);
	}
};

export default storeImageData;
