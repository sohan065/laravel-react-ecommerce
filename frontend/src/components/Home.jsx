import React from 'react'
import NewArrival from './common/NewArrival';
import FeaturedProducts from './common/FeaturedProducts';
import Hero from './common/Hero';
import Layout from './common/Layout';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <>
            <Layout>
                <Hero />
                <NewArrival />
                <FeaturedProducts />
                <div className="shop">
                    <div className="container text-center m-5">
                        <Link to="/shop" className="btn btn-primary">Shop Now</Link>
                    </div>
                </div>
            </Layout>

        </>
    )
}

export default Home
