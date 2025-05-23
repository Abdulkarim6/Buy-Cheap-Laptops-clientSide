import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../Contexts/AuthProvider';
import { TbCurrencyTaka } from "react-icons/tb";
import { useQuery } from '@tanstack/react-query';

const MyOrders = () => {
    const { user } = useContext(AuthContext);
    /* loaded all My products start here */
    const url = (`https://cheap-laptop-server-side.vercel.app/myOrderProducts?email=${user?.email}`)
    // const [loading, setLoading] = useState(true);

    const { data: myOrderProducts = [] , isLoading} = useQuery({
        queryKey: ['myOrderProducts', user?.email],
        queryFn: async () => {
            const res = await fetch(url);
            const data = await res.json();
            // if(data){
            //   setLoading(false)
            // }
           // console.log(data);
            return data;
        }
    });

    console.log(isLoading, "loader");

    return (
        <section>
            {/* <h2 className="text-lg lg:text-3xl text-center bg-cyan-300 font-serif py-2 font-semibold">You have Booked this products</h2> */}
            {
                isLoading ?
                <span className="loading loading-spinner text-error">fgd</span>
                    :
                  
                    !myOrderProducts.length ? 
                    
                       <p className='text-lg lg:text-3xl font-medium text-center text-info mt-5'>You have no booked any Products</p>
    
                        :
                        // <div className="overflow-x-auto w-full">
                            //<table className="table w-full font-medium">
                            <table className="w-full font-medium">
                                <thead className=''>
                                    <tr className='text-sm md:text-base'>
                                        <th className="invisible">quan</th>
                                        <th className="text-left">Device and Name</th>
                                        <th className="text-left hidden md:block">Price(BDT)</th>
                                        <th className="text-left">Booking Date</th>
                                        {/* <th className="text-left">Payment</th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        myOrderProducts?.map((myOrderProduct, i) =>
                                            <tr className='border-b-2 border-white setPadding' key={myOrderProduct._id}>
                                                <td className='md:pl-2 pl-1'>{i + 1}</td>
                                                <td>
                                                    <div className="flex md:items-center items-start space-x-3">
                                                        <div className="avatar">
                                                            <div className="w-14 md:w-20 rounded">
                                                                <img src={myOrderProduct.productImage} alt="Tailwind-CSS-Avatar-component" />
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <p className="text-sm lg:font-bold">{myOrderProduct.productName}</p>
                                                            <div className='text-sm lg:font-bold md:hidden block'>
                                                               <p className="flex items-center gap-[2px]">
                                                                  <TbCurrencyTaka />
                                                                  <span>{myOrderProduct.price}</span>
                                                               </p> 
                                                            </div> 
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="hidden md:table-cell align-middle">
                                                    <div className="flex items-center gap-1">
                                                      <TbCurrencyTaka />
                                                      <span>{myOrderProduct.price}</span>
                                                    </div>
                                                </td>
                                                <td><span className='text-sm'>{myOrderProduct.bookingDate}</span></td>
                                                <th>
                                                    <button className="btn btn-sm btn-error btn-disabled" >Pay</button>
                                                </th>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                        // </div>
                
            }
            
            
        </section>
    );
};

export default MyOrders;