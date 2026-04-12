import MainApi from "../../../MainApi";
import { taxi_ride_api } from "../../../ApiRoutes";
import { useQuery } from "react-query";
import { onSingleErrorResponse } from "../../../api-error-response/ErrorResponses";

const getData = async (rideId) => {
  const { data } = await MainApi.get(`${taxi_ride_api}/${rideId}`);
  return data;
};

export default function useGetTaxiRide(rideId) {
  return useQuery(["taxi-ride", rideId], () => getData(rideId), {
    enabled: !!rideId && !isNaN(rideId),
    refetchInterval: 10000,
    retry: 1,
    onError: onSingleErrorResponse,
  });
}
