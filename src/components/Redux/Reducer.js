import { SET_ID } from "./Action" ;

const userID = "Debjit78979";

export const idReducer = (state = userID, action) =>{
    switch(action.type){
        case SET_ID:
            return {
                ...state,
                userID: action.id
            }
        default:
            return state
    }
}