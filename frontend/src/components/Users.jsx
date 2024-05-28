import { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { logoAtom } from "../store/atoms/Logo";

export const Users = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [filter, setFilter] = useState("");
    const [logo, setLogo] = useRecoilState(logoAtom);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/v1/user/bulk");
                console.log("Response data:", response.data);

                const currentUserEmail = localStorage.getItem("email");
                console.log("Current email from localStorage:", currentUserEmail);

                const currentUser = response.data.users.find(user => user.email === currentUserEmail);
                console.log("Current user found:", currentUser);

                if (currentUser) {
                    const firstLetter = currentUser.email.slice(0, 1).toUpperCase();
                    setLogo(firstLetter);
                } else {
                    console.warn("Current user not found in the response data.");
                }

                setUsers(response.data.users);
                setFilteredUsers(response.data.users);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, [setLogo]);

    useEffect(() => {
        const currentUserEmail = localStorage.getItem("email");
        const filtered = users.filter(user => 
            user.email !== currentUserEmail && 
            (user.username.includes(filter) || user.email.includes(filter))
        );
        setFilteredUsers(filtered);
    }, [filter, users]);

    return (
        <>
            <div className="font-bold mt-6 text-lg">
                Users
            </div>
            <div className="my-2">
                <input onChange={(e) => {
                    setFilter(e.target.value);
                }} type="text" placeholder="Search users..." className="w-full px-2 py-1 border rounded border-slate-200"></input>
            </div>
            <div>
                {filteredUsers.map(user => (
                    <User key={user._id} user={user} />
                ))}
            </div>
        </>
    );
};

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
                        {user.email}
                    </div>
                </div>
            </div>
        </div>
    );
}
