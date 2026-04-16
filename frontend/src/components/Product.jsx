import React, { useContext, useEffect, useState } from 'react'
import Layout from './common/Layout'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Thumbs, FreeMode, Navigation } from 'swiper/modules'
import { Rating } from 'react-simple-star-rating'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
import { useParams } from 'react-router-dom'
import { apiUrl } from './common/Http'
import Loading from './common/Loading'
import { CartContext } from './context/Cart'
import { toast } from 'react-toastify'

const Product = () => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null)
    const [rating, setRating] = useState(4)
    const { id } = useParams();
    const [product, setProduct] = useState([]);
    const [productSizes, setProductSizes] = useState([]);
    const [productImages, setProductImages] = useState([]);
    const [loading, setLoading] = useState('');

    const [selectedSize, setSelectedSize] = useState(null);
    const { addToCart } = useContext(CartContext);

    // Fetch product details based on the id from the URL
    const fetchProductDetails = async () => {
        setLoading(true);
        try {
            const result = await fetch(`${apiUrl}/get-products/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'accept': 'application/json',
                }
            });
            const res = await result.json();
            if (res.status === 200) {
                setLoading(false);
                setProduct(res.data);
                setProductSizes(res.data.product_sizes);
                setProductImages(res.data.product_images);

            } else {
                console.error('Error fetching categories:', res.message);
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    }

    const handleSelectedSize = (productSize) => {
        // Add to cart functionality can be implemented here
        setSelectedSize(productSize);
    }
    const handleCart = () => {
        // Add to cart functionality can be implemented here
        if (selectedSize === null) {
            toast.error('Please select a size before adding to cart.');
            return;
        } else {
            addToCart(product, selectedSize);
            toast.success('Product added to cart successfully!');
        }
    }

    useEffect(() => {
        fetchProductDetails();
    }, [])

    return (
        <Layout>
            <div className="container product-detail">
                {/* breadcrumb */ }
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="#">Home</a></li>
                        <li className="breadcrumb-item"><a href="#">Shop</a></li>
                        <li className="breadcrumb-item active" aria-current="page">{ product.title }</li>
                    </ol>
                </nav>

                { loading ? (<Loading />) : (
                    <>
                        <div className="row mb-5">
                            {/* product details */ }
                            <div className="col-md-5">
                                <div className="row">
                                    {/* thumbnail */ }
                                    <div className="col-md-2">
                                        {/* Thumbnail swiper */ }
                                        <Swiper
                                            onSwiper={ setThumbsSwiper }
                                            loop={ true }
                                            direction="vertical"
                                            spaceBetween={ 10 }
                                            slidesPerView={ 6 }
                                            freeMode={ true }
                                            watchSlidesProgress={ true }
                                            modules={ [FreeMode, Navigation, Thumbs] }
                                            className="mySwiper mt-2"
                                        >
                                            { productImages && productImages.map((productImage) => {
                                                return (
                                                    <SwiperSlide key={ productImage.id }>
                                                        <img
                                                            src={ productImage.image_url }
                                                            alt="Thumbnail"
                                                            height={ 100 }
                                                            className="w-100"
                                                        />
                                                    </SwiperSlide>
                                                )
                                            }) }
                                            {/* <SwiperSlide>
                                                <img
                                                    src={ ProductImageOne }
                                                    alt="Thumbnail 1"
                                                    height={ 100 }
                                                    className="w-100"
                                                />
                                            </SwiperSlide>
                                            <SwiperSlide>
                                                <img
                                                    src={ ProductImageTwo }
                                                    alt="Thumbnail 2"
                                                    height={ 100 }
                                                    className="w-100"
                                                />
                                            </SwiperSlide>
                                            <SwiperSlide>
                                                <img
                                                    src={ ProductImageThree }
                                                    alt="Thumbnail 3"
                                                    height={ 100 }
                                                    className="w-100"
                                                />
                                            </SwiperSlide> */}
                                        </Swiper>
                                    </div>

                                    {/* main image */ }
                                    <div className="col-md-10">
                                        {/* Main image swiper */ }
                                        <Swiper
                                            style={ {
                                                '--swiper-navigation-color': '#000',
                                                '--swiper-pagination-color': '#000',
                                            } }
                                            loop={ true }
                                            spaceBetween={ 0 }
                                            navigation={ true }
                                            thumbs={ { swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null } }
                                            watchSlidesProgress={ true }
                                            modules={ [FreeMode, Navigation, Thumbs] }
                                            className="mySwiper2"
                                        >
                                            { productImages && productImages.map((productImage) => {
                                                return (
                                                    <SwiperSlide key={ productImage.id }>
                                                        <img
                                                            src={ productImage.image_url }
                                                            alt="Main Image"
                                                            className="w-100"
                                                        />
                                                    </SwiperSlide>
                                                )
                                            }) }
                                            {/* <SwiperSlide>
                                                <img
                                                    src={ ProductImageOne }
                                                    alt="Main Image 1"
                                                    className="w-100"
                                                />
                                            </SwiperSlide> */}
                                            {/* <SwiperSlide>
                                                <img
                                                    src={ ProductImageTwo }
                                                    alt="Main Image 2"
                                                    className="w-100"
                                                />
                                            </SwiperSlide>
                                            <SwiperSlide>
                                                <img
                                                    src={ ProductImageThree }
                                                    alt="Main Image 3"
                                                    className="w-100"
                                                />
                                            </SwiperSlide> */}
                                        </Swiper>
                                    </div>
                                </div>
                            </div>

                            {/* product info */ }
                            <div className="col-md-7">
                                <h2>{ product.title }</h2>
                                <div className="rating">
                                    <Rating
                                        initialValue={ rating }
                                    />
                                    <span>10 reviews</span>
                                </div>
                                <div className="price">
                                    ${ product.price } { product.compare_price && (
                                        <span className='text-decoration-line-through'>
                                            ${ product.compare_price }
                                        </span>
                                    ) }
                                </div>
                                <p>{ product.short_description }</p>
                                <div className="size mb-3">
                                    <h5>Sizes</h5>
                                    { productSizes && productSizes.map((productSize) => {
                                        return (
                                            <button key={ productSize.id } className={ `btn btn-size m-2 ${selectedSize && selectedSize.size.id === productSize.size.id ? 'active' : ''}` } onClick={ () => handleSelectedSize(productSize) }>
                                                { productSize.size.name }
                                            </button>
                                        )
                                    }) }
                                </div>
                                <button className='btn btn-primary' onClick={ handleCart }>Add to Cart</button>
                                <hr />
                                <div className="sku">
                                    SKU: <span>{ product.sku }</span>
                                </div>
                            </div>

                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <Tabs
                                    defaultActiveKey="description"
                                    id="uncontrolled-tab-example"
                                    className="mb-3"
                                >
                                    <Tab eventKey="description" title="description">
                                        <div dangerouslySetInnerHTML={ { __html: product.description } } />
                                    </Tab>
                                    <Tab eventKey="reviews" title="reviews">
                                        Reviews
                                    </Tab>
                                </Tabs>
                            </div>
                        </div>
                    </>
                ) }

            </div>
        </Layout >
    )
}

export default Product
