import React from "react";
import { Button, Stack, Typography, useTheme } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { t } from "i18next";
import Box from "@mui/material/Box";
import useDeleteAllCarts from "api-manage/hooks/react-query/useDeleteAllCarts";
import { onErrorResponse } from "api-manage/api-error-response/ErrorResponses";
import { bookingConfirm, formattedDate } from "components/home/module-wise-components/rental/components/global/search/searchHepler";
import { setCartList } from "redux/slices/cart";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import LoadingButton from "@mui/lab/LoadingButton";


const ProviderCheck = ({
  handleProviderCheck,
  confirmMutate,
  cartItemData,
  providerId
}) => {

  const theme = useTheme();
  const dispatch = useDispatch();
  const { mutate, isLoading } = useDeleteAllCarts();


  const removeAndAdd = () => {
    const tempData = {
      vehicle_id: cartItemData?.id,
      quantity: 1,
      pickup_time: formattedDate(cartItemData?.dateValue),
      rental_type: cartItemData?.tripType,
    };
    mutate(tempData, {
      onSuccess: (res) => {
        if (res?.status === "success") {
          bookingConfirm({
            id: cartItemData?.id,
            locations: cartItemData?.locations,
            searchKey1: cartItemData?.searchKey1,
            searchKey2: cartItemData?.searchKey2,
            tripType: cartItemData?.tripType,
            durationValue: cartItemData?.durationValue,
            dateValue: cartItemData?.dateValue,
            data: cartItemData?.data,
            confirmMutate,
            dispatch,
            setCartList,
            toast,
            handleClose: null,
            onErrorResponse,
          });
          handleProviderCheck(false);
        }
      },
      onError: onErrorResponse,
    });
  };

  return (
    <Stack
      padding="1rem"
      width="100%"
      justifyContent="center"
      alignItems="center"
      gap="1rem"
      alignContent="center"
      minWidth="300px"
      maxWidth="400px"
    >
      <InfoIcon sx={{ fontSize: "50px" }} />
      <Stack
        justifyContent="center"
        width="100%"
        alignItems="center"
        gap="10px"
      >
        <Typography
          fontSize="14"
          fontWeight="500"
          color={theme.palette.error.main}
        >
          {t("¿Estás seguro de que deseas reiniciar?")}
        </Typography>
        <Typography
          fontSize="14"
          fontWeight="500"
          color={theme.palette.neutral[1000]}
          textAlign="center"
        >
          {t("Seleccionar un vehículo de otro proveedor eliminará todos los vehículos del carrito y agregará el nuevo.")}
        </Typography>
      </Stack>
      <Stack direction="row" spacing={2} width="100%">
        <Button
          onClick={() => handleProviderCheck(false)}
          variant="outlined"
          color="primary"
          sx={{ width: "100%", fontSize: "12px" }}
        >
          {t("Cancelar")}
        </Button>
        <LoadingButton
          loading={isLoading}
          onClick={removeAndAdd}
          variant="contained"
          color="primary"
          sx={{ width: "100%", fontSize: "12px" }}
        >
          {t("Sí")}
        </LoadingButton>
      </Stack>
    </Stack>
  );
};

export default ProviderCheck;