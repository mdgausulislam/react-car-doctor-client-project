import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import BookingRow from './BookingRow';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Bookings = () => {
    const { users } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);
    const navigate=useNavigate();

    const url = `https://car-doctor-server-flame-gamma.vercel.app/bookings?email=${users.email}`;
    useEffect(() => {
        fetch(url,{
            method:'GET',
            headers:{
                authorization:`Bearer ${localStorage.getItem('car-access-token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if(!data.error){
                    setBookings(data)
                }
                else{
                    navigate('/')
                }
                
            })
    }, [url,navigate])



    const handleDelete = id => {
        const proceed = confirm('Are you sure you want to delete');
        if (proceed) {
            fetch(`https://car-doctor-server-flame-gamma.vercel.app/bookings/${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data.deletedCount >0) {
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        )
                        const remaining=bookings.filter(booking=>booking._id !==id);
                        setBookings(remaining);
                    }
              
                })
        }

    }


    const handlePendingConfirm = id => {
        fetch(`https://car-doctor-server-flame-gamma.vercel.app/bookings/${id}`, {
            method: 'PATCH',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify({status:'confirm'})
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.modifiedCount >0) {
                    Swal.fire(
                        'updated!',
                        'Your booking successfully.',
                        'success'
                    )
                    const remaining=bookings.filter(booking=>booking._id !==id);
                    const updated=bookings.find(booking=>booking._id ===id);
                    updated.status='confirmed';
                    const newBookings=[updated,...remaining]
                    setBookings(newBookings);
                }
          
            })
    }


    return (
        <div>
            <h1 className='text-5xl'>Your Bookings: {bookings.length}</h1>

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                checkbox
                            </th>
                            <th>Image</th>
                            <th>Service</th>
                            <th>Date</th>
                            <th>price</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookings.map(booking => <BookingRow
                                key={booking._id}
                                booking={booking}
                                handleDelete={handleDelete}
                                handlePendingConfirm={handlePendingConfirm}
                            ></BookingRow>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Bookings;