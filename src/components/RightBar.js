import React, {useEffect, useState} from 'react'
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import {Link} from 'react-router-dom'

import {firebaseDB} from "../Firebase"

const RightBar = () => {


    const [users, setUsers] = useState({});

    const [query, setQuery] = useState("")



    useEffect(() => {
        firebaseDB.child('users').on('value',snapshot => {
            if(snapshot.val()){
                setUsers({
                    ...snapshot.val(),
                })
            }
        })
    }, [])


    const removeUser = (userID) =>{

        console.log(userID);

        firebaseDB.child(`users/${userID}`).remove();
    }


    const searchUser = e => {
        e.preventDefault();

        var search = firebaseDB.child('users/').orderByChild("name");
        search.once("value", function(snapshot) {
          snapshot.forEach(function(child) {

            if(child.val().name.toLowerCase().includes(query)){
                setUsers(
                    snapshot.val()
                )
            }
          });
        });

    }

    return (
        <div className="rightbar-container">
            <div className="header">
                ALL USERS
            </div>

            <div className="search-bar">
                <input placeholder="Search users" onChange={(e) => setQuery(e.target.value)} value={query}></input>
                <SearchIcon onClick={(e) => searchUser(e)}/>
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

                        {Object.keys(users).map((id) => (
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

                                    <Link to={`/${id}`}>
                                        <IconButton>
                                            <CreateIcon/>
                                        </IconButton>
                                    </Link>
                                    

                                    <IconButton onClick={() => removeUser(id)}>
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
