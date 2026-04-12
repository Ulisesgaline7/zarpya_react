import React, { useState } from "react";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import AppsRoundedIcon from "@mui/icons-material/AppsRounded";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import {
  Badge,
  BottomNavigation,
  BottomNavigationAction,
  Box,
  NoSsr,
  Paper,
  styled,
  Typography,
  useTheme,
  alpha,
} from "@mui/material";
import { t } from "i18next";
import CardView from "../added-cart-view";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { getCartListModuleWise } from "helper-functions/getCartListModuleWise";
import WishListCardView from "../wishlist";
import { getToken } from "helper-functions/getToken";
import { toast } from "react-hot-toast";
import { getModule } from "helper-functions/getLanguage";

// ── Styled BottomNavigationAction estilo Gojek ──────────────────
const GojekNavAction = styled(BottomNavigationAction)(({ theme }) => ({
  minWidth: 0,
  padding: "6px 4px 4px",
  color: theme.palette.mode === "dark"
    ? "rgba(255,255,255,0.45)"
    : theme.palette.neutral?.[500] || "#6B7280",
  "& .MuiBottomNavigationAction-label": {
    fontSize: "10px !important",
    fontWeight: 500,
    marginTop: "2px",
    transition: "all 0.15s",
  },
  "& .MuiSvgIcon-root": {
    fontSize: "22px",
    transition: "all 0.15s",
  },
  "&.Mui-selected": {
    color: theme.palette.primary.main,
    "& .MuiBottomNavigationAction-label": {
      fontSize: "10px !important",
      fontWeight: 700,
    },
    "& .nav-icon-wrap": {
      background: alpha(theme.palette.primary.main, 0.1),
    },
  },
  transition: "color 0.15s",
}));

// Wrapper del ícono con fondo pill al seleccionar
const NavIconWrap = ({ children, selected, color }) => (
  <Box
    className="nav-icon-wrap"
    sx={{
      width: 40,
      height: 28,
      borderRadius: "14px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: selected ? alpha(color || "#2FB9CB", 0.12) : "transparent",
      transition: "background 0.15s",
      mx: "auto",
    }}
  >
    {children}
  </Box>
);

const BottomNav = () => {
  const theme = useTheme();
  const { wishLists } = useSelector((state) => state.wishList);
  const { cartList } = useSelector((state) => state.cart);
  const { selectedModule } = useSelector((state) => state.utilsData);
  const totalWishList = (wishLists?.item?.length || 0) + (wishLists?.store?.length || 0);
  const rentalTotalWishList = (wishLists?.providers?.length || 0) + (wishLists?.vehicles?.length || 0);

  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);
  const [wishListSideDrawerOpen, setWishListSideDrawerOpen] = useState(false);
  const router = useRouter();

  // Determinar tab activo
  const getActiveTab = () => {
    const path = router.pathname;
    if (path === "/home" || path === "/") return "home";
    if (path.startsWith("/taxi")) return "taxi";
    if (path.startsWith("/services")) return "services";
    if (path.startsWith("/profile")) return "profile";
    return "home";
  };

  const handleCartDrawerOpen = () => setSideDrawerOpen(true);

  const handleNav = (value) => {
    switch (value) {
      case "home":
        router.push("/home");
        break;
      case "taxi":
        router.push("/taxi");
        break;
      case "services":
        router.push("/services");
        break;
      case "orders":
        if (getToken()) {
          router.push({ pathname: "/profile", query: { page: "my-orders" } }, undefined, { shallow: true });
        } else {
          toast.error(t("Please login"));
        }
        break;
      case "profile":
        if (getToken()) {
          router.push({ pathname: "/profile", query: { page: "profile-settings" } }, undefined, { shallow: true });
        } else {
          toast.error(t("Please login"));
        }
        break;
      case "cart":
        handleCartDrawerOpen();
        break;
      default:
        break;
    }
  };

  const activeTab = getActiveTab();
  const cartCount = getCartListModuleWise(cartList)?.length || 0;
  const isRental = selectedModule?.module_type === "rental";
  const isParcel = selectedModule?.module_type === "parcel";

  return (
    <NoSsr>
      <Paper
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1082,
          borderTop: `1px solid ${theme.palette.mode === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)"}`,
          boxShadow: "0 -4px 20px rgba(0,0,0,0.08)",
          pb: "env(safe-area-inset-bottom)",
        }}
        elevation={0}
      >
        <BottomNavigation
          showLabels
          value={activeTab}
          onChange={(_, val) => handleNav(val)}
          sx={{
            height: 60,
            background: theme.palette.mode === "dark"
              ? theme.palette.background.paper
              : "#fff",
            "& .MuiBottomNavigation-root": { height: 60 },
          }}
        >
          {/* Home */}
          <GojekNavAction
            label={t("Inicio")}
            value="home"
            icon={
              <NavIconWrap selected={activeTab === "home"} color={theme.palette.primary.main}>
                <HomeRoundedIcon />
              </NavIconWrap>
            }
          />

          {/* Taxi */}
          <GojekNavAction
            label={t("Taxi")}
            value="taxi"
            icon={
              <NavIconWrap selected={activeTab === "taxi"} color="#2FB9CB">
                <Box sx={{ fontSize: "20px", lineHeight: 1 }}>🚕</Box>
              </NavIconWrap>
            }
          />

          {/* Carrito / Pedidos — centro prominente */}
          {!isParcel && !isRental ? (
            <GojekNavAction
              label={t("Carrito")}
              value="cart"
              icon={
                <NavIconWrap selected={false} color={theme.palette.primary.main}>
                  <Badge
                    badgeContent={cartCount > 0 ? cartCount : null}
                    color="error"
                    sx={{
                      "& .MuiBadge-badge": {
                        fontSize: "9px",
                        minWidth: "16px",
                        height: "16px",
                        top: -2,
                        right: -2,
                      },
                    }}
                  >
                    <ShoppingCartRoundedIcon />
                  </Badge>
                </NavIconWrap>
              }
            />
          ) : (
            <GojekNavAction
              label={t("Pedidos")}
              value="orders"
              icon={
                <NavIconWrap selected={activeTab === "orders"} color={theme.palette.primary.main}>
                  <ReceiptLongRoundedIcon />
                </NavIconWrap>
              }
            />
          )}

          {/* Servicios */}
          <GojekNavAction
            label={t("Servicios")}
            value="services"
            icon={
              <NavIconWrap selected={activeTab === "services"} color="#F59E0B">
                <Box sx={{ fontSize: "20px", lineHeight: 1 }}>🔧</Box>
              </NavIconWrap>
            }
          />

          {/* Perfil */}
          <GojekNavAction
            label={t("Perfil")}
            value="profile"
            icon={
              <NavIconWrap selected={activeTab === "profile"} color={theme.palette.primary.main}>
                <PersonRoundedIcon />
              </NavIconWrap>
            }
          />
        </BottomNavigation>
      </Paper>

      {!!sideDrawerOpen && (
        <CardView
          sideDrawerOpen={sideDrawerOpen}
          setSideDrawerOpen={setSideDrawerOpen}
          cartList={cartList}
        />
      )}
      {!!wishListSideDrawerOpen && (
        <WishListCardView
          sideDrawerOpen={wishListSideDrawerOpen}
          setSideDrawerOpen={setWishListSideDrawerOpen}
        />
      )}
    </NoSsr>
  );
};

export default React.memo(BottomNav);
