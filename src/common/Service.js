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

export default {userLogin,userRegister,postContact,userLogout,getBannersData,getCategoryData,getProductsData,getProductImagessData};

