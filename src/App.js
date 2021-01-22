import React from 'react'
import Main from './components/Main'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom'


const App = () => {
    return (
        <div>
            

            <Router>
                <Switch>
                    <Route path="/:id?">
                        <Main />
                    </Route>
                </Switch>
            </Router>


        </div>
    )
}

export default App
