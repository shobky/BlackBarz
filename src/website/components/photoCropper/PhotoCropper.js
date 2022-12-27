import React, { useState, useCallback } from 'react'
import Cropper from 'react-easy-crop'
import { BiCrop } from 'react-icons/bi'
import { getCroppedImg } from './canvasUtils'


const PhotoCropper = ({ imageSrc, croppedImageSetter, croppingStatusSetter }) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels)
    }, [])

    const showCroppedImage = useCallback(async () => {
        try {
            const croppedImage = await getCroppedImg(
                imageSrc,
                croppedAreaPixels,
            )
            console.log('donee', { croppedImage })
            croppedImageSetter(croppedImage)
            croppingStatusSetter(croppingStatusSetter)
        } catch (e) {
            console.error(e)
        }
    }, [imageSrc, croppedAreaPixels, croppedImageSetter, croppingStatusSetter])


    return (
        <div>

            {imageSrc && (
                <React.Fragment>
                    <div>
                        <Cropper
                            image={imageSrc}
                            crop={crop}
                            zoom={zoom}
                            aspect={1}
                            onCropChange={setCrop}
                            onCropComplete={onCropComplete}
                            onZoomChange={setZoom}
                        />
                    </div>
                    <div >
                        <button
                            onClick={showCroppedImage}
                            className="photo-cropper_crop-btn"
                        >
                            <BiCrop/>
                        </button>
                    </div>
                </React.Fragment>
            )}
        </div>
    )
}




export default PhotoCropper;