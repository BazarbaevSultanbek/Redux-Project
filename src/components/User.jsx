import { useState} from "react";
import {useDispatch} from "react-redux";
import {addUser} from "../store/reducers/userReducer.js";


function User() {
    const [user, setUser] = useState("");
    const dispatch = useDispatch();
    const add = () => {
        dispatch(addUser({name:user}))
    }
    return (
        <div>
            User
            <input type="text" value={user} onChange={(e)=>setUser(e.target.value)}/>
            <button onClick={add}>Add</button>
        </div>
    );
}

export default User;