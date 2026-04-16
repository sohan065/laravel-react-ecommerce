import React, { use, useEffect, useState } from 'react'
import Header from '../../common/Header'
import { Link } from 'react-router-dom'
import Footer from '../../common/Footer'
import Sidebar from '../../common/Sidebar'
import Loading from '../../common/Loading'
import { apiUrl, getToken } from '../../common/Http'


const Show = () => {

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

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

    useEffect(() => {
        fetchCategories();
    }, []);

    const deleteCategory = async (id) => {
        if (confirm('Are you sure you want to delete this category?')) {

            const result = await fetch(`${apiUrl}/categories/${id}`, {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${getToken()}`,
                },
            });
            const res = await result.json();
            if (res.status === 200) {
                setCategories(categories.filter((category) => category.id !== id));
            } else {
                alert('Error deleting category:', res.message);
            }

        }
    }


    return (
        <>
            <Header />
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
                                <h1>Category</h1>
                                <Link to={ `/admin/category/create` } className='btn btn-primary'>Create Category</Link>
                            </div>
                            <div className="col-md-12">
                                <div className="card shadow">
                                    <div className="card-body">

                                        { loading ? (
                                            <Loading />
                                        ) : categories && categories.length > 0 ? (
                                            <table className="table">
                                                <thead>
                                                    <tr className="text-center">
                                                        <th>Id</th>
                                                        <th>Name</th>
                                                        <th>Status</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    { categories.map((category, index) => (
                                                        <tr className="text-center" key={ index }>
                                                            <td>{ index + 1 }</td>
                                                            <td>{ category.name }</td>
                                                            <td>
                                                                { category.status == 1 ? (
                                                                    <span className="badge text-bg-success">Active</span>
                                                                ) : (
                                                                    <span className="badge text-bg-danger">Inactive</span>
                                                                ) }
                                                            </td>
                                                            <td>
                                                                <Link to={ `/admin/category/edit/${category.id}` } className="btn btn-primary"><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"></path></svg></Link>
                                                                <Link className="btn btn-danger m-2" onClick={ () => deleteCategory(category.id) }><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                                                                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                                                                </svg></Link>
                                                            </td>
                                                        </tr>
                                                    )) }
                                                </tbody>
                                            </table>
                                        ) : (
                                            <div className="text-center py-4">
                                                <p className="text-muted">No records found.</p>
                                            </div>
                                        ) }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            <Footer />
        </>
    )
}

export default Show
