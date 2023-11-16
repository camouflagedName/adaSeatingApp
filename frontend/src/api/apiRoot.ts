console.log(process.env.NODE_ENV )

const prodURL = 'https://ada-seating-server-51a972bcadaa.herokuapp.com/' 
//console.log(process.env.PORT)
const API_ROOT = process.env.NODE_ENV === 'development' ? 'http://localhost:30001/': prodURL;

export default API_ROOT;