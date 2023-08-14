import React, { useCallback } from 'react'
import bgimg from '../../images/banner.jpg';
import asus from '../../images/asus-1.jpg';
import lenovo from '../../images/lenovo-1.jpg';
import samsung from '../../images/samsung-3.jpg';
import useEmblaCarousel from 'embla-carousel-react'
import './Banner.css'
import Autoplay from 'embla-carousel-autoplay'
import { DotButton, useDotButton } from './DotButton/DotButton.jsx';


const Banner = () => {
    const autoplayOptions = {
        delay: 2000,
        stopOnMouseEnter: true,
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
        <div className='flex flex-col lg:flex-row-reverse bg-cyan-300 rounded-md'>
            <div className='flex flex-col justify-center items-center w-full lg:w-2/5 py-6'>
                <h3 className="text-center text-2xl md:text-3xl lg:text-4xl font-bold font-serif ml-5">Wellcome to Our</h3>
                <h3 className="text-center text-2xl md:text-3xl lg:text-4xl font-bold font-serif  ml-28 italic"> Buy Chep Laptops</h3>
            </div>
            
            <div className='w-full lg:w-3/5 ... bg-gradient-to-r from-violet-500 to-fuchsia-400'>
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
                    
                </div>
                    <div className="embla__dots">
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
    );
};

export default Banner;
