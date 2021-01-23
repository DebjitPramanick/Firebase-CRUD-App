import React, {useEffect, useState} from 'react'
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import {Link,useHistory} from 'react-router-dom'

import {firebaseDB} from "../Firebase"

const RightBar = () => {


    const [users, setUsers] = useState([]);
    const [query, setQuery] = useState("");

    const history = useHistory();



    useEffect(() => {
        firebaseDB.child('users').on('value',snapshot => {
            if(snapshot.val()){
                setUsers([]);
                snapshot.forEach(snap => {
                    
                    const userModel = {
                        id : snap.key,
                        details: snap.val()
                    }

                    
                    
                    setUsers((user) => ([...user,userModel]))
                });
            }
        })

    }, [])



    const removeUser = (userID) =>{

        if(window.confirm('Do you want to delete this user?')){

            firebaseDB.child(`users/${userID}`).remove();
            setUsers(users.filter((user)=>user.id !== userID));

            history.replace("/",[]);
        }

        
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

                {(users.length > 0) ? (

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
                                </tr>
                            ))}

                            

                        </tbody>
                    </table>

                ): (
                    <div className="no-user">
                        <img src="https://www.aclproduct.com/images/empty.png" alt=""/>
                        <p>No User</p>
                    </div>
                )}
                
            </div>
        </div>
    )
}

export default RightBar
