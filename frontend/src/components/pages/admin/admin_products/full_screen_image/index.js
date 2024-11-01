import React from 'react';
import '../full_screen_image/style.css';
import { IoCloseOutline } from "react-icons/io5";

const DisplayFullScreenImage = ({
    imgUrl,
    onClose
}) => {
  return (
    <div className='displayImgWrapper'>
        <div className='displayImg'>
            <img src={imgUrl} className='fullScreen'/>
            <IoCloseOutline onClick={onClose}/>
        </div>
    </div>
  )
}

export default DisplayFullScreenImage