import MainApi from "../../../MainApi";
import { services_categories_api } from "../../../ApiRoutes";
import { useQuery } from "react-query";
import { onSingleErrorResponse } from "../../../api-error-response/ErrorResponses";

const getData = async () => {
  const { data } = await MainApi.get(services_categories_api);
  return data;
};

export default function useGetServiceCategories() {
  return useQuery("service-categories", getData, {
    onError: onSingleErrorResponse,
  });
}
