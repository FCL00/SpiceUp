'use client'
import {useState, useRef } from "react";
import classes from "./ImagePicker.module.css";

import Image from "next/image";
export default function ImagePicker({label, name}){
    
    const [pickedImage, setPickedImage] = useState(null);

    const imageInput = useRef();

    function handleImagePick(){
        imageInput.current.click();
    }

    function handleImageChange(event){
        const file = event.target.files[0];

        // check if there is no file selected by the user
        if(!file){
            return;
        }


        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPickedImage(fileReader.result);
        }
        fileReader.readAsDataURL(file);
    }

    return (
        <>
            <div className={classes.picker}>
                <label htmlFor={name}>{label}</label>
                <div className={classes.controls}>
                    <div className={classes.preview}>
                        {!pickedImage && <p>No image is selected</p>}
                        {pickedImage && <Image src={pickedImage} alt="the image selected by user" fill/>}
                    </div>
                    <input 
                        className={classes.input} 
                        type="file" 
                        id={name} 
                        name={name} 
                        accept="image/png, image/jpeg"
                        ref={imageInput}
                        onChange={handleImageChange}
                        required
                    />
                    <button className={classes.button} type="button" onClick={handleImagePick}>
                        Pick an image
                    </button>
                </div>
            </div>
          

        </>
    )
}