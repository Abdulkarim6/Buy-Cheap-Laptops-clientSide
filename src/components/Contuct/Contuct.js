import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { AuthContext } from '../../Contexts/AuthProvider';


const Contuct = () => {
    const { user } = useContext(AuthContext)
    const { register, formState: { errors }, handleSubmit } = useForm();

    const handleFindUsersMessage = data => {
        const message = {
            name: data.name,
            email: user?.email,
            message: data.message
        }
        // console.log(message);
        //save message to database
        fetch('https://cheap-laptop-server-side.vercel.app/message', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(message)
        })
            .then(res => res.json())
            .then(result => {
                // console.log(result);
                if (result.acknowledged) {
                    toast.success(`Thankyou for share your experience`);
                }
            })
    }

    return (
        <div className='my-3 flex justify-center items-center'>
            <div className='w-96 borderd'>
                <h4 className="text-xl font-bold text-primary">Please ! Share your experience about this site</h4>
                <form onSubmit={handleSubmit(handleFindUsersMessage)}>
                    <div className="form-control w-full">
                        <label className="label"><span className="label-text">Your Name</span></label>
                        <input type="text"
                            {...register("name", { required: 'Name is required' })}
                            placeholder="Your Name" className="input input-bordered w-full" />
                        {errors.name && <p className='text-red-600'>{errors.name?.message}</p>}
                    </div>
                    <div className="form-control w-full">
                        <label className="label"><span className="label-text">Your Message</span></label>
                        <textarea
                            {...register("message", { required: 'Message is required' })}
                            className="textarea textarea-primary" placeholder="Your Message"></textarea>
                        {errors.message && <p className='text-red-600'>{errors.message?.message}</p>}
                    </div>
                    <input type="submit" className='btn btn-accent w-full mt-3' value='Send' />
                </form>
            </div>
        </div>

    );
};

export default Contuct;