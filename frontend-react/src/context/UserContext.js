import {createContext, useReducer} from 'react';
import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes from the 'prop-types' package

export const UserContext = createContext();

export const userReducer = (state, action) =>{
    switch(action.type){
        case 'SET_USERS':
            return {
                users:action.payload
            };
        case 'CREATE_USER':
            return {
                users:[action.payload, ...state.users]
            };

        case 'DELETE_USER':
            return{
                users: state.users.filter((u)=>u._id !== action.payload._id)
            };
        default:
            return state; 
    }
};

export const UserContextProvider = ({ children }) => {
    const [ state, dispatch ] = useReducer(userReducer, {
        users: null 
    });

    return (
        <UserContext.Provider value={{ ...state, dispatch }}>
            {children}
        </UserContext.Provider>
    );
};


// Define PropTypes for UserContextProvider
UserContextProvider.propTypes = {
    children: PropTypes.node.isRequired, // This line is added to validate the 'children' prop
};