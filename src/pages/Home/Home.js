import React from 'react';
import Advertised from '../../components/Advertised/Advertised';
import Banner from '../../components/Banner/Banner';
import Categories from '../../components/Categories/Categories';
import Contuct from '../../components/Contuct/Contuct';

const Home = () => {
    return (
        <div className='px-6'>
            <Banner></Banner>
            <Advertised></Advertised>
            <Categories></Categories>
            <Contuct></Contuct>
        </div>
    );
};

export default Home;