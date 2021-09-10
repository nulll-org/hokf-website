import axios from 'axios';
// import loadingModule from '@/store/modules/loading.module';

const config = {
    baseURL: `${process.env.VUE_APP_API_URL}`,
    headers: {
        'Content-Type': 'application/json',
    }
}

let activeRequests = 0;

const httpService = axios.create(config);

const authInterceptor = (config) => {
    if (activeRequests === 0) {
        // loadingModule.startLoading()
    }

    activeRequests++

    return config
}

httpService.interceptors.request.use(authInterceptor)

httpService.interceptors.response.use(
    (response) => {
        activeRequests--
        if (activeRequests === 0) {
            // loadingModule.stopLoading()
        }

        return response
    },
    (error) => {
        activeRequests--
        if (activeRequests === 0) {
            // loadingModule.stopLoading()
        }
        // console.log(error.response.data.detail)
        if (error.response.status === 401) {
            // Throw Unauthorized Error Message
        } else if (error.response.status === 404) {
            console.log(error.response.data.message)
        } else if (error.response.status === 500) {
            console.log('Something went wrong')
        }
        return Promise.reject(error);
    }
)

export { httpService }

