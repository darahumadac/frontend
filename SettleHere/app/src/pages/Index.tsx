import { Box, Container } from "@mui/material";

export default function Index() {
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
            src="../../public/images/houses.jpg"
            width="100%"
            height={420}
            sx={{ position: { xs: "relative" }, paddingTop: { xs: 0, md: 5 } }}
          />
          {/* Search Box */}
          <Box
            sx={{
              backgroundColor: { xs: "#0E4D90", md: "black" },
              opacity: { xs: 1, md: 0.5 },
              position: { xs: "relative", md: "absolute" },
              top: { xs: 0, md: 370 },
              width: { xs: "100svw", md: "600px" },
              borderRadius: { xs: 0, md: 3 },
            }}
            height={200}
          />
        </Container>
      </Box>
    </>
  );
}
