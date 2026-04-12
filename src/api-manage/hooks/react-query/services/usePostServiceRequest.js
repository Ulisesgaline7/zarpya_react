import MainApi from "../../../MainApi";
import { service_request_api } from "../../../ApiRoutes";
import { useMutation } from "react-query";

const postData = async (formData) => {
  const { data } = await MainApi.post(service_request_api, formData);
  return data;
};

export default function usePostServiceRequest() {
  return useMutation("service-request", postData);
}
