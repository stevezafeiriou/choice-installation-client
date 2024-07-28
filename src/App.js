import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GlobalStyle } from "./GlobalStyles";
import Display from "./components/Display";
import Information from "./components/Information";

/*
IMPORTANT: Change Access-Control Policy of LIVE server in order to work. 
*/

const App = () => {
	return (
		<>
			<GlobalStyle />
			<BrowserRouter>
				<ToastContainer
					toastClassName="custom-toast"
					bodyClassName="custom-toast-container"
					autoClose={3500}
					position="top-right"
				/>
				<Routes>
					<Route path="/" element={<Display />} exact />
					<Route path="/information" element={<Information />} exact />
				</Routes>
			</BrowserRouter>
		</>
	);
};

export default App;
