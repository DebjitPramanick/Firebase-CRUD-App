import React from 'react'
import "../components/Styles.css"
import LeftBar from './LeftBar'
import MessageBox from './MessageBox'
import RightBar from './RightBar'



const Main = () => {
    return (
    <>
        <MessageBox />
        <div className="container">
            
            <LeftBar />
            <RightBar />
        </div>
    </>
    )
}

export default Main
