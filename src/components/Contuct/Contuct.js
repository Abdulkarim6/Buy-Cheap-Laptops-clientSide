import React from 'react';

const Contuct = () => {
    return (
        <div className="hero  bg-base-200 text-base-content rounded my-3">
            <div className="hero-content w-full">
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-200 text-center">
                    <div className="card-body">
                        <p className="py-6 text-semibold text-xl">Contact Us</p>
                        <h4 className="text-xl font-bold text-primary">Stay connected with us</h4>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="text" placeholder="email" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Subject</span>
                            </label>
                            <input type="text" name="" className="input input-bordered" placeholder='Subject' />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Message</span>
                            </label>
                            <textarea className="textarea input input-bordered" placeholder="Your Message"></textarea>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-info">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Contuct;