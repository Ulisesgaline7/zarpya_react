import MainApi from "../../../MainApi";
import { my_service_requests_api } from "../../../ApiRoutes";
import { useQuery } from "react-query";
import { onSingleErrorResponse } from "../../../api-error-response/ErrorResponses";

const getData = async () => {
  const { data } = await MainApi.get(my_service_requests_api);
  return data;
};

export default function useGetMyServiceRequests() {
  return useQuery("my-service-requests", getData, {
    onError: onSingleErrorResponse,
  });
}
