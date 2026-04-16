import React, { useEffect, useState } from 'react'
import Layout from './common/Layout'
import { Link, useSearchParams } from 'react-router-dom'
import { apiUrl } from './common/Http'
import Loading from './common/Loading'

const Shop = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const [brands, setBrands] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState(() => {
        const brands = searchParams.get('brands');
        return brands ? brands.split(',') : [];
    });
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState(() => {
        const categories = searchParams.get('categories');
        return categories ? categories.split(',') : [];
    });
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState('');


    const fetchProducts = async () => {

        let params = new URLSearchParams();
        if (selectedCategories.length > 0) {
            params.append('categories', selectedCategories.join(','));
        }

        if (selectedBrands.length > 0) {
            params.append('brands', selectedBrands.join(','));
        }
        setSearchParams(params);

        setLoading(true);
        try {
            const result = await fetch(`${apiUrl}/get-products?${params}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'accept': 'application/json',
                }
            });
            const res = await result.json();
            if (res.status === 200) {
                setLoading(false);
                setProducts(res.data);
            } else {
                console.error('Error fetching products:', res.message);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const result = await fetch(`${apiUrl}/products/categories`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'accept': 'application/json',
                }
            });
            const res = await result.json();
            if (res.status === 200) {
                setLoading(false);
                setCategories(res.data);
            } else {
                console.error('Error fetching categories:', res.message);
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    }

    const fetchBrands = async () => {
        setLoading(true);
        try {
            const result = await fetch(`${apiUrl}/products/brands`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'accept': 'application/json',
                }
            });
            const res = await result.json();
            if (res.status === 200) {
                setLoading(false);
                setBrands(res.data);
            } else {
                console.error('Error fetching brands:', res.message);
            }
        } catch (error) {
            console.error('Error fetching brands:', error);
        }
    }

    const handleSelectedCategory = (e) => {
        const { checked, value } = e.target;
        if (checked) {
            setSelectedCategories(pre => [...pre, value]);
        } else {
            setSelectedCategories(selectedCategories.filter((sc) => sc != value));
        }
    }

    const handleSelectedBrand = (e) => {
        const { checked, value } = e.target;
        if (checked) {
            setSelectedBrands(pre => [...pre, value]);
        } else {
            setSelectedBrands(selectedBrands.filter((sb) => sb != value));
        }
    }

    useEffect(() => {
        fetchProducts();
        fetchCategories();
        fetchBrands();
    }, [selectedCategories, selectedBrands])

    return (
        <>
            <Layout>
                <div className="container">

                    {/* breadcrumb */ }
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="#">Home</a></li>
                            <li className="breadcrumb-item active" aria-current="page">Shop</li>
                        </ol>
                    </nav>
                    <div className="row">
                        {/* categories & Brands */ }
                        <div className="col-md-3">
                            {/* categories */ }
                            <div className="card shadow mb-5">
                                <div className="card-header">
                                    <h4>Categories</h4>
                                </div>
                                <div className="card-body">
                                    <ul>
                                        { categories && categories.map((category) => {
                                            return (
                                                <li key={ category.id }>
                                                    <input
                                                        defaultChecked={ searchParams.get('categories') ? searchParams.get('categories').includes(category.id) : false }
                                                        type="checkbox"
                                                        value={ category.id }
                                                        onChange={ handleSelectedCategory } />
                                                    <label htmlFor="" className='ps-2'>{ category.name }</label>
                                                </li>
                                            )
                                        }) }
                                    </ul>
                                </div>
                            </div>
                            {/* brands */ }
                            <div className="card shadow mb-5">
                                <div className="card-header">
                                    <h4>Brands</h4>
                                </div>
                                <div className="card-body">
                                    <ul>
                                        { brands && brands.map((brand) => {
                                            return (
                                                <li key={ brand.id }>
                                                    <input
                                                        defaultChecked={ searchParams.get('brands') ? searchParams.get('brands').includes(brand.id) : false }
                                                        type="checkbox"
                                                        value={ brand.id }
                                                        onChange={ handleSelectedBrand } />
                                                    <label htmlFor="" className='ps-2'>{ brand.name }</label>
                                                </li>
                                            )
                                        }) }
                                    </ul>
                                </div>
                            </div>
                        </div>
                        {/* Products */ }
                        <div className="col-md-9">
                            <div className="row">
                                { loading ? (
                                    <Loading />
                                ) : (
                                    <>
                                        { products && products.map((product) => {
                                            return (
                                                <div className="col-md-3" key={ product.id }>
                                                    <div className="product card border-0">
                                                        <div className="card-img">
                                                            <Link to={ `/product/${product.id}` }>
                                                                <img src={ product.image_url } alt="" srcSet="" className='w-100' />
                                                            </Link>
                                                        </div>
                                                        <div className="card-body">
                                                            <Link to={ `/product/${product.id}` }>{ product.title }</Link>
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
                                            )
                                        }) }
                                    </>
                                ) }
                            </div>
                        </div>
                    </div>
                </div>
            </Layout >

        </>
    )
}

export default Shop
