import React, { useEffect, useState, useRef, useMemo } from 'react'
import Sidebar from '../../common/Sidebar'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { apiUrl, getToken } from '../../common/Http'
import { toast } from 'react-toastify'
import Layout from '../../common/Layout'
import JoditEditor from 'jodit-react';
const CreateProduct = ({ placeholder }) => {

    const navigate = useNavigate();
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    const [imageIds, setImageIds] = useState([]);
    const [galleries, setGalleries] = useState([]);

    const [sizes, setSizes] = useState([]);

    const editor = useRef(null);
    const [content, setContent] = useState('');
    const config = useMemo(() => ({
        readonly: false, // all options from https://xdsoft.net/jodit/docs/,
        placeholder: placeholder || ''
    }),
        [placeholder]
    );

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        const payload = { ...data, description: content, image_id: imageIds };

        const result = await fetch(`${apiUrl}/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`,
            },
            body: JSON.stringify(payload),
        });
        const res = await result.json();
        if (res.status !== 201) {
            console.error('Error creating product:', result.message);
        }
        toast.success('product Create Successfully!');
        navigate('/admin/product');
    };

    const fetchBrands = async () => {
        setLoading(true);
        try {
            const result = await fetch(`${apiUrl}/brands`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${getToken()}`
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

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const result = await fetch(`${apiUrl}/categories`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${getToken()}`
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

    const fetchSizes = async () => {
        setLoading(true);
        try {
            const result = await fetch(`${apiUrl}/product/sizes`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${getToken()}`
                }
            });
            const res = await result.json();
            if (res.status === 200) {
                setLoading(false);
                setSizes(res.data);
            } else {
                console.error('Error fetching sizes:', res.message);
            }
        } catch (error) {
            console.error('Error fetching sizes:', error);
        }
    }

    useEffect(() => {
        fetchBrands();
        fetchCategories();
        fetchSizes();
    }, [])

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        const formDate = new FormData();
        formDate.append('image', file);

        const result = await fetch('http://127.0.0.1:8000/api/temp-image/', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${getToken()}`,
            },
            body: formDate,
        });
        const res = await result.json();
        setImageIds(prev => [...prev, res.data.id]);
        setGalleries(prev => [...prev, res.data.image_url]);

    }

    const deleteImage = (image) => {
        setGalleries(galleries.filter((gallery) => gallery !== image));
    };

    return (
        <>

            <Layout>
                <div className="container">
                    <div className="row">
                        {/* sidebar */ }
                        <div className="mt-3 mb-3">
                            <h4 className="text-center">Welcome to Admin Dashboard</h4>
                        </div>
                        <div className="col-md-3">
                            <Sidebar />
                        </div>
                        {/* main */ }
                        <div className="col-md-9">
                            <div className="row">
                                <div className="d-flex justify-content-between align-items-center">
                                    <h1>Create Product</h1>
                                    <Link to={ `/admin/product` } className='btn btn-primary'>Go Back</Link>
                                </div>
                                <div className="col-md-12">
                                    <div className="card shadow">
                                        <div className="card-body">
                                            <form onSubmit={ handleSubmit(onSubmit) } encType="multipart/form-data">

                                                <div className="mb-3">
                                                    <label htmlFor="title" className="form-label">title</label>
                                                    <input
                                                        type="text"
                                                        { ...register('title', { required: true }) }
                                                        className="form-control"
                                                        id="title"
                                                        placeholder="Enter product title"
                                                    />
                                                    { errors.title && <p className="text-danger">Product Name is required</p> }
                                                </div>

                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="mb-3">
                                                            <label htmlFor="category_id" className="form-label">category</label>
                                                            <select
                                                                { ...register('category_id', { required: true }) }
                                                                className="form-select"
                                                                id="category_id"
                                                            >
                                                                <option value="">-- Select Category --</option>
                                                                { categories && categories.map((category) => {
                                                                    return (
                                                                        <option key={ category.id } value={ category.id }>{ category.name }</option>
                                                                    )
                                                                }) }

                                                            </select>
                                                            { errors.category_id && <p className="text-danger"> Product category is required</p> }
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="mb-3">
                                                            <label htmlFor="brand_id" className="form-label">brand</label>
                                                            <select
                                                                { ...register('brand_id', { required: true }) }
                                                                className="form-select"
                                                                id="brand_id"
                                                            >
                                                                <option value="">-- Select Brand --</option>
                                                                { brands && brands.map((brand) => {
                                                                    return (
                                                                        <option key={ brand.id } value={ brand.id }>{ brand.name }</option>
                                                                    )
                                                                }) }
                                                            </select>
                                                            { errors.brand_id && <p className="text-danger"> Product brand is required</p> }
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="mb-3">
                                                    <label htmlFor="short_description" className="form-label">Short Description</label>
                                                    <textarea
                                                        type="text"
                                                        { ...register('short_description', { required: true }) }
                                                        className="form-control"
                                                        id="short_description"
                                                        placeholder="short description"
                                                    />
                                                    { errors.short_description && <p className="text-danger">Product Name is required</p> }
                                                </div>

                                                <div className="mb-3">
                                                    <label htmlFor="" className="form-label">Description</label>
                                                    <JoditEditor
                                                        ref={ editor }
                                                        value={ content }
                                                        config={ config }
                                                        tabIndex={ 1 } // tabIndex of textarea
                                                        onBlur={ newContent => setContent(newContent) } // preferred to use only this option to update the content for performance reasons
                                                    />
                                                </div>

                                                <h3 className="border-bottom py-3 mb-3">Pricing</h3>

                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="mb-3">
                                                            <label htmlFor="price" className="form-label">Price</label>
                                                            <input
                                                                type="text"
                                                                { ...register('price', { required: true }) }
                                                                className="form-control"
                                                                id="price"
                                                                placeholder="price"
                                                            />
                                                            { errors.price && <p className="text-danger"> Product price is required</p> }
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="mb-3">
                                                            <label htmlFor="compare_price" className="form-label">Compare Price</label>
                                                            <input
                                                                type="text"
                                                                { ...register('compare_price', { required: true }) }
                                                                className="form-control"
                                                                id="compare_price"
                                                                placeholder="discount price"
                                                            />
                                                            { errors.compare_price && <p className="text-danger"> Product price is required</p> }
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="mb-3">
                                                            <label htmlFor="sku" className="form-label">Sku</label>
                                                            <input
                                                                type="text"
                                                                { ...register('sku', { required: true }) }
                                                                className="form-control"
                                                                id="sku"
                                                                placeholder="sku"
                                                            />
                                                            { errors.sku && <p className="text-danger"> Product sku is required</p> }
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="mb-3">
                                                            <label htmlFor="barcode" className="form-label">Barcode</label>
                                                            <input
                                                                type="text"
                                                                { ...register('barcode', { required: true }) }
                                                                className="form-control"
                                                                id="barcode"
                                                                placeholder="barcode"
                                                            />
                                                            { errors.barcode && <p className="text-danger"> Product barcode is required</p> }
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <div className="mb-3">
                                                            <label htmlFor="qty" className="form-label">Qty</label>
                                                            <input
                                                                type="text"
                                                                { ...register('qty', { required: true }) }
                                                                className="form-control"
                                                                id="qty"
                                                                placeholder="qty"
                                                            />
                                                            { errors.qty && <p className="text-danger"> Product qty is required</p> }
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="mb-3">
                                                            <label htmlFor="status" className="form-label">Status</label>
                                                            <select
                                                                { ...register('status', { required: true }) }
                                                                className="form-select"
                                                                id="status"
                                                            >
                                                                <option value="">-- Select Status --</option>
                                                                <option value="1">Active</option>
                                                                <option value="0">Inactive</option>
                                                            </select>
                                                            { errors.status && <p className="text-danger">Status is required</p> }
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="mb-3">
                                                            <label htmlFor="is_featured" className="form-label">Featured</label>
                                                            <select
                                                                { ...register('is_featured', { required: true }) }
                                                                className="form-select"
                                                                id="is_featured"
                                                            >
                                                                <option value="">-- Select One --</option>
                                                                <option value="1">Yes</option>
                                                                <option value="0">No</option>
                                                            </select>
                                                            { errors.is_featured && <p className="text-danger">Featured is required</p> }
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="mb-3">
                                                    <label htmlFor="image" className="form-label">Image</label>
                                                    <input
                                                        type="file"
                                                        onChange={ handleFileChange }
                                                        className="form-control"
                                                        id="image"
                                                    />
                                                </div>

                                                <div className="mb-3">
                                                    <div className="row">

                                                        { galleries && galleries.map((image, index) => (
                                                            <div className="col-md-3" key={ index }>
                                                                <div className="card shadow">
                                                                    <img src={ image } alt="gallery" height={ 90 } />
                                                                </div>
                                                                <button className='btn btn-danger mt-2' onClick={ () => deleteImage(image) }>
                                                                    Delete
                                                                </button>
                                                            </div>
                                                        )) }
                                                    </div>
                                                </div>

                                                <div className="mb-3">

                                                    { sizes && sizes.map((size) => {
                                                        return (
                                                            <div className="form-check-inline " key={ size.id }>
                                                                <input
                                                                    { ...register('size_id', { required: true }) }
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    value={ size.id }
                                                                    id={ `size-${size.id}` }
                                                                />
                                                                <label className="form-check-label ps-2" htmlFor={ `size-${size.id}` }>
                                                                    { size.name || 'Default checkbox' }
                                                                </label>
                                                            </div>
                                                        );
                                                    }) }

                                                </div>

                                                <button type="submit" className="btn btn-primary">Submit</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </Layout>

        </>
    )
}

export default CreateProduct
