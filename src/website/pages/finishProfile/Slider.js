import React from 'react'
import './finishProfile.css'

const Slider = () => {
    var rangeSlider = document.getElementById("rs-range-line");
    var rangeBullet = document.getElementById("rs-bullet");
    
    rangeSlider.addEventListener("input", showSliderValue, false);
    
    function showSliderValue() {
      rangeBullet.innerHTML = rangeSlider.value;
      var bulletPosition = (rangeSlider.value /rangeSlider.max);
      rangeBullet.style.left = (bulletPosition * 578) + "px";
    }
    
    return (
        <div>
            <div class="range-slider">
                <span id="rs-bullet" class="rs-label">0</span>
                <input id="rs-range-line" class="rs-range" type="range" value="0" min="0" max="200" />
            </div>
            <div class="box-minmax">
                <span>0</span><span>200</span>
            </div>
        </div>
    )
}

export default Slider