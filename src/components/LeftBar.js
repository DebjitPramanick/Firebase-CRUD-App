import React, {useState} from 'react'
import PersonIcon from '@material-ui/icons/Person';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import DateRangeIcon from '@material-ui/icons/DateRange';


import {firebaseDB,storage} from "./Firebase"
import CircularProgress from '@material-ui/core/CircularProgress';
import 'react-image-crop/dist/ReactCrop.css';
import ReactCrop from 'react-image-crop';


const LeftBar = () => {

    const [src, setSrc] = useState('http://inexa-tnf.com/wp-content/uploads/2017/05/unknow-person.jpg');

    return (
        <div className="leftbar-container">
            <div className="header">
                ADD USER
            </div>


            <div className="input-fields">

                <div className="img-container">
                    <img src={src} alt=""/>
                </div>

                <div className="form-input">
                    <PersonIcon />
                    <input type="text" className="name"
                    value="" placeholder="Enter user name">
                    </input>
                </div>

                <div className="form-input">
                    <PhoneAndroidIcon />
                    <input type="text" className="name"
                    value="" placeholder="Enter user phone no.">
                    </input>
                </div>

                <div className="form-input">
                    <DateRangeIcon />
                    <input type="text" className="name"
                    value="" placeholder="Enter user age">
                    </input>
                </div>
                
                <div className="submit-btn">
                    <button>
                        Add user
                    </button>
                </div>
            </div>
        </div>
    )
}

export default LeftBar
