import { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

function AddUser() {

    const [gender, setGender] = useState("");
    const [status, setStatus] = useState("");

    const handleAddUser = e => {
        e.preventDefault();
        const form = e.target;

        const name = form.name.value;
        const email = form.email.value;
        const user = { name, email, gender: gender, status: status };
        // console.log(user);

        fetch('https://user-management-server-mml8y4pzs-devavi.vercel.app/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.acknowledged) {
                    Swal.fire({
                        icon: 'success',
                        title: 'User Added Successfully!',
                    })
                    form.reset()
                }
            })
    };

    return (
        <div className="max-w-3xl mx-auto  my-6">
            <div>
                <form className="p-5 space-y-2 border-4 border-green-400" onSubmit={handleAddUser}>
                    <p className="font-bold">Name</p>
                    <input className="w-full px-2 py-1" type="text" name="name" placeholder="Your Name" required />
                    <p className="font-bold">Email</p>
                    <input className="w-full px-2 py-1" type="email" name="email" placeholder="Your Email" required />
                    <br />
                    <div className="flex items-center gap-4 py-2">
                        <p className="font-bold mr-4">Gender:</p>
                        <input type="radio" name="gender" value="Male" onChange={(e) => setGender(e.target.value)} className="radio radio-primary" required /> <span>Male</span>
                        <input type="radio" name="gender" value="Female" onChange={(e) => setGender(e.target.value)} className="radio radio-primary" required /> <span>Female</span>
                    </div>
                    <div className="flex items-center gap-4 py-2">
                        <p className="font-bold mr-4">Status:</p>
                        <input type="radio" name="status" value="Active" onChange={(e) => setStatus(e.target.value)} className="radio radio-primary" required /> <span>Active</span>
                        <input type="radio" name="status" value="Inactive" onChange={(e) => setStatus(e.target.value)} className="radio radio-primary" required /> <span>Inactive</span>
                    </div>
                    <input className="btn btn-sm w-full text-black bg-green-400 px-2 py-1 mt-5 inline-block" type="submit" value="Submit" />
                </form>
            </div>
            <div className="text-center">
                <Link to='/' className="btn btn-sm text-white bg-green-400 m-6 rounded-none mt-14">Back To Home</Link>
            </div>
        </div>
    )
}

export default AddUser
