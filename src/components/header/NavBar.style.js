import {
  alpha,
  AppBar,
  BottomNavigationAction,
  Button,
  Drawer,
  Link as MenuLink,
  Menu,
  Stack,
  styled,
  Switch,
} from "@mui/material";
import React from "react";

export const AppBarStyle = styled(AppBar)(({ theme, scrolling, isSmall }) => ({
  top: !scrolling ? "0" : isSmall ? "0px" : "-32px",
  background:
    theme.palette.mode === "dark"
      ? `rgba(6,20,16,${scrolling ? "0.97" : "0.85"}) !important`
      : `rgba(255,255,255,${scrolling ? "0.97" : "0.88"}) !important`,
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  borderBottom: scrolling
    ? `1px solid ${alpha(theme.palette.primary.main, 0.15)}`
    : "1px solid transparent",
  boxShadow: scrolling
    ? `0 4px 28px ${alpha(theme.palette.common.black, 0.1)}`
    : "none",
  transition: "all 0.35s ease",
}));

export const CustomStackForLoaction = styled(Stack)(({ theme }) => ({
  justifyContent: "center",
  cursor: "pointer",
  alignItems: "center",
}));

export const TopBarButton = styled(Button)(({ theme, formmobilemenu }) => ({
  padding: formmobilemenu === "true" ? "7px 5px" : "7px 16px",
  color: theme.palette.neutral[100],
  borderRadius: "12px",
  fontWeight: 700,
  fontSize: "14px",
  boxShadow: `0 4px 16px ${alpha(theme.palette.primary.main, 0.4)}`,
  transition: "all 0.2s ease",
  "&:hover": {
    transform: "translateY(-1px)",
    boxShadow: `0 6px 20px ${alpha(theme.palette.primary.main, 0.55)}`,
  },
}));

export const CustomSwitch = styled(Switch)(({ theme, noimage }) => ({
  width: 40,
  height: 20,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 1,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(20px)rotate(360deg)",
      color: "#fff",
      "& .MuiSwitch-thumb:before": {
        backgroundImage:
          noimage === "true"
            ? null
            : `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="15" width="15" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                theme.palette.primary.main
              )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
      },
      "& + .MuiSwitch-track": {
        backgroundColor:
          theme.palette.mode === "dark"
            ? theme.palette.primary.light
            : theme.palette.primary.main,
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": { opacity: 0.5 },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: theme.palette.primary.light,
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#fff",
    width: 18,
    height: 18,
    "&:before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: noimage
        ? null
        : `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="18" width="18" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
            "#fff"
          )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
    },
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], { duration: 500 }),
  },
}));

export const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    transformOrigin={{ vertical: "top", horizontal: "right" }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 16,
    marginTop: theme.spacing(1.5),
    minWidth: 180,
    color:
      theme.palette.mode === "light" ? "rgb(55, 65, 81)" : theme.palette.grey[300],
    border: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
    boxShadow: `0 12px 40px ${alpha(theme.palette.common.black, 0.14)}`,
    backdropFilter: "blur(12px)",
    "& .MuiMenu-list": { padding: "6px" },
    "& .MuiMenuItem-root": {
      borderRadius: "10px",
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

export const NavLinkStyle = styled(Stack)(({ theme, language_direction }) => ({
  color: theme.palette.mode === "dark" ? "rgba(232,245,238,0.7)" : theme.palette.text.secondary,
  fontSize: "15px",
  fontWeight: 500,
  cursor: "pointer",
  transition: "color 0.2s ease",
  "&:hover": {
    color: theme.palette.primary.main,
  },
}));

export const SignInButton = styled(Button)(({ theme }) => ({
  color: theme.palette.neutral[100],
  backgroundColor: theme.palette.primary.main,
  borderRadius: "12px",
  fontWeight: 700,
  fontSize: "14px",
  padding: "9px 22px",
  boxShadow: `0 4px 16px ${alpha(theme.palette.primary.main, 0.4)}`,
  transition: "all 0.2s ease",
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
    boxShadow: `0 6px 22px ${alpha(theme.palette.primary.main, 0.55)}`,
    transform: "translateY(-1px)",
  },
}));

export const NavMenuLink = styled(MenuLink)(({ theme }) => ({
  color: theme.palette.neutral[1000],
  display: "flex",
  cursor: "pointer",
  fontSize: "15px",
  fontWeight: 500,
  gap: "5px",
  textDecoration: "none",
  transition: "color 0.2s ease",
  "&:hover": {
    color: theme.palette.primary.main,
    textDecoration: "none",
  },
}));

export const ButtonContainer = styled("div")(({ theme }) => ({
  marginLeft: "15px",
  marginRight: "15px",
}));

export const CustomDrawer = styled(Drawer)(({ theme }) => ({
  "& .MuiDrawer-paper": {
    top: "56px",
    maxWidth: "320px",
    width: "96vw",
    height: "calc(100dvh - 56px)",
    transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    zIndex: "1200",
    boxShadow: `-8px 0 40px ${alpha(theme.palette.common.black, 0.14)}`,
  },
}));

export const CustomBottomNavigationAction = styled(BottomNavigationAction)(
  ({ theme }) => ({
    color: theme.palette.neutral[1000],
    minWidth: "60px",
    fontSize: "10px !important",
    padding: "0px 0px",
    "& .MuiBottomNavigationAction-label": {
      fontSize: "12px !important",
    },
    "&.Mui-selected": { color: theme.palette.primary.main },
    "& .MuiSvgIcon-root": {
      width: "20px",
      fontSize: "1.2rem !important",
    },
  })
);