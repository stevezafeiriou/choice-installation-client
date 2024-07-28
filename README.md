# Choice Installation Application (React.js App)

## Table of Contents

- [Introduction](#introduction)
- [Installation](#installation)
- [Usage](#usage)
- [Components](#components)
  - [App](#app)
  - [Display](#display)
  - [QRCodeComponent](#qrcodecomponent)
  - [TextInfo](#textinfo)
  - [Information](#information)
  - [getDominantColor](#getdominantcolor)
- [Global Styles](#global-styles)
- [Configuration](#configuration)
- [Licensing](#licensing)

## Introduction

The Choice Installation Application is a React.js app that interacts with a backend server to display generative artworks created by the connected "Choice" interactive sculpture (ESP32-S3 microcontroller). It connects to a socket server to receive real-time updates of pixel art and acceleration data, stores the data, and provides QR codes for saving and validating the artworks. This application also includes an information display for showcasing a gallery of previously generated artworks.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/saphirelabs/choice-installation-client.git
   cd choice-installation-client
   ```

2. Install the necessary dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory of your project and add the following environment variables:

   ```env
   BROWSER=none
   REACT_APP_LOCAL_IP=
   REACT_APP_API_ENDPOINT=
   REACT_APP_APP_DOMAIN=
   ```

   These environment variables define the base URLs for the backend API. Ensure these are correctly set to avoid exposing sensitive data.

4. Build the React app:
   ```bash
   npm run build
   ```

## Usage

To run the app in development mode, use:

```bash
npm start
```

To view the app in production, upload the built files to your server and navigate to `https://your-app-domain.com`.

## Components

### App

The main component that sets up the router and includes global styles.

#### Code

```javascript
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GlobalStyle } from "./GlobalStyles";
import Display from "./components/Display";
import Information from "./components/Information";

const App = () => {
	return (
		<>
			<GlobalStyle />
			<BrowserRouter>
				<ToastContainer />
				<Routes>
					<Route path="/" element={<Display />} exact />
					<Route path="/information" element={<Information />} exact />
				</Routes>
			</BrowserRouter>
		</>
	);
};

export default App;
```

### Display

Connects to the socket server to receive generative art data, handles the data, captures the screen as an image, and stores it.

#### Key Features

- Connects to a socket server.
- Receives and processes generative art data.
- Captures the screen as an image.
- Stores image data and attributes.

### QRCodeComponent

Generates a QR code for a given ID, allowing users to save or validate images.

#### Key Features

- Generates a QR code.
- Links to the app domain with the provided ID.

### TextInfo

Displays information about the current artwork, including title, artist, version, acceleration, chip ID, and a QR code for saving the image.

#### Key Features

- Displays artwork information.
- Generates a QR code for saving the image.

### Information

Fetches and displays a gallery of previously generated artworks, updating every 3 minutes.

#### Key Features

- Fetches artwork data from the backend.
- Displays artwork in a scrollable gallery.
- Extracts and displays dominant colors of images.

### getDominantColor

Utility function to extract the dominant color from an image.

#### Key Features

- Analyzes image data to determine the dominant color.

## Global Styles

Global styles for the application, ensuring a consistent look and feel.

#### Code

```javascript
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    html, body {
        font-size: 1rem;
        font-family: 'Inter', sans-serif;
    }
`;
```

By following this documentation, you should be able to set up, run, and deploy the Choice Installation Application effectively. For any issues or further information, please contact the project maintainers.

## Licensing

© 2024 Saphire. All rights reserved.

This application, including its source code and all associated documentation, is proprietary and confidential to Saphire. Unauthorized copying, modification, distribution, or use of this software is strictly prohibited. No part of this software may be reproduced in any form or by any means without the prior written permission of Saphire. For inquiries regarding licensing, please contact info@saphirelabs.com.

For more details, please read the full [License Agreement](./LICENSE).
