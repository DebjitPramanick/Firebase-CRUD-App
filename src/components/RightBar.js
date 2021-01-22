import React from 'react'
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton } from '@material-ui/core';

const RightBar = () => {
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

                        <tr>
                            <td>
                                <img className="profile-pic" src="https://avatars.githubusercontent.com/u/73888326?s=460&u=f43063d6c0717b1b7be6650bfa8435bfa43f5587&v=4" alt=""/>
                            </td>
                            <td>
                                <p className="name">Debjit Pramanick</p>
                            </td>
                            <td>
                                <p className="mobile">9330348081</p>
                            </td>
                            <td>
                                <p className="age">21</p>
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

                    </tbody>
                </table>
                
            </div>
        </div>
    )
}

export default RightBar
