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

    /* Custom styles for react-toastify toasts */
    .custom-toast-container {
        font-family: 'Inter', sans-serif;
        font-size: 0.758rem;
        color: #fff; /* White font color */
    }

    .custom-toast {
        background-color: #171717;
        border: 1px solid #2b2e2c;
        backdrop-filter: blur(10px);
      
        box-shadow: 0 0 40px rgba(255, 255, 255, 0.13);
        color: #fff; /* White font color */
        padding: 10px;
        border-radius: 0;
    }
`;
