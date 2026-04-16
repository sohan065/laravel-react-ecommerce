import React, { useEffect, useState } from 'react'
import { apiUrl } from './Http';
import { Link } from 'react-router-dom';
const FeaturedProducts = () => {

    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [loading, setLoading] = useState(false);


    const fetchFeaturedProducts = async () => {
        setLoading(true);
        try {
            const result = await fetch(`${apiUrl}/products/featured`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const res = await result.json();
            if (res.status === 200) {
                setFeaturedProducts(res.data);
            } else {
                console.error('Error fetching products:', res.message);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchFeaturedProducts();
    }, [])

    return (
        <section className='section-2 py-5'>
            <div className="container">
                <h1>Featured Products</h1>
                <div className="row mt-4">

                    { featuredProducts && featuredProducts.map((product) => {
                        return (

                            <div className="col-md-3" key={ product.id }>
                                <div className="product card border-0">
                                    <div className="card-img">
                                        <Link to={ `/product/${product.id}` }>
                                            <img src={ product.image_url } alt="" className='w-100' />
                                        </Link>
                                    </div>
                                    <div className="card-body">
                                        <Link href={ `/product/${product.id}` }>{ product.title }</Link>
                                        <div className="price">
                                            ${ product.price } { product.compare_price && (
                                                <span className='text-decoration-line-through'>
                                                    ${ product.compare_price }
                                                </span>
                                            ) }
                                        </div>
                                    </div>
                                </div>
                            </div>

                        );
                    }) }
                </div>
            </div>
        </section>
    )
}

export default FeaturedProducts
