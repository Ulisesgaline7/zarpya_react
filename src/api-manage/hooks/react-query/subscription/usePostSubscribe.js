import MainApi from "../../../MainApi";
import { subscribe_plan_api } from "../../../ApiRoutes";
import { useMutation } from "react-query";

const postData = async ({ plan_type, payment_method }) => {
  const { data } = await MainApi.post(subscribe_plan_api, { plan_type, payment_method });
  return data;
};

export default function usePostSubscribe() {
  return useMutation("subscribe-plan", postData);
}
