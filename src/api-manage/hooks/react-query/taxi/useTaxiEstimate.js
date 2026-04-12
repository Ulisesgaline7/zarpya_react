import MainApi from "../../../MainApi";
import { taxi_estimate_api } from "../../../ApiRoutes";
import { useMutation } from "react-query";

const postData = async (formData) => {
  const { data } = await MainApi.post(taxi_estimate_api, formData);
  return data;
};

export default function useTaxiEstimate() {
  return useMutation("taxi-estimate", postData);
}
