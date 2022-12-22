import React from 'react'
import './loading.css'
import logo from '../assets/logo.png'
const Loading = () => {
    return (
        <div className='loading-container'>
            <div className='loading_text-container'>
                <h1 className='laoding_logo'>FX3</h1>
                <p className='loading_text-container_loading'>Loading...</p>
                <img alt='' src={logo} className="loading_logo"/>
            </div>
        </div>
    )
}

export default Loading