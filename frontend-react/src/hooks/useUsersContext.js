import { UserContext } from '../context/UserContext';
import { useContext } from 'react';

export const useUsersContext = () => {
    const context = useContext(UserContext); 

    return context; 
};