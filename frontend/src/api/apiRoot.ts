const prodURL = '' 
//console.log(process.env.PORT)
const API_ROOT = process.env.NODE_ENV === 'development' ? 'localhost:30001': prodURL;

export default API_ROOT;