import Home from './components/Home';
import Shop from './components/Shop';
import Cart from './components/Cart';
import Product from './components/Product';
import CheckOut from './components/CheckOut';
import Login from './components/admin/Login';
import UserLogin from './components/user/Login';
import Show from './components/admin/category/Show';
import Edit from './components/admin/category/Edit';
import Dashboard from './components/admin/Dashboard';
import Create from './components/admin/category/Create';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AdminRequireAuth } from './components/admin/AdminRequireAuth';
import ShowBrand from './components/admin/brand/ShowBrand';
import EditBrand from './components/admin/brand/EditBrand';
import CreateBrand from './components/admin/brand/CreateBrand';
import CreateProduct from './components/admin/product/CreateProduct';
import EditProduct from './components/admin/product/EditProduct';
import ShowProduct from './components/admin/product/ShowProduct';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Registration from './components/user/Registration';
import Profile from './components/user/Profile';
import { RequireAuth } from './components/user/RequireAuth';
import Confirmation from './components/Confirmation';
import ShowOrder from './components/admin/order/ShowOrder';
import OrderDetails from './components/admin/order/OrderDetails';
import Order from './components/user/Order';
import UserOrderDetails from './components/user/UserOrderDetails';
import Shipping from './components/admin/Shipping/Shipping';
import EditShipping from './components/admin/Shipping/EditShipping';
import CreateShipping from './components/admin/Shipping/CreateShipping';
import Coupon from './components/admin/coupon/Coupon';
import CreateCoupon from './components/admin/coupon/CreateCoupon';
function App () {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <Home /> } />
          <Route path='/shop' element={ <Shop /> } />
          <Route path='/product/:id' element={ <Product /> } />
          <Route path='/cart' element={ <Cart /> } />
          <Route path='/checkout' element={
            <RequireAuth>
              <CheckOut />
            </RequireAuth>
          } />
          <Route path='/user/registration' element={ <Registration /> } />
          <Route path='/user/login' element={ <UserLogin /> } />

          <Route path='/confirmation/:id' element={ <Confirmation /> } />
          <Route path='/user/profile' element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          } />

          <Route path='/user/order' element={
            <RequireAuth>
              <Order />
            </RequireAuth>
          } />

          <Route path='/user/order/:id' element={
            <RequireAuth>
              <UserOrderDetails />
            </RequireAuth>
          } />

          <Route path='/admin/login' element={ <Login /> } />
          <Route path='/admin/dashboard' element={
            <AdminRequireAuth>
              <Dashboard />
            </AdminRequireAuth>
          } />
          <Route path='/admin/category' element={
            <AdminRequireAuth>
              <Show />
            </AdminRequireAuth>
          } />
          <Route path='/admin/category/create' element={
            <AdminRequireAuth>
              <Create />
            </AdminRequireAuth>
          } />
          <Route path='/admin/category/edit/:id' element={
            <AdminRequireAuth>
              <Edit />
            </AdminRequireAuth>
          } />

          <Route path='/admin/brand/create' element={
            <AdminRequireAuth>
              <CreateBrand />
            </AdminRequireAuth>
          } />
          <Route path='/admin/brand' element={
            <AdminRequireAuth>
              <ShowBrand />
            </AdminRequireAuth>
          } />
          <Route path='/admin/brand/edit/:id' element={
            <AdminRequireAuth>
              <EditBrand />
            </AdminRequireAuth>
          } />

          <Route path='/admin/product/create' element={
            <AdminRequireAuth>
              <CreateProduct />
            </AdminRequireAuth>
          } />
          <Route path='/admin/product' element={
            <AdminRequireAuth>
              <ShowProduct />
            </AdminRequireAuth>
          } />
          <Route path='/admin/product/edit/:id' element={
            <AdminRequireAuth>
              <EditProduct />
            </AdminRequireAuth>
          } />
          <Route path='/admin/order' element={
            <AdminRequireAuth>
              <ShowOrder />
            </AdminRequireAuth>
          } />
          <Route path='/admin/order/:id' element={
            <AdminRequireAuth>
              <OrderDetails />
            </AdminRequireAuth>
          } />
          <Route path='/admin/shipping/create' element={
            <AdminRequireAuth>
              <CreateShipping />
            </AdminRequireAuth>
          } />
          <Route path='/admin/shipping' element={
            <AdminRequireAuth>
              <Shipping />
            </AdminRequireAuth>
          } />
          <Route path='/admin/shipping/charge/edit/:id' element={
            <AdminRequireAuth>
              <EditShipping />
            </AdminRequireAuth>
          } />
          <Route path='/admin/coupon' element={
            <AdminRequireAuth>
              <Coupon />
            </AdminRequireAuth>
          } />
          <Route path='/admin/coupon/create' element={
            <AdminRequireAuth>
              <CreateCoupon />
            </AdminRequireAuth>
          } />
        </Routes>
      </BrowserRouter>
      <ToastContainer position="top-right" autoClose={ 3000 } />
    </>
  )
}

export default App
