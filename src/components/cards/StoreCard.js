import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import GradeRoundedIcon from "@mui/icons-material/GradeRounded";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import {
  alpha,
  Box,
  Button,
  Chip,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { handleStoreRedirect } from "helper-functions/handleStoreRedirect";
import { useAddStoreToWishlist } from "api-manage/hooks/react-query/wish-list/useAddStoreToWishLists";
import { useWishListStoreDelete } from "api-manage/hooks/react-query/wish-list/useWishListStoreDelete";
import { getCurrentModuleType } from "helper-functions/getCurrentModuleType";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { not_logged_in_message } from "utils/toasterMessages";
import { addWishListStore, removeWishListStore } from "redux/slices/wishList";
import NextImage from "components/NextImage";
import ClosedNow from "components/closed-now";

const Card = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: "16px",
  overflow: "hidden",
  cursor: "pointer",
  border: `1px solid ${alpha(theme.palette.neutral[400], 0.1)}`,
  transition: "box-shadow 0.22s ease, transform 0.22s ease",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  "&:hover": {
    boxShadow: `0 8px 28px ${alpha("#000", 0.12)}`,
    transform: "translateY(-2px)",
    "& .cover-img": { transform: "scale(1.04)" },
    "& .store-name": { color: theme.palette.primary.main },
    "& .view-btn": { opacity: 1, transform: "translateY(0)" },
  },
}));

const ImageWrapper = styled(Box)(() => ({
  position: "relative",
  width: "100%",
  height: "150px",
  overflow: "visible",
  flexShrink: 0,
  "& .img-clip": {
    height: "150px",
    overflow: "hidden",
    borderRadius: "16px 16px 0 0",
  },
  "& .cover-img": { transition: "transform 0.4s ease" },
}));

const DiscountBadge = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 10,
  left: 10,
  backgroundColor: theme.palette.primary.main,
  color: "#fff",
  borderRadius: "8px",
  padding: "3px 8px",
  fontSize: "11px",
  fontWeight: 700,
  zIndex: 2,
}));

const HeartBtn = styled(Box)(() => ({
  position: "absolute",
  top: 10,
  right: 10,
  backgroundColor: "rgba(255,255,255,0.92)",
  borderRadius: "50%",
  width: 30,
  height: 30,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backdropFilter: "blur(4px)",
  cursor: "pointer",
  zIndex: 2,
  transition: "transform 0.15s ease",
  "&:hover": { transform: "scale(1.15)" },
}));

// The PedidosYa signature: store logo circle overlapping the cover photo
const LogoCircle = styled(Box)(({ theme }) => ({
  position: "absolute",
  bottom: "-20px",
  left: "14px",
  width: "48px",
  height: "48px",
  borderRadius: "50%",
  overflow: "hidden",
  border: `2.5px solid ${theme.palette.background.paper}`,
  backgroundColor: theme.palette.background.paper,
  boxShadow: `0 2px 8px ${alpha("#000", 0.15)}`,
  zIndex: 3,
  flexShrink: 0,
}));

const ViewBtn = styled(Button)(() => ({
  opacity: 0,
  transform: "translateY(4px)",
  transition: "opacity 0.18s ease, transform 0.18s ease",
  fontSize: "11px",
  fontWeight: 700,
  padding: "4px 14px",
  borderRadius: "20px",
  textTransform: "none",
  minWidth: "unset",
}));

const StoreCard = ({ data, cardFor }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const dispatch = useDispatch();
  const { wishLists } = useSelector((state) => state.wishList);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const moduleType = getCurrentModuleType();

  useEffect(() => {
    if (wishLists?.store?.find((item) => item?.id === data?.id)) {
      setIsWishlisted(true);
    } else {
      setIsWishlisted(false);
    }
  }, [wishLists, data?.id]);

  const onSuccessAdd = () => { dispatch(addWishListStore(data)); setIsWishlisted(true); };
  const onSuccessRemove = () => { dispatch(removeWishListStore(data)); setIsWishlisted(false); };
  const { mutate: addToWishlist } = useAddStoreToWishlist(onSuccessAdd);
  const { mutate: removeFromWishlist } = useWishListStoreDelete(onSuccessRemove);
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    if (!token) { toast.error(t(not_logged_in_message)); return; }
    isWishlisted ? removeFromWishlist(data?.id) : addToWishlist(data?.id);
  };

  const handleCardClick = () => handleStoreRedirect({ router, storeData: data, moduleType: getCurrentModuleType() });

  const discountLabel = data?.discount
    ? `${data.discount}% OFF`
    : data?.store_discount_amount
    ? `${data.store_discount_amount}% OFF`
    : null;
  const deliveryTime = data?.delivery_time;
  const isFreeDelivery = data?.free_delivery || Number(data?.minimum_shipping_charge) === 0;
  const rating = (data?.avg_rating || data?.rating)
    ? Number(data?.avg_rating || data?.rating).toFixed(1)
    : null;
  const isViewMenu = moduleType === "food" || moduleType === "grocery" || moduleType === "pharmacy";

  return (
    <Card onClick={handleCardClick}>
      {/* Cover + overlapping logo */}
      <ImageWrapper>
        <Box className="img-clip">
          <NextImage
            className="cover-img"
            src={data?.cover_photo_full_url}
            alt={data?.name}
            height={150}
            width={300}
            objectFit="cover"
            bg={alpha("#2FB9CB", 0.1)}
          />
        </Box>

        {discountLabel && (
          <DiscountBadge>
            <LocalOfferOutlinedIcon sx={{ fontSize: 10, mr: "3px", verticalAlign: "middle" }} />
            {discountLabel}
          </DiscountBadge>
        )}
        <HeartBtn onClick={handleWishlistClick}>
          {isWishlisted
            ? <FavoriteIcon sx={{ fontSize: 15, color: "#e53935" }} />
            : <FavoriteBorderIcon sx={{ fontSize: 15, color: "#555" }} />}
        </HeartBtn>

        {/* PedidosYa logo circle */}
        <LogoCircle>
          <NextImage
            src={data?.logo_full_url}
            alt={data?.name}
            height={48}
            width={48}
            objectFit="cover"
            bg={alpha("#2FB9CB", 0.08)}
          />
        </LogoCircle>

        {(data?.active === false || data?.open === false) && <ClosedNow />}
      </ImageWrapper>

      {/* Info: add top padding to account for the overlapping logo (20px + some breathing room) */}
      <Box sx={{ pt: "28px", px: "14px", pb: "14px", display: "flex", flexDirection: "column", gap: "6px", flexGrow: 1 }}>
        {/* Name row */}
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography
            className="store-name"
            variant="subtitle2"
            fontWeight={700}
            noWrap
            sx={{ maxWidth: "calc(100% - 50px)", fontSize: "14px", transition: "color 0.2s ease" }}
          >
            {data?.name}
          </Typography>
          {rating && (
            <Stack direction="row" alignItems="center" spacing={0.3}>
              <GradeRoundedIcon sx={{ fontSize: 13, color: "#FFA726" }} />
              <Typography variant="caption" fontWeight={700} sx={{ color: "#FFA726", lineHeight: 1, fontSize: "12px" }}>
                {rating}
              </Typography>
            </Stack>
          )}
        </Stack>

        {/* Delivery info row */}
        <Stack direction="row" alignItems="center" gap="10px" flexWrap="wrap">
          {deliveryTime && (
            <Stack direction="row" alignItems="center" gap="3px">
              <AccessTimeIcon sx={{ fontSize: 13, color: "text.secondary" }} />
              <Typography variant="caption" color="text.secondary" fontWeight={500}>{deliveryTime}</Typography>
            </Stack>
          )}
          {isFreeDelivery ? (
            <Stack direction="row" alignItems="center" gap="3px">
              <LocalShippingOutlinedIcon sx={{ fontSize: 13, color: "#4AB05E" }} />
              <Typography variant="caption" sx={{ color: "#4AB05E", fontWeight: 600 }}>Envío gratis</Typography>
            </Stack>
          ) : data?.minimum_shipping_charge > 0 ? (
            <Stack direction="row" alignItems="center" gap="3px">
              <LocalShippingOutlinedIcon sx={{ fontSize: 13, color: "text.secondary" }} />
              <Typography variant="caption" color="text.secondary" fontWeight={500}>
                L {data?.minimum_shipping_charge}
              </Typography>
            </Stack>
          ) : null}
        </Stack>

        {/* Ver menú hover btn */}
        {isViewMenu && (
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: "auto", pt: "4px" }}>
            <ViewBtn className="view-btn" variant="contained" color="primary" size="small" disableElevation>
              Ver Menú
            </ViewBtn>
          </Box>
        )}
      </Box>
    </Card>
  );
};

export default StoreCard;
