"use client";
import NextLink from "next/link";

// internal
import { useAppSelector } from "@/redux/hooks";

// mui
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import SaveIcon from "@mui/icons-material/Save";
import LoadingButton from "@mui/lab/LoadingButton";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import ChecklistRtlIcon from "@mui/icons-material/ChecklistRtl";
import ListItemIcon from "@mui/material/ListItemIcon";
import OrderHistorySection from "@/web-pages/account-page/order-history-section";
import EditProfileSection from "@/web-pages/account-page/edit-profile-section";
import Avatar from "@mui/material/Avatar";

// EXPORT DEFAULT

export default function AccountPage() {
  // -------------------------- VAR --------------------------
  const user = useAppSelector((state) => state.user.user);

  const menuItemSX = {
    py: 1.5,
    "&:hover, &:hover .MuiSvgIcon-root, &:hover .MuiTypography-root": {
      bgcolor: "primary.contrastText",
      color: "secondary.main",
      fontWeight: "bold",
    },
  };

  // -------------------------- MAIN --------------------------

  return (
    <Container>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mt: 5 }}>
        <Link underline="hover" color="inherit" component={NextLink} href="/">
          Home
        </Link>
        <Link
          underline="hover"
          color="text.primary"
          aria-current="page"
          component={NextLink}
          href="/acccount"
        >
          My Account
        </Link>
      </Breadcrumbs>
      <Grid container spacing={3} mt={3} mb={7}>
        <Grid item md={2}>
          <MenuList>
            <MenuItem
              disableGutters
              // onClick={() => router.push()}
              sx={menuItemSX}
            >
              <ListItemIcon>
                <PermIdentityOutlinedIcon />
              </ListItemIcon>
              <ListItemText>My Account</ListItemText>
            </MenuItem>
            <MenuItem
              disableGutters
              // onClick={() => router.push()}
              sx={menuItemSX}
            >
              <ListItemIcon>
                <ChecklistRtlIcon />
              </ListItemIcon>
              <ListItemText>My Order</ListItemText>
            </MenuItem>
          </MenuList>
        </Grid>
        <Grid item md={10} mt={2}>
          <Grid container spacing={3} mb={7}>
            <Grid item md={12}>
              <Stack direction="row" spacing={1}>
                <Typography fontSize={20}>Welcome,</Typography>
                <Typography color="secondary" fontWeight={600} fontSize={20}>
                  Lysa
                </Typography>
              </Stack>
              <Avatar sx={{ width: 100, height: 100, fontSize: 50 , mt: 3 }}>
                {user.firstName[0]}
              </Avatar>
            </Grid>

            <Grid item md={12}>
              <Typography
                color="secondary"
                fontWeight={600}
                fontSize={20}
                mt={3}
                mb={2}
              >
                Edit your profile
              </Typography>
              <EditProfileSection />
            </Grid>
            <Grid item md={12}>
              <Typography
                color="secondary"
                fontWeight={600}
                fontSize={20}
                mt={3}
                mb={1}
              >
                Order History
              </Typography>
              <OrderHistorySection accountId={user.accountId} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
