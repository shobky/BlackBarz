import React, { Suspense } from "react";
import ReactDOM from "react-dom/client"
import App from './App'
import './assets/fonts/fonts.css'
import './Gloabl.css'

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Suspense>
            <App />
        </Suspense>
    </React.StrictMode>
)