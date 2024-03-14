import React from "react";
import {useEffect} from 'react'; 
//add component 
import UserForm from "../componentsForAdmin/UserForm";
import UsersDetails from "../componentsForAdmin/UserDetails";
import { useUsersContext } from "../../hooks/useUsersContext";


const AdminPage = () =>{
    const {users, dispatch } = useUsersContext();

    useEffect(() =>{
        const fetchUsers = async() =>{ 
            const response = await fetch('/admin');
            const json = await response.json();

            if(response.ok){
                dispatch({type: 'SET_USERS', payload: json});
            }

        };
        fetchUsers();
    }, [dispatch]);

    return (
    <div className="adminPage py-20">
        <div className='users flex-1 overflow-auto inset-x-4'>
            {users && users.map((user) => (
                <UsersDetails key={user._id} user={user} />
            ))}
        </div>
        <div className="form w-4/12 absolute top-20 right-4 overflow-y-auto">
            <UserForm />
        </div>
    </div>
    

    );
}

export default AdminPage;