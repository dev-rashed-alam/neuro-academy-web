import {apiHandler} from "../components/Config/ApiHandler";

export const doLogin = (requestBody) => {
   return apiHandler.POST("login", requestBody)
}