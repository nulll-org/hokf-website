import axios from "axios";
import loading from "../store/modules/loading";
import { errorNotification } from "./notification.service";

const config = {
  baseURL: `${process.env.VUE_APP_API_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
};

let activeRequests = 0;

const httpService = axios.create(config);

const authInterceptor = (config) => {
  if (activeRequests === 0) {
    loading.startLoading();
  }

  activeRequests++;

  return config;
};

httpService.interceptors.request.use(authInterceptor);

httpService.interceptors.response.use(
  (response) => {
    activeRequests--;
    if (activeRequests === 0) {
      loading.stopLoading();
    }

    return response;
  },
  (error) => {
    activeRequests--;
    if (activeRequests === 0) {
      loading.stopLoading();
    }
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
