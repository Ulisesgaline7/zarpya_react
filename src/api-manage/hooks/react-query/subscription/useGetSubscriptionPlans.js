import MainApi from "../../../MainApi";
import { subscription_plans_api } from "../../../ApiRoutes";
import { useQuery } from "react-query";
import { onSingleErrorResponse } from "../../../api-error-response/ErrorResponses";

const getData = async () => {
  const { data } = await MainApi.get(subscription_plans_api);
  return data;
};

export default function useGetSubscriptionPlans() {
  return useQuery("subscription-plans", getData, {
    onError: onSingleErrorResponse,
  });
}
