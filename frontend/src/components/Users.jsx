import { useEffect, useState } from "react"
import { Button } from "./Button"
import axios from "axios";
import { useRecoilState } from "recoil";
import { logoAtom } from "../store/atoms/Logo";

export const Users = () => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");
    const [logo, setLogo] = useRecoilState(logoAtom);

    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter)
            .then(response => {
                const currentUserUsername = localStorage.getItem("email");
                const filteredUsers = response.data.users.filter(user => user.email !== currentUserUsername);
                const currentUser = response.data.users.find(user => user.email === currentUserUsername);
                const firstLetter = currentUser.email.slice(0, 1).toUpperCase();
                setLogo(firstLetter);
                setUsers(filteredUsers);
            })
    }, [filter])

    return (
        <>
            <div className="font-bold mt-6 text-lg">
                Users
            </div>
            <div className="my-2">
                <input onChange={(e) => {
                    setFilter(e.target.value)
                }} type="text" placeholder="Search users..." className="w-full px-2 py-1 border rounded border-slate-200"></input>
            </div>
            <div>
                {users.map(user => (
                    <User key={user._id} user={user} />
                ))}
            </div>
        </>
    );
}

function User({ user }) {
    return (
        <div className="flex justify-between">
            <div className="flex">
                <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                    <div className="flex flex-col justify-center h-full text-xl">
                        {user.email[0].toUpperCase()}
                    </div>
                </div>
                <div className="flex flex-col justify-center h-full">
                    <div>
                        {user.username}
                    </div>
                </div>
            </div>
        </div>
    );
}
