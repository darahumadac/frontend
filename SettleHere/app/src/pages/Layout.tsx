import { Outlet } from "react-router-dom";
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Link,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import Menu, { MenuOption } from "../components/Menu";

export default function Layout() {
  const menuOptions: MenuOption[] = [
    {
      name: "Buy",
      to: "/properties/sale",
      subOptions: [
        {
          name: "House and Lot",
          to: "house-and-lot",
          //For testing suboptions
          //   subOptions: [
          //     { name: "Rent to Own", to: "rent-to-own" },
          //     { name: "Buy Direct", to: "direct" },
          //   ],
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
      <AppBar position="static">
        <Toolbar>
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
          <Stack
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
      <div>
        <Outlet />
      </div>
    </>
  );
}
