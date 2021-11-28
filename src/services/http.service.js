import axios from "axios";
import { errorNotification } from "./notification.service";

const config = {
  baseURL: `${process.env.VUE_APP_API_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
};


const httpService = axios.create(config);

const authInterceptor = (config) => {

  return config;
};

httpService.interceptors.request.use(authInterceptor);

httpService.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error)
    if (error.response.status === 401) {
      // Throw Unauthorized Error Message
      errorNotification(
        "You are not authorized to view this page. Stay safe as you go home. :)"
      );
    } else if (error.response.status === 404) {
      if (error.response.data.message) {
        errorNotification(error.response.data.message);
      }
    } else if (error.response.status === 500) {
      errorNotification("Something went wrong");
    }
    return Promise.reject(error);
  }
);

export { httpService };
