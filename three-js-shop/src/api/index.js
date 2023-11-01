import request from "@/libs/request.js";

export const getHomePage = (params)=> {
    return request({
        method: "GET",
        url: "/homepage",
        params
    })
}

export const getProducts = ()=> {
    return request({
        method: "GET",
        url: "/products"
    })
}