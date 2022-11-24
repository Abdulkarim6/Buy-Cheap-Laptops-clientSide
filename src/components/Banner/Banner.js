import React from 'react';


const Banner = () => {
    return (
        <div className="hero min-h-screen mt-3 mx-auto rounded bg-no-repeat bg-center bg-cover" style={{ backgroundImage: `url("https://i.ibb.co/28p1W43/banner.jpg")` }}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md">
                    <h1 className="mb-5 text-4xl font-bold">Welcome to Buy Cheap Laptops</h1>
                    <p className="mb-5">Here you can buy old laptop at cheap price and you can sell your old laptop if you want.</p>
                </div>
            </div>
        </div>
    );
};

export default Banner;