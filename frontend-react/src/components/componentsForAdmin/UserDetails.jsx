import { useUsersContext } from "../../hooks/useUsersContext";
import React from "react"; 

// eslint-disable-next-line
const UsersDetails = ({ user }) =>{
    const {dispatch} = useUsersContext();

    const handleClick = async () =>{
        // eslint-disable-next-line
        const response = await fetch('/admin/' + user._id, {
            method: 'DELETE'
        }); 
        const json = await response.json();

        if(response.ok){
            dispatch({type:'DELETE_USER', payload:json});
        }
    };
    
    return (
        <div className="user-details w-7/12 mx-4 bg-white p-4 rounded-lg shadow-2xl mb-4 flex justify-between">
            <div className="flex flex-col justify-start">
                <h4>{// eslint-disable-next-line
                user._id}</h4>
                <p><strong>Name: </strong>{// eslint-disable-next-line
                user.name}</p>
                <p><strong>Email:</strong>{// eslint-disable-next-line
                user.email}</p>
                <p><strong>Bio:</strong>{// eslint-disable-next-line
                user.bio}</p>
                <p data-testid="location"><strong>Location:</strong>{// eslint-disable-next-line
                user.location}</p>
                <p data-testid="values"><strong>Values:</strong>{// eslint-disable-next-line
                user.values}</p>
            </div>
            <span className="delete-button self-start cursor-pointer bg-DarkGreen py-1 px-3 text-white rounded hover:bg-red transition-colors" onClick={handleClick}>Delete</span>
        </div>
    );

};

export default UsersDetails;