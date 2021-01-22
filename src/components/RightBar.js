import React, {useEffect, useState} from 'react'
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton } from '@material-ui/core';

import {firebaseDB} from "../Firebase"

const RightBar = () => {


    const [users, setUsers] = useState({});

    useEffect(() => {
        firebaseDB.child('users').on('value',snapshot => {
            if(snapshot.val()){
                setUsers({
                    ...snapshot.val()
                })
            }
        })
    }, [])


    return (
        <div className="rightbar-container">
            <div className="header">
                ALL USERS
            </div>

            <div className="users-list">
                <table className="table">
                    <thead>
                        <tr>
                            <th>IMAGE</th>
                            <th>NAME</th>
                            <th>MOBILE NO.</th>
                            <th>AGE</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>

                    <tbody>

                        {Object.keys(users).map(id => (
                            <tr key={id}>
                                <td>
                                    <img className="profile-pic" src={users[id].image} alt=""/>
                                </td>
                                <td>
                                    <p className="name">{users[id].name}</p>
                                </td>
                                <td>
                                    <p className="mobile">{users[id].phone}</p>
                                </td>
                                <td>
                                    <p className="age">{users[id].age}</p>
                                </td>
                                <td>
                                    <IconButton>
                                        <CreateIcon />
                                    </IconButton>

                                    <IconButton>
                                        <DeleteIcon />
                                    </IconButton>
                                </td>
                            </tr>
                        ))}

                        

                    </tbody>
                </table>
                
            </div>
        </div>
    )
}

export default RightBar
