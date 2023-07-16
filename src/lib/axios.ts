import axios from 'axios'

let baseUrl = 'http://localhost:3000'

if (process.env.NODE_ENV !== 'development') {
	baseUrl = 'https://next13-ecommerce-admin-obqpssrxz-russoakham.vercel.app/'
}

export default axios.create({
	baseURL: baseUrl,
})
