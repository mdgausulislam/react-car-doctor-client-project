import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';
import Swal from 'sweetalert2';

const BookServices = () => {
    const service = useLoaderData();
    const { title, _id, price, img } = service;
    const { users } = useContext(AuthContext);

    const handleBookService = event => {
        event.preventDefault();

        const orderForm = event.target;
        const name = orderForm.name.value;
        const date = orderForm.date.value;
        const email = users?.email;

        const booking = {
            customerName: name,
            date,
            email,
            img,
            service: title,
            service_id: _id,
            price: price,
        }
        console.log(booking);

        fetch('http://localhost:5000/bookings', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.insertedId) {
                    Swal.fire(
                        'Success!',
                        'Your booking Successfully.',
                        'success'
                    )

                }
            })
    }


    return (
        <div>
            <h1 className='text-center text-3xl'>Book service:{title}</h1>
            <form onSubmit={handleBookService} className="card-body">
                <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" name='name' defaultValue={users?.displayName} placeholder="name" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Date</span>
                        </label>
                        <input type="date" name='date' placeholder="date" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" name='email' defaultValue={users?.email} placeholder="email" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Due Balance</span>
                        </label>
                        <input type="text" defaultValue={'$ ' + price} placeholder="balance" className="input input-bordered" required />
                    </div>
                </div>
                <div className="form-control mt-6">
                    <input className="btn btn-primary btn-block" type="submit" value="Order Confirmed" />
                </div>
            </form>
        </div>
    );
};

export default BookServices;