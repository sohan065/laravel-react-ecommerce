import React from 'react'
import BannerImg1 from '../../assets/images/banner-1.jpg';
import BannerImg2 from '../../assets/images/banner-2.jpg';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
const Hero = () => {
    return (
        <section className='section-1'>
            <Swiper
                spaceBetween={ 0 }
                slidesPerView={ 1 }
                breakpoints={ {
                    1024: {
                        slidesPerView: 1,
                        spaceBetween: 0,
                    }
                } }
            >
                <SwiperSlide>
                    <div className="content" style={ { backgroundImage: `url(${BannerImg1})` } }>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="content" style={ { backgroundImage: `url(${BannerImg2})` } }>
                    </div>
                </SwiperSlide>
            </Swiper>
        </section>
    )
}

export default Hero
