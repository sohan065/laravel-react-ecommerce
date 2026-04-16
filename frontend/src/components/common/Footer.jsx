import React from 'react'
import FooterLogo from '../../assets/images/logo-white.png';
const Footer = () => {
    return (
        <footer >
            <div className="container">
                <div className="row py-5">
                    <div className="col-md-3">
                        <img src={ FooterLogo } alt="" className='w-100' />
                        <div className="">
                            <p className='text-white'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.</p>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <h1 className='text-white'>Categories</h1>
                        <ul className='list-unstyled'>
                            <li><a href="" className='text-decoration-none text-white'>Mens</a></li>
                            <li><a href="" className='text-decoration-none text-white'>Women</a></li>
                            <li><a href="" className='text-decoration-none text-white'>Kids</a></li>

                        </ul>
                    </div>
                    <div className="col-md-3">
                        <h1 className='text-white'>Quick Links</h1>
                        <ul className='list-unstyled'>
                            <li><a href="" className='text-decoration-none text-white'>Log In</a></li>
                            <li><a href="" className='text-decoration-none text-white'>Register</a></li>
                        </ul>
                    </div>
                    <div className="col-md-3">
                        <h1 className='text-white'>Get In Touch</h1>
                        <ul className='list-unstyled'>
                            <li><a href="" className='text-decoration-none text-white'>+8801600000000</a></li>
                            <li><a href="" className='text-decoration-none text-white'>info@gmail.com</a></li>
                        </ul>
                    </div>
                </div>
                <div className="row spotlight text-white py-5 text-center">
                    <div className="col-md-4">
                        <div className="d-flex justify-content-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-truck" viewBox="0 0 16 16"><path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5zm1.294 7.456A2 2 0 0 1 4.732 11h5.536a2 2 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456M12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2"></path></svg>
                            <h3>Free Delivery</h3>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="d-flex justify-content-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-cash" viewBox="0 0 16 16"><path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4"></path><path d="M0 4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V6a2 2 0 0 1-2-2z"></path></svg>

                            <h3>Money back guaranty</h3>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="d-flex justify-content-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-credit-card-2-back" viewBox="0 0 16 16"><path d="M11 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5z"></path><path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm13 2v5H1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1m-1 9H2a1 1 0 0 1-1-1v-1h14v1a1 1 0 0 1-1 1"></path></svg>
                            <h3>Secure Payment</h3>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 text-center py-3">
                        <p className='text-white'>Copyright &copy; 2023 Clothing Era. All rights reserved.</p>
                    </div>
                </div>
            </div>

        </footer>
    )
}

export default Footer
