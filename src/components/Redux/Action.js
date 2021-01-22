export const SET_ID = "SET_ID";

export function setID(id) {
    return{
        type: SET_ID,
        payload: id
    }
}