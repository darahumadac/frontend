import { Outlet } from "react-router-dom";
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  Link,
  List,
  ListItem,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import Menu, { MenuOption } from "../components/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

export default function Layout() {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const menuOptions: MenuOption[] = [
    {
      name: "Buy",
      to: "/properties/sale",
      subOptions: [
        {
          name: "House and Lot",
          to: "house-and-lot",
          //For testing suboptions
          // subOptions: [
          //   { name: "Rent to Own", to: "rent-to-own" },
          //   { name: "Buy Direct", to: "direct" },
          // ],
        },
        { name: "Condo", to: "condo" },
        { name: "Pre-Selling", to: "pre-selling" },
        { name: "Commercial", to: "commercial" },
      ],
    },
    {
      name: "Rent",
      to: "/properties/rent",
      subOptions: [
        { name: "House and Lot", to: "house-and-lot" },
        { name: "Condo", to: "condo" },
        { name: "Commercial", to: "commercial" },
      ],
    },
    { name: "Sell", to: "/properties/sellers" },
    { name: "Guides", to: "/property-guides" },
    { name: "Find Agents", to: "/property-agents" },
  ];

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "primary.light",
          boxShadow: { ":default": 0, xs: drawerOpen ? 3 : 0 },
        }}
      >
        <Toolbar
          sx={{ justifyContent: { xs: "space-between", md: "inherit" } }}
        >
          <Stack direction="row" alignItems="center">
            <IconButton size="large" edge="start">
              <img src="../../house-with-garden-svgrepo-com.svg" height={50} />
            </IconButton>
            <Link color="inherit" underline="none" href="/">
              <Typography letterSpacing={1} fontWeight="bold" fontSize={25}>
                SettleHere
              </Typography>
            </Link>
          </Stack>
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            sx={{ display: { xs: "inherit", md: "none" } }}
            onClick={() => setDrawerOpen(!drawerOpen)}
          >
            {drawerOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
          {/* TODO: Make this into component: DrawerMenu */}
          <Drawer
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            anchor="right"
            variant="temporary"
            sx={{
              display: { xs: "inherit", md: "none" },
              zIndex: (theme) => theme.zIndex.appBar - 1,
            }}
          >
            <Box mt={10} sx={{ width: { xs: "100svw", sm: 300 } }}>
              <List>
                {menuOptions.map((option: MenuOption, i: number) => (
                  <ListItem key={i}>
                    <Link href={option.to} underline="none" color="inherit">
                      <Typography>{option.name}</Typography>
                    </Link>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Drawer>
          {/* TODO: Make this a component: HoverMenu */}
          <Stack
            sx={{ display: { xs: "none", md: "inherit" } }}
            marginLeft={5}
            direction="row"
            spacing={3}
            justifyContent="center"
          >
            {menuOptions.map((option: MenuOption, i: number) => (
              <Menu key={i} {...option}></Menu>
            ))}
          </Stack>
        </Toolbar>
      </AppBar>
      <Box marginY={2}>
        <Outlet />
      </Box>
    </>
  );
}
