import React, { useState } from 'react'
import { Link, useLoaderData } from 'react-router-dom'
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import Swal from 'sweetalert2';

function App() {

    const loadedUsers = useLoaderData();

    const [users, setUsers] = useState(loadedUsers);

    const handleDelete = id => {
        fetch(`https://user-management-server-mml8y4pzs-devavi.vercel.app/users/${id}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.acknowledged) {
                    Swal.fire({
                        title: 'Are you sure?',
                        text: "You won't be able to revert this!",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes, Delete It!'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            Swal.fire(
                                'Deleted!',
                                'User Data has been deleted.',
                                'success'
                            );
                            const remainingUsers = users.filter(user => user._id !== id);
                            setUsers(remainingUsers)
                        }
                    })
                }
            })
    }

    return (
        <div className='mx-5'>
            <div className='max-w-3xl mx-auto border-4 border-green-400 my-6'>
                <h1 className='text-5xl font-bold text-center p-6 bg-green-400 text-white'>User Management System</h1>
                <Link to='/addUser' className='btn btn-sm text-white bg-green-400 m-6 rounded-none'><button>Add User</button></Link>
                <div className='mb-4'>
                    {
                        users.length === 0
                            ?
                            <p className='text-center p-5 text-xl font-bold'>No Users Added</p>
                            :
                            <div className="overflow-x-auto">
                                <table className="table">
                                    {/* head */}
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Gender</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            users.map((user, idx) =>
                                                <tr key={user._id}>
                                                    <td>{idx + 1}</td>
                                                    <td>{user.name}</td>
                                                    <td>{user.email}</td>
                                                    <td>{user.gender}</td>
                                                    <td>{user.status}</td>
                                                    <td className='flex gap-3 text-xl'>
                                                        <Link to={`/updateUser/${user._id}`}><button><AiFillEdit></AiFillEdit></button></Link>
                                                        <button onClick={() => handleDelete(user._id)}><AiFillDelete></AiFillDelete></button>
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default App