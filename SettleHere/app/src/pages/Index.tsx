import {
  Box,
  Container,
  Stack,
  ListItem,
  Link,
  Button,
  InputBase,
  InputAdornment,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";

export default function Index() {
  const [selectedOption, setSelectedOption] = useState<number>(0);
  const searchSelections = ["Buy", "Rent", "Find Agent"];
  const selectionRefs = useRef<HTMLAnchorElement[]>([]);
  const [searchText, setSearchText] = useState<string>("");

  // update selected option width for animation
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--current-selection-width",
      `${selectionRefs.current[selectedOption].clientWidth}px`
    );
  }, [selectedOption]);

  return (
    <>
      <Box sx={{ backgroundColor: "primary.main" }}>
        <Container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: { xs: "column-reverse", md: "row" },
          }}
        >
          <Box
            component="img"
            src="/images/houses.jpg"
            width="100%"
            height={420}
            sx={{ position: { xs: "relative" }, paddingTop: { xs: 0, md: 5 } }}
          />
          {/* Search Box */}
          <Box
            sx={{
              backgroundColor: { xs: "#0E4D90", md: "rgba(0,0,0, 0.5)" },
              position: { xs: "relative", md: "absolute" },
              top: { xs: 0, md: 370 },
              width: { xs: "100svw", md: "600px" },
              borderRadius: { xs: 0, md: 3 },
            }}
            height={200}
          >
            <Container
              sx={{ width: { xs: "calc(100svw - 20px)", md: "inherit" } }}
            >
              {/* Search Tabs */}
              <Box
                bgcolor="white"
                sx={{
                  marginTop: { xs: 10, md: 3 },
                  marginX: 5,
                  paddingX: 0.1,
                  paddingY: 0.1,
                  borderRadius: 6,
                }}
              >
                <Stack direction="row" sx={{ fontSize: 16 }} py={0}>
                  {searchSelections.map((option: string, i: number) => (
                    <ListItem
                      className={selectedOption == i ? "active-tab" : ""}
                      component={Link}
                      ref={(element) => (selectionRefs.current[i] = element)}
                      href={"#"}
                      onClick={(e) => {
                        e.preventDefault();
                        if (i == selectedOption) return;

                        //set trranslate x for pill background sliding animation
                        const fromDirection = i < selectedOption ? 1 : -1; //1 is from right, -1 is from left
                        document.documentElement.style.setProperty(
                          "--translate-x-value",
                          `${
                            fromDirection *
                            (selectionRefs.current[selectedOption].clientWidth *
                              Math.abs(selectedOption - i))
                          }px`
                        );

                        setSelectedOption(i);
                      }}
                      key={i}
                      sx={{
                        justifyContent: "center",
                        color: selectedOption == i ? "white" : "inherit",
                      }}
                    >
                      {option}
                    </ListItem>
                  ))}
                </Stack>
              </Box>
              {/* Search Input */}
              <Box
                my={2}
                width="100%"
                height={50}
                bgcolor="white"
                borderRadius={50}
              >
               {/* TODO: implement autocomplete */}
                <InputBase
                  sx={{
                    height: "inherit",
                    paddingX: "20px",
                    width: "80%",
                    // border: "1px solid gray",
                    // bgcolor: "pink",
                    borderTopLeftRadius: 15,
                    borderBottomLeftRadius: 15,
                  }}
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  endAdornment={
                    searchText.length > 0 && (
                      <InputAdornment position="end">
                        <Link href="#" onClick={() => setSearchText("") } style={{cursor: "pointer"}}>
                        <ClearIcon style={{color: "black"}}/>
                        </Link>
                      </InputAdornment>
                    )
                  }
                />

                <Button
                  variant="contained"
                  sx={{
                    bgcolor: "#cc0000",
                    color: "white",
                    height: "100%",
                    width: "20%",
                    borderTopRightRadius: 15,
                    borderBottomRightRadius: 15,
                  }}
                >
                  Search
                </Button>
                
              </Box>
            </Container>
          </Box>
        </Container>
      </Box>
    </>
  );
}
