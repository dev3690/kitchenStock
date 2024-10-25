// import axios from "axios"

// // const localApiUrl = "http://27.116.52.24:8052"
// const localApiUrl = "http://localhost:3690"

// // All api routes

// const dashboardApi = `${localApiUrl}/dashboard`
// const loginApi = `${localApiUrl}/login`
// const getTableData = `${localApiUrl}/getData`
// const assignItemToPradesh = `${localApiUrl}/assignItemToPradesh`
// const getPradeshItemsDetails = (id) => `${localApiUrl}/getPradeshItemsDetails`;
// const addReceiveItem = async (data) => {
//   const url = `${localApiUrl}/addReceiveItem`;
//   const { items, ...rest } = data;

//   const itemRecEntries = items.filter(item => !item.isOther).map(item => ({
//     table: "itemrecs",
//     ...rest,
//     itemId: Number(item.itemId),
//     qty: Number(item.qty)
//   }));

//   const otherEntries = items.filter(item => item.isOther).map(item => ({
//     table: "others",
//     ...rest,
//     itemName: item.itemName,
//     qty: Number(item.qty)
//   }));

//   const requestData = [...itemRecEntries, ...otherEntries];

//   try {
//     const response = await axios.post(url, data);
//     return response.data;
//   } catch (error) {
//     console.error('Error in addReceiveItem:', error);
//     throw error;
//   }
// };
// const downloadPradeshReceivedItems = () => `${localApiUrl}/downloadPradeshReceivedItems`;
// // const insertData = `${localApiUrl}/insertData`
// // const insertPatient = `${localApiUrl}/insertPatient`
// // const loginApi = `${localApiUrl}/login`
// // const birdViewApi = `${localApiUrl}/birdView`
// // const updateData = `${localApiUrl}/updateData`
// // const deleteData = `${localApiUrl}/deleteData`
// // const getDashboardData = `${localApiUrl}/getDashboardData`


// const headers = {
//     'Content-Type': 'application/json'
// }


// // common function to make api calls
// const callAxiosApi = async (url = "", body = {}, responseType = 'json') => {
//     const data = JSON.stringify(body);

//     const config = {
//         method: 'post',
//         url,
//         headers,
//         data,
//         responseType


//     };

//     try {
//         const response = await axios.request(config);
//         return response;
//     } catch (error) {
//         return error;
//     }
// };

// // table names

// // const USER = "user"
// // const STATUS = "statusUpdate"
// // const PATIENT = "patient"


// export {
//     dashboardApi,
//     callAxiosApi,
//     getPradeshItemsDetails,
//     loginApi,
//     getTableData,
//     assignItemToPradesh,
//     downloadPradeshReceivedItems,
//     addReceiveItem
//     // USER, STATUS, getData, PATIENT, deleteData, loginApi, insertData, updateData, birdViewApi,getDashboardData, , insertPatient 
// }
