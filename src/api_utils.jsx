import axios from "axios"

// const localApiUrl = "http://27.116.52.24:8084"
// const localApiUrl = "http://192.168.29.73:3690"
// const localApiUrl = "http://localhost:8085"
const localApiUrl = "http://localhost:3690"

// All api routes

const dashboardApi = `${localApiUrl}/dashboard`
const loginApi = `${localApiUrl}/login`

const getPradeshItemsDetails = (id) => `${localApiUrl}/getPradeshItemsDetails`;
// const insertData = `${localApiUrl}/insertData`
// const insertPatient = `${localApiUrl}/insertPatient`
// const loginApi = `${localApiUrl}/login`
// const birdViewApi = `${localApiUrl}/birdView`
// const updateData = `${localApiUrl}/updateData`
// const deleteData = `${localApiUrl}/deleteData`
// const getDashboardData = `${localApiUrl}/getDashboardData`


const headers = {
    'Content-Type': 'application/json'
}


// common function to make api calls
const callAxiosApi = async (url = "", body = {}) => {
    const data = JSON.stringify(body);

    const config = {
        method: 'post',
        url,
        headers,
        data
    };

    try {
        const response = await axios.request(config)
        return response
    } catch (error) {
        return error
    }

}

// table names

// const USER = "user"
// const STATUS = "statusUpdate"
// const PATIENT = "patient"


export { 
    dashboardApi, callAxiosApi, getPradeshItemsDetails, loginApi
    // USER, STATUS, getData, PATIENT, deleteData, loginApi, insertData, updateData, birdViewApi,getDashboardData, , insertPatient 
}