import axios from 'axios';
import { MAIN_URL } from '@/common/Url';
export function userLogin(data)
{
    return axios.post(`${MAIN_URL}login`,data)
}

export function userRegister(data)
{
    return axios.post(`${MAIN_URL}register`,data)
}

export function userLogout(data,token)
{
    return axios.post(`${MAIN_URL}logout`,data,token)
}

export function postContact(data)
{
    return axios.post(`${MAIN_URL}contacts`,data)
}
//banner Data 
export function getBannersData()
{
    return axios.get(`${MAIN_URL}banners`)
}
//category 
export function getCategoryData()
{
    return axios.get(`${MAIN_URL}category`)
}
//products
export function getProductsData()
{
    return axios.get(`${MAIN_URL}products`)
}
//products images
export function getProductImagessData(id)
{
    return axios.get(`${MAIN_URL}products/${id}`)
}
//all product data
//products data by id
export function getProductsDataById(id)
{
    return axios.get(`${MAIN_URL}products/${id}`)
}
export function postUserData(data,token)
{
    return axios.post(`${MAIN_URL}logout`,data,token)
}
export function showUserData(data,body,token)
{
    const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const bodyParameters = {
        body
      };
    return axios.get(`${MAIN_URL}user/${data}`,bodyParameters,config)
}
//address
export function addUserAddressData(data)
{
    return axios.post(`${MAIN_URL}addAddress`,data,)
}
export function userAddressData(id)
{
    return axios.get(`${MAIN_URL}addAddress/${id}`)
}
export function editUserAddressData(id,data)
{
    return axios.put(`${MAIN_URL}addAddress/${id}`,data)
}
export function userAddressDelete(id)
{
    return axios.delete(`${MAIN_URL}addAddress/${id}`)
}

//Cart
export function addUserCartData(data)
{
    return axios.post(`${MAIN_URL}cart`,data,)
}
export function userCartData(id)
{
    return axios.get(`${MAIN_URL}cart/${id}`)
}
export function editUserCartData(id,data)
{
    return axios.put(`${MAIN_URL}cart/${id}`,data)
}
export function userCartDelete(id)
{
    return axios.delete(`${MAIN_URL}cart/${id}`)
}
//coupon 
export function coupon()
{
    return axios.get(`${MAIN_URL}coupon`)
}
//orders
export function makeOrder(data)
{
    return axios.post(`${MAIN_URL}orders`,data)
}
//wishlist
export function getWishlist(id)
{
    return axios.get(`${MAIN_URL}wishlist/${id}`)
}
export function deletewishlist(id)
{
    return axios.delete(`${MAIN_URL}wishlist/${id}`)
}
export function postwishlist(data)
{
    return axios.post(`${MAIN_URL}wishlist`,data)
}
export function getPassword(id)
{
    return axios.get(`${MAIN_URL}password/${id}`)
}
//cms
export function getcms()
{
    return axios.get(`${MAIN_URL}cms`,)
}
export function getcmsbyId(id)
{
    return axios.get(`${MAIN_URL}cms/${id}`,)
}



export default {userLogin,userRegister,postContact,userLogout,getBannersData,
    getCategoryData,getProductsData,getProductImagessData,postUserData,showUserData,
    addUserAddressData,userAddressData,editUserAddressData,userAddressDelete,getProductsDataById,
    addUserCartData,userCartData,editUserCartData,userCartDelete,coupon,makeOrder
    ,getWishlist,deletewishlist,postwishlist,getPassword,getcms,getcmsbyId};

