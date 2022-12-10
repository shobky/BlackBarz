import React from 'react'
import './loading.css'
const Loading = () => {
    return (
        <div className='loading-container'>
            <div className='loading_text-container'>
                <h1 className='laoding_logo'>FX3</h1>
                <p className='loading_text-container_loading'>Loading...</p>
            </div>
            <p className='loading_bg-txt'>FIT. FIGHT. FLOW.</p>
        </div>
    )
}

export default Loading