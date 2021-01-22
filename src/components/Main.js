import React from 'react'
import "../components/Styles.css"
import LeftBar from './LeftBar'
import RightBar from './RightBar'



const Main = () => {
    return (
        <div className="container">
            <LeftBar />
            <RightBar />
        </div>
    )
}

export default Main
