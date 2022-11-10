import React from "react"
import { BrowserRouter } from "react-router-dom"
import { AuthProvider } from './contexts/AuthContext'
import AllRoutes from "./Routes"

const App = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <AllRoutes />
            </AuthProvider>
        </BrowserRouter>
    )
}

export default App