import React from 'react';
import Advertised from '../../components/Advertised/Advertised';
import Banner from '../../components/Banner/Banner';
import Categories from '../../components/Categories/Categories';
import Contuct from '../../components/Contuct/Contuct';
import UserMassage from '../../components/UserMassage/UserMassage';
import AllProducts from '../../components/AllProducts/AllProducts';

const Home = () => {
    return (
        <div className='px-6'>
            <Banner></Banner>
            <Advertised></Advertised>
            {/* <Categories></Categories> */}
            <AllProducts></AllProducts>
            <UserMassage></UserMassage>
            <Contuct></Contuct>
        </div>
    );
};

export default Home;