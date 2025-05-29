import React, { useCallback } from 'react'
import bgimg from '../../images/hp.png';
import asus from '../../images/dell.png';
import lenovo from '../../images/lenovo.png';
import samsung from '../../images/asus.png'
import useEmblaCarousel from 'embla-carousel-react';
import { MdSend } from "react-icons/md";
import './Banner.css'
import Autoplay from 'embla-carousel-autoplay'
import { DotButton, useDotButton } from './DotButton/DotButton.jsx';


const Banner = () => {
    const autoplayOptions = {
        delay: 2000,
        stopOnMouseEnter: false,
        stopOnInteraction: false,
    };
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay(autoplayOptions)]);


    const onButtonClick = useCallback((emblaApi) => {
        const { autoplay } = emblaApi.plugins()
        if (!autoplay) return
        if (autoplay.options.stopOnInteraction !== false) autoplay.stop()
    }, [])

    const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
        emblaApi,
        onButtonClick
    )

    return (
        <div className='flex flex-col lg:flex-row-reverse rounded-md'>
            <div className='flex flex-col  w-full lg:w-2/5 py-6'>
                <h3 className=" text-2xl md:text-3xl lg:text-4xl font-bold font-serif ml-5">Wellcome to Our</h3>
                <h3 className="md:text-center text-2xl md:text-3xl lg:text-4xl font-bold font-serif  ml-28 italic">Old Laptops Shop</h3>
                <h5 className='flex text-lg md:text-xl'><MdSend className='mt-[6px]'/>You can create an account here as a buyer or seller.</h5>
                <h5 className='flex text-lg md:text-xl'><MdSend className='mt-[6px]'/>As a buyer, You can buy your preferred laptop at a low price.</h5>
                <h5 className='flex text-lg md:text-xl'><MdSend className='mt-[6px]'/>As a seller, You can sell your Used laptop.</h5>
            </div>
            
            <div className='w-full lg:w-3/5 bg-gradient-to-r '>
                <div className="embla__viewport" ref={emblaRef}>
                    <div className="embla__container">
                        <div className="embla__slide">
                            <img className="embla__slide__img" src={bgimg} alt="" />
                        </div>
                        <div className="embla__slide">
                            <img className="embla__slide__img" src={asus} alt="" />
                        </div>
                        <div className="embla__slide">
                            <img className="embla__slide__img" src={lenovo} alt="" />
                        </div>
                        <div className="embla__slide">
                            <img className="embla__slide__img" src={samsung} alt="" />
                        </div>
                    </div>
                    <div className="embla__dots -mt-6 relative rounded-md">
                        {scrollSnaps.map((_, index) => (
                            <DotButton
                                key={index}
                                onClick={() => onDotButtonClick(index)}
                                className={'embla__dot'.concat(
                                    index === selectedIndex ? ' embla__dot--selected' : ''
                                )}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;
