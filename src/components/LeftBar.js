import React, {useState,useRef, useEffect} from 'react'
import {useParams,useHistory} from 'react-router-dom';
import PersonIcon from '@material-ui/icons/Person';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import DateRangeIcon from '@material-ui/icons/DateRange';
import CancelIcon from '@material-ui/icons/Cancel';

import {firebaseDB,storage} from "../Firebase"
import CircularProgress from '@material-ui/core/CircularProgress';
import 'react-image-crop/dist/ReactCrop.css';
import ReactCrop from 'react-image-crop';




const LeftBar = () => {

    const unknowURL = 'https://www.jadefontenotdds.com/site/wp-content/uploads/2019/02/92979836-stock-vector-profile-anonymous-face-icon-gray-silhouette-person-male-default-avatar-photo-placeholder-isolated-on.jpg';

    const [name, setName] = useState('');
    const [age, setAge] = useState(null);
    const [phone, setPhone] = useState(null);
    const [imageURL, setImageURL] = useState('');

    const [show,setShow] = useState(false); //For showing the loader

    const userID = useParams().id;
    const history = useHistory();

    useEffect(() => {

        if(userID){

            firebaseDB.child(`users/${userID}`).on('value',snapshot => {
                if(snapshot.val()){
                    setName(snapshot.val().name);
                    setAge(snapshot.val().age);
                    setPhone(snapshot.val().phone);
                    setImageURL(snapshot.val().image);
                    setPreview(snapshot.val().image);
                }
            })
        
        }

        else{
            setName('');
            setAge('');
            setPhone('');
            setImageURL('');
            setPreview('');
        }
    }, [userID])



    const updateUser = e =>{
        e.preventDefault();

        setShow(true);

        const data = {
            image: imageURL,
            name: name,
            age: age,
            phone: phone
        }

        
        setTimeout(() => {
            setShow(false);
            firebaseDB.child(`users/${userID}`).update(
                data,
                err => {
                    if(err){
                        console.log(err);
                    }
                }
            )
        },2500);

        history.replace("/",[userID]);

        setName('');
        setAge('');
        setPhone('');

        setSrc(unknowURL);
        setPreview("");

        //userID = "";
        
    }

    




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


            setTimeout(() => {
                setShow(false);
                firebaseDB.child('users').push(
                    data,
                    err => {
                        if(err){
                            console.log(err);
                        }
                    }
                )
            },2500);
            
            setName('');
            setAge('');
            setPhone('');

            setSrc(unknowURL);
            setPreview("");
        }

    }




    /* -----------------Image Upload Section----------------- */


    const [src, setSrc] = useState(unknowURL);

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
        setSrc(unknowURL);
        setPopup(false)
    }









    /* -----------------Image Upload Section----------------- */







    return (
        <div className="leftbar-container">

            
            <div className="header">
                {userID? (
                    <>
                    <p>UPDATE USER</p>
                    <CancelIcon style={{cursor: "pointer"}}
                    onClick={() => history.replace("/",[]) }/>
                    </>
                )
                : <p>ADD USER</p>}
            </div>


            {show && (
                <div className="progress-popup">
                    <div className="loading-box">
                        <CircularProgress />
                        <p>Uploading...</p>
                    </div>
                </div>
            )}

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

                {!userID && (
                    <div className="submit-btn">
                        <button onClick={(e) => addUser(e)}>
                            Add user
                        </button>
                    </div>
                )}

                {userID && (
                    <div className="update-btn">
                        <button onClick={(e) => updateUser(e)}>
                            Update user
                        </button>
                    </div>
                )}
                
                
            </div>
        </div>
    )
}

export default LeftBar
