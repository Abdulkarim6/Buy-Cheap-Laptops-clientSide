import React from 'react';
import Advertised from '../../components/Advertised/Advertised';
import Banner from '../../components/Banner/Banner';
import UserReviews from '../../components/UserReviews/UserReviews';
import AllProducts from '../../components/AllProducts/AllProducts';
import ReviewGetter from '../../components/ReviewGetter/ReviewGetter';

const Home = () => {
    return (
        <div className='px-2 md:px-6'>
            <Banner></Banner>
            <Advertised></Advertised>
            <AllProducts></AllProducts>
            <UserReviews></UserReviews>
            <ReviewGetter></ReviewGetter>
        </div>
    );
};

export default Home;