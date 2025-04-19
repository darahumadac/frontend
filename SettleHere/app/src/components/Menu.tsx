import { Box, MenuItem, Link, Typography, Divider } from "@mui/material";
import HoverMenu from "material-ui-popup-state/HoverMenu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { MouseEvent, useState } from "react";

export interface MenuOption {
  name: string;
  to: string;
  subOptions?: MenuOption[];
  isSubMenu?: boolean;
  open?: boolean;
}

const StyledLink = (option: MenuOption) => {
  return (
    <Link
      color="inherit"
      underline="none"
      href={option.to}
      autoFocus={false}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      py={0.5}
      px={1}
      borderRadius="5px"
      sx={{
        "&:hover": {
          backgroundColor:
            (!option.isSubMenu && "primary.main") || "transparent",
          color: !option.isSubMenu ? "primary.contrastText" : "inherit",
        },
      }}
    >
      <Typography
        letterSpacing={1}
        fontSize={14}
        variant={(!option.isSubMenu && "button") || "inherit"}
        fontWeight={!option.isSubMenu ? "bold" : "inherit"}
      >
        {option.name}
      </Typography>
      {option.subOptions &&
        (option.open && !option.isSubMenu ? (
          <KeyboardArrowDownIcon
            style={{
              transition: "transform 0.2s ease-in-out",
              transform: "rotate(-180deg)",
            }}
          />
        ) : option.isSubMenu ? (
          <KeyboardArrowRightIcon />
        ) : (
          <KeyboardArrowDownIcon
            style={{ transition: "transform 0.2s ease-in-out" }}
          />
        ))}
    </Link>
  );
};

export default function Menu(option: MenuOption) {
  if (!option.subOptions) return <StyledLink {...option} />;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleHover = (e: MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleOut = () => {
    setAnchorEl(null);
  };

  let [entity, type] = ["", ""];
  if (!option.isSubMenu) {
    [, entity, type] = option.to.split("/");
  }

  return (
    <Box
      onMouseLeave={handleOut}
      onMouseEnter={handleHover}
      sx={{ width: option.isSubMenu ? "100%" : "auto" }}
    >
      <StyledLink {...option} open={open} />
      <HoverMenu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: option.isSubMenu ? "center" : "bottom",
          horizontal: option.isSubMenu ? "right" : "left",
        }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        open={open}
        autoFocus={false}
        slotProps={{
          list: {
            className: "primary-list",
          },
        }}
        elevation={1}
      >
        {option.subOptions.map((subOption: MenuOption, i: number) => {
          return (
            <MenuItem key={i}>
              <Menu
                {...subOption}
                to={`${option.to}/${subOption.to}`}
                isSubMenu
              />
            </MenuItem>
          );
        })}
        {!option.isSubMenu && <Divider sx={{ borderColor: "#E8E8E8" }} />}
        {!option.isSubMenu && (
          <MenuItem>
            <Link
              underline="none"
              href={option.to}
              color="inherit"
              fontWeight="bold"
              marginLeft={1}
              display="flex"
              alignItems="center"
            >
              <Typography fontWeight="bold" fontSize={14}>
                View All {entity[0].toUpperCase() + entity.slice(1)} for{" "}
                {type[0].toUpperCase() + type.slice(1)}
              </Typography>

              <KeyboardArrowRightIcon />
            </Link>
          </MenuItem>
        )}
      </HoverMenu>
    </Box>
  );
}
