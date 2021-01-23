import React, {useEffect, useState} from 'react'
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import {Link} from 'react-router-dom'

import {firebaseDB} from "../Firebase"

const RightBar = () => {


    const [users, setUsers] = useState([]);

    const [query, setQuery] = useState("")



    useEffect(() => {
        firebaseDB.child('users').on('value',snapshot => {
            if(snapshot.val()){
                snapshot.forEach(snap => {
                    const userModel = {
                        id : snap.key,
                        details: snap.val()
                    }
                    console.log(userModel);
                    setUsers((user) => {
                        return [...user,userModel]
                    })
                });
            }
        })

    }, [])



    const removeUser = (userID) =>{

        firebaseDB.child(`users/${userID}`).remove();
    }



    const allusers = users.filter(user => {
        return user.details.name.toLowerCase().includes(query.toLowerCase());
    })

    return (
        <div className="rightbar-container">
            <div className="header">
                ALL USERS
            </div>

            <div className="search-bar">
                <SearchIcon/>
                <input placeholder="Search users" onChange={(e) => setQuery(e.target.value)} value={query}></input>
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

                        {allusers.map((user) => (
                            <tr key={user.id}>
                                <td>
                                    <img className="profile-pic" src={user.details.image} alt=""/>
                                </td>
                                <td>
                                    <p className="name">{user.details.name}</p>
                                </td>
                                <td>
                                    <p className="mobile">{user.details.phone}</p>
                                </td>
                                <td>
                                    <p className="age">{user.details.age}</p>
                                </td>
                                <td>

                                    <Link to={`/${user.id}`}>
                                        <IconButton>
                                            <CreateIcon/>
                                        </IconButton>
                                    </Link>
                                    

                                    <IconButton onClick={() => removeUser(user.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </td>

                                {/*console.log(user)*/}
                            </tr>
                        ))}

                        

                    </tbody>
                </table>
                
            </div>
        </div>
    )
}

export default RightBar
