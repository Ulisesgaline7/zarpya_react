import MainApi from "../../../MainApi";
import { taxi_request_api } from "../../../ApiRoutes";
import { useMutation } from "react-query";

const postData = async (formData) => {
  const { data } = await MainApi.post(taxi_request_api, formData);
  return data;
};

export default function useTaxiRequest() {
  return useMutation("taxi-request", postData);
}
