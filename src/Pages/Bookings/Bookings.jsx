import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';

const Bookings = () => {
    const {users}=useContext(AuthContext);
    // const [bookings, setBookings]= useState([]);

    const url=`http://localhost:5000/bookings?email=${users.email}`;
    useEffect(()=>{
        fetch(url)
        .then(res=>res.json())
        .then(data=>console.log(data))
    }, [])
    return (
        <div>
            
        </div>
    );
};

export default Bookings;