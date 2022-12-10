import React, { Suspense } from "react";
import ReactDOM from "react-dom/client"
import App from './App'
import './assets/fonts/fonts.css'
import Loading from "./components/Loading";
import './Gloabl.css'

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Suspense fallback={<Loading/>}> 
            <App />
        </Suspense>
    </React.StrictMode>
)