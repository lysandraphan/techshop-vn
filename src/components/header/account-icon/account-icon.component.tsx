"use client";

import React, { Fragment } from "react";
import { useRouter } from "next/navigation";

// mui
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

export default function AccountIcon({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const router = useRouter();

  return (
    <Fragment>
      {isLoggedIn ? (
        <IconButton
          onClick={handleClick}
          size="small"
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <Avatar sx={{ width: 32, height: 30 }}>T</Avatar>
        </IconButton>
      ) : (
        <IconButton
          color="secondary"
          aria-label="login"
          sx={{ p: 0 }}
          onClick={() => router.push("/login")}
        >
          <AccountCircleRoundedIcon sx={{ fontSize: 37 }} />
        </IconButton>
      )}

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={() => router.push("/account")}>
          <ListItemIcon>
            <PermIdentityOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Manage Account</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => router.push("/account/orders")}>
          <ListItemIcon>
            <ShoppingBagOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Order Tracking</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => router.push("/account/review")}>
          <ListItemIcon>
            <StarBorderRoundedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>My Review</ListItemText>
        </MenuItem>

        <Divider />

        <MenuItem onClick={() => router.push("/")}>
          <ListItemIcon>
            <LogoutRoundedIcon fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Fragment>
  );
}
