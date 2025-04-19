import { Box, MenuItem, Link, Typography } from "@mui/material";
import HoverMenu from "material-ui-popup-state/HoverMenu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { MouseEvent, useState } from "react";

export interface MenuOption {
  name: string;
  to: string;
  subOptions?: MenuOption[];
  isSub?: boolean;
}

export default function Menu(option: MenuOption) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleHover = (e : MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleOut = () => {
    setAnchorEl(null);
  };

  if (!option.subOptions)
    return (
      <Link
        color="inherit"
        underline="none"
        href={option.to}
        autoFocus={false}
        p={1}
        borderRadius="5px"
        sx={{
          "&:hover": {
            backgroundColor:
              (!option.isSub && "primary.light") || "transparent",
          },
        }}
      >
        <Typography letterSpacing={1} variant="button">
          {option.name}
        </Typography>
      </Link>
    );

  return (
    <Box onMouseLeave={handleOut} onMouseEnter={handleHover}>
      <Link
        color="inherit"
        underline="none"
        href={option.to}
        display="flex"
        alignItems="center"
        p={1}
        borderRadius="5px"
        sx={{
          "&:hover": {
            backgroundColor:
              (!option.isSub && "primary.light") || "transparent",
          },
        }}
      >
        <Typography variant="button">{option.name}</Typography>
        {open && !option.isSub ? (
          <KeyboardArrowDownIcon
            style={{
              transition: "transform 0.2s ease-in-out",
              transform: "rotate(-180deg)",
            }}
          />
        ) : option.isSub ? (
          <KeyboardArrowRightIcon />
        ) : (
          <KeyboardArrowDownIcon
            style={{ transition: "transform 0.2s ease-in-out" }}
          />
        )}
      </Link>
      <HoverMenu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: option.isSub ? "center" : "bottom",
          horizontal: option.isSub ? "right" : "left",
        }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        open={open}
        autoFocus={false}
      >
        {option.subOptions.map((subOption: MenuOption, i: number) => {
          return (
            <MenuItem key={i}>
              <Menu {...subOption} to={`${option.to}/${subOption.to}`} isSub />
            </MenuItem>
          );
        })}
      </HoverMenu>
    </Box>
  );
}
