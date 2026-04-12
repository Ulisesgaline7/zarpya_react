import MainApi from "../../../MainApi";
import { services_providers_api } from "../../../ApiRoutes";
import { useQuery } from "react-query";
import { onSingleErrorResponse } from "../../../api-error-response/ErrorResponses";

const getData = async ({ category_id, zone_id, page = 1 }) => {
  const params = new URLSearchParams({ page });
  if (category_id) params.append("category_id", category_id);
  if (zone_id) params.append("zone_id", zone_id);
  const { data } = await MainApi.get(`${services_providers_api}?${params}`);
  return data;
};

export default function useGetServiceProviders({ category_id, zone_id, page } = {}) {
  return useQuery(
    ["service-providers", category_id, zone_id, page],
    () => getData({ category_id, zone_id, page }),
    {
      onError: onSingleErrorResponse,
      // No fallar si no hay datos aún
      retry: 1,
    }
  );
}
