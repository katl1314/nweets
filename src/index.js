import React from "react";
import ReactDOM from "react-dom/client";
import App from "components/App";
import { Reset } from "styled-reset";
import "styles.css"; // style import


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <>
        <Reset/>
        <App />
    </>
);
