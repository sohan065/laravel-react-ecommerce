import React, { useContext } from 'react'
import Header from '../common/Header'
import Footer from '../common/Footer'
import Sidebar from '../common/Sidebar'

const Dashboard = () => {

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
                            <div className="col-md-4">
                                <div className="card shadow">
                                    <div className="card-body">
                                        <h5 className="text-center">Total Users</h5>
                                        <h1 className="text-center">100</h1>
                                    </div>
                                    <div className="card-footer">
                                        <a href="">View Users</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card shadow">
                                    <div className="card-body">
                                        <h5 className="text-center">Total Orders</h5>
                                        <h1 className="text-center">50</h1>
                                    </div>
                                    <div className="card-footer">
                                        <a href="">View Orders</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card shadow">
                                    <div className="card-body">
                                        <h5 className="text-center">Total Products</h5>
                                        <h1 className="text-center">200</h1>
                                    </div>
                                    <div className="card-footer">
                                        <a href="">View Products</a>
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

export default Dashboard
