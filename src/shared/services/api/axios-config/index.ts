import axios from "axios";
import { Environment } from "../../../environment";
import { errorInterceptor } from "./interceptors/errorInterceptor";
import { responseInterceptor } from "./interceptors/responseInterceptor";

const Api = axios.create({
  baseURL: Environment.URL_BASE,
});

Api.interceptors.response.use(
  (response) => responseInterceptor(response),
  (error) => errorInterceptor(error)
);

export { Api };
