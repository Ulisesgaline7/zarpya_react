import MainApi from "../../../MainApi";
import { taxi_cancel_api } from "../../../ApiRoutes";
import { useMutation } from "react-query";

const postData = async ({ rideId, reason }) => {
  const { data } = await MainApi.post(`${taxi_cancel_api}/${rideId}/cancel`, { reason });
  return data;
};

export default function useTaxiCancel() {
  return useMutation("taxi-cancel", postData);
}
