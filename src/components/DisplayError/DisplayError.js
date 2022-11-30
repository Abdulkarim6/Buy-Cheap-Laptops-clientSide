import React from 'react';
import { useRouteError } from "react-router-dom";
import img404 from '../../../src/images/404 imags.jpg';



const DisplayError = () => {
    const error = useRouteError()
    return (
        <div className='text-center mt-14'>
            <h1 className='text-red-500 text-4xl'>Oops!Something Wrong</h1>
            <p className='text-red-400 text-xl'>Sorry, an unexpected error has occurred.</p>
            <div className='w-full mx-auto flex justify-center mt-4'>
                <img src={img404} alt="" className='h-96 rounded-md'/>
            </div>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
        </div>
    );
};

export default DisplayError;