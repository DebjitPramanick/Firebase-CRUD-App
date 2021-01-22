import React, {useState,useRef} from 'react'
import PersonIcon from '@material-ui/icons/Person';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import DateRangeIcon from '@material-ui/icons/DateRange';
import CancelIcon from '@material-ui/icons/Cancel';

import {firebaseDB,storage} from "../Firebase"
import CircularProgress from '@material-ui/core/CircularProgress';
import 'react-image-crop/dist/ReactCrop.css';
import ReactCrop from 'react-image-crop';


const LeftBar = () => {

    const [name, setName] = useState('');
    const [age, setAge] = useState(null);
    const [phone, setPhone] = useState(null);
    const [imageURL, setImageURL] = useState('');

    const [show,setShow] = useState(false); //For showing the loader




    const addUser = e =>{
        e.preventDefault();

        if(name && age && phone){
            setShow(true);

            const data = {
                image: imageURL,
                name: name,
                age: age,
                phone: phone
            }

            firebaseDB.child('users').push(
                data,
                err => {
                    if(err){
                        console.log(err);
                    }
                }
            )

            setName('');
            setAge('');
            setPhone('');

            setTimeout(() => {
                setShow(false)
            },2500);
        }

    }




    /* -----------------Image Upload Section----------------- */


    const [src, setSrc] = useState('http://inexa-tnf.com/wp-content/uploads/2017/05/unknow-person.jpg');

    const [popup, setPopup] = useState(false); //For popup box
    const [image, setImage] = useState(null); //For setting crop image
    const [crop, setCrop] = useState({aspect: 1/1}); //Fro setting crop value
    const [preview, setPreview] = useState(''); //For showing the preview to users
    const [imageFile, setImageFile] = useState({}); //For setting the imagefile after upload

    const fileInput = useRef(null)



    const displayChange = e => {

        e.preventDefault();
        setImageFile(e.target.files[0]);
        setSrc(URL.createObjectURL(e.target.files[0]));
        setPopup(true);
    }


    const dataURLtoFile = (dataurl, filename) => {
 
        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), 
            n = bstr.length, 
            u8arr = new Uint8Array(n);
            
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        
        return new File([u8arr], filename, {type:mime});
    }


    function getCroppedImg(e) {
        e.preventDefault();
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');
 
        ctx.drawImage(
          image,
          crop.x * scaleX,
          crop.y * scaleY,
          crop.width * scaleX,
          crop.height * scaleY,
          0,
          0,
          crop.width,
          crop.height,
        );
        

        const base64Image = canvas.toDataURL('image/jpeg');
        var file = dataURLtoFile(base64Image,"profilepic.jpg");

        setPreview(base64Image);

        setPopup(false);

        imageUpload(file);
    }



    const imageUpload = (file) =>{
        const uploadTask = storage.ref(`images/${imageFile.name}`).put(file);
        uploadTask.on(
            "state_changed",
            snapshot => {},
            error => {
                console.log(error)
            },
            () => {
                storage.ref("images")
                .child(imageFile.name)
                .getDownloadURL()
                .then(url => {
                    console.log(url);
                    setImageURL(url)
                })
            }
        )

        console.log(src)
    }


    const closeCrop = () =>{
        setSrc('http://inexa-tnf.com/wp-content/uploads/2017/05/unknow-person.jpg');
        setPopup(false)
    }









    /* -----------------Image Upload Section----------------- */







    return (
        <div className="leftbar-container">
            <div className="header">
                ADD USER
            </div>


            <div className="input-fields">

                <div className="img-container" onClick={() => fileInput.current.click()}>
                    {preview? (
                        <img src={preview} alt=""/>
                    ):(
                        <img src={src} alt=""/>
                    )}
                
                </div>

                <div className={popup?"pop-up-box" : "hide"}>
                    <div className="cross-btn"
                    onClick={() => closeCrop()}>
                        <CancelIcon/>
                    </div>
                    <div className="crop-field">
                        {src && (
                            <>
                                <ReactCrop src={src} onImageLoaded={setImage}
                                crop={crop} onChange={setCrop}/>

                                <button className="crop-btn"
                                onClick={getCroppedImg}>
                                    Crop & Upload Image
                                </button>
                            </>
                        )} 
                    </div>
                </div>



                <input type="file" className="choose-file"
                accept="image/*" onChange={(e) => displayChange(e)}
                ref={fileInput}></input>

                <div className="form-input">
                    <PersonIcon />
                    <input type="text" className="name"
                    value={name} placeholder="Enter user name"
                    onChange={(e) => setName(e.target.value)}>
                    </input>
                </div>

                <div className="form-input">
                    <PhoneAndroidIcon />
                    <input type="number" className="name"
                    value={phone} placeholder="Enter user phone no."
                    onChange={(e) => setPhone(e.target.value)}>
                    </input>
                </div>

                <div className="form-input">
                    <DateRangeIcon />
                    <input type="number" className="name"
                    value={age} placeholder="Enter user age"
                    onChange={(e) => setAge(e.target.value)}>
                    </input>
                </div>
                
                <div className="submit-btn">
                    <button onClick={(e) => addUser(e)}>
                        Add user
                    </button>
                </div>
            </div>
        </div>
    )
}

export default LeftBar
