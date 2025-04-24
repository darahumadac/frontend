import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import BedIcon from "@mui/icons-material/BedOutlined";
import ShowerOutlinedIcon from "@mui/icons-material/ShowerOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";

interface Entity {
  id: number;
  name: string;
}
interface Address {
  city: string;
  postalCode: string;
  street: string;
  unit: string;
}
interface Property {
  price: string;
  bedrooms: number;
  toilets: number;
  floorSize: number;
  listedDate: string;
  type: string;
  tags: string[];
  address: Address;
  photoUrl?: string;
}

type PropertiesResult = Array<Entity & Property>;

export default function Browse() {
  const { entity, transactionType, type } = useParams<string>();
  const [data, setData] = useState<PropertiesResult>([]);

  const API_URL = "http://localhost:3000";
  useEffect(() => {
    const fetchData = async () => {
      let fetchUrl = `${API_URL}/${entity}`;
      if (transactionType !== undefined) {
        const forFilter = transactionType === "sale" ? "buy" : transactionType;
        const filterBy = new URLSearchParams({ transactionType: forFilter });
        fetchUrl += `?${filterBy}`;
      }
      const response = await axios.get(fetchUrl);
      setData(response.data);
    };

    fetchData();
  }, []); //load once

  return (
    <Container>
      <h1>
        Browse {`${entity} ${transactionType || ""} ${type || "all"}`.trimEnd()}
      </h1>
      <Stack direction="row">
        <Grid container columnSpacing={2} rowSpacing={5}>
          {data.map((d) => (
            <Grid key={d.id} size={{ xs: 12, sm: 6, md: 4 }} height="auto">
              <Card
                elevation={3}
                sx={{
                  cursor: "pointer",
                  "&:hover": {
                    boxShadow: "0 12px 24px 0 rgba(0,0,0,0.4)",
                    // transform: "scale(1.02)",
                    transition: "all 0.3s ease",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  src={d.photoUrl}
                  height="240"
                  width="240"
                  loading="lazy"
                  sx={{
                    "&:hover": {
                      transform: "scale(1.03)",
                      transition: "transform 0.3s ease",
                    },
                  }}
                />
                <CardHeader
                  sx={{ paddingBottom: 0.8 }}
                  title={d.name}
                  subheader={d.address.city}
                  slotProps={{
                    title: { fontSize: 18 },
                    subheader: { fontSize: 16 },
                  }}
                />
                <CardContent sx={{ pt: 0 }}>
                  <Typography sx={{ fontSize: 18 }}>
                    {new Intl.NumberFormat("en-SG", {
                      style: "currency",
                      currency: "SGD",
                    }).format(Number(d.price))}
                  </Typography>
                  <Divider
                    sx={{
                      mt: 2,
                      borderColor: "rgba(231, 225, 225, 0.74)",
                    }}
                  />
                  <Stack
                    direction="row"
                    sx={{ mt: 1 }}
                    divider={<Divider orientation="vertical" flexItem />}
                  >
                    <Typography
                      sx={{ fontSize: 15 }}
                      className="property-features"
                    >
                      <BedIcon
                        sx={{ fontSize: 21 }}
                        className="property-features-icon"
                      />
                      <span className="property-features-icon-info">
                        {d.bedrooms}
                      </span>
                      <ShowerOutlinedIcon
                        sx={{ fontSize: 21 }}
                        className="property-features-icon"
                      />
                      <span className="property-features-icon-info">
                        {d.toilets}
                      </span>
                    </Typography>
                    <Typography
                      sx={{ fontSize: 15 }}
                      className="property-features"
                    >
                      <span className="property-features-info">
                        {d.floorSize.toLocaleString()} sqft
                      </span>
                    </Typography>
                    <Typography
                      sx={{ fontSize: 15 }}
                      className="property-features"
                    >
                      <span className="property-features-info">
                        {new Intl.NumberFormat("en-SG", {
                          style: "currency",
                          currency: "SGD",
                        }).format(Number(d.price) / d.floorSize)}{" "}
                        psf
                      </span>
                    </Typography>
                  </Stack>
                  <Stack direction="row" mt={1}>
                    {[]
                      .concat([d.type])
                      .concat(d.tags)
                      .map((tag: string, i: number) => (
                        <Chip
                          sx={{
                            borderRadius: 2,
                            fontSize: 13,
                            letterSpacing: -0.4,
                            color: "#636161",
                            marginRight: 0.5
                          }}
                          key={i}
                          variant="outlined"
                          label={tag[0].toUpperCase() + tag.slice(1)}
                        />
                      ))}
                  </Stack>
                  <Stack direction="row" sx={{ mt: 1 }}>
                    <Typography
                      className="property-features"
                      sx={{ fontSize: 13, letterSpacing: -0.7, color: "rgb(139, 139, 139)"}}
                    >
                      <AccessTimeOutlinedIcon
                        sx={{ fontSize: 18, marginRight: 0.5 }}
                      />
                      Listed on{" "}
                      {new Date(d.listedDate).toLocaleDateString("en-US", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}{" "}
                      {(Date.now() - new Date(d.listedDate).getTime()) /
                        (60000 * 60 * 24) <=
                        30 &&
                        `(${Math.ceil(
                          (Date.now() - new Date(d.listedDate).getTime()) /
                            (60 * 1000 * 60 * 24)
                        )}d ago)`}
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Container>
  );
}
