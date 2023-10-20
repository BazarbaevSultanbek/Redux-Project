import {useSelector} from "react-redux";


function Clock() {
    const users  = useSelector(state => state.users);
    return (
        <div>
            Clock
            {users.map(user=>(
                <p key={user.name}>{user.name}</p>
            ))}
        </div>
    );
}

export default Clock;