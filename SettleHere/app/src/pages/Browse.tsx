import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Grid,
  Stack,
  Typography
} from "@mui/material";
import BedIcon from "@mui/icons-material/BedOutlined";

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
  tags: string[];
  address: Address;
  photoUrl?: string;
}

type PropertiesResult = Array<Entity & Property>;

export default function Browse() {
  const { entity, tag, type } = useParams<string>();
  const [data, setData] = useState<PropertiesResult>([]);

  const API_URL = "http://localhost:3000";
  useEffect(() => {
    const fetchData = async () => {
      let fetchUrl = `${API_URL}/${entity}`;
      if (tag !== undefined) {
        const forFilter = tag === "sale" ? "buy" : tag;
        const filterBy = new URLSearchParams({ "tags[0]": forFilter });
        fetchUrl += `?${filterBy}`;
      }
      const response = await axios.get(fetchUrl);
      setData(response.data);
    };

    fetchData();
  }, []); //load once

  return (
    <Container>
      <h1>Browse {`${entity} ${tag || ""} ${type || "all"}`.trimEnd()}</h1>
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
                    transform: "scale(1.02)",
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
                  <Stack direction="row">
                    <Typography
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        color: "rgb(138, 138, 138)",
                        fontSize: 15,
                        fontWeight: "lighter",
                      }}
                    >
                      <BedIcon
                        style={{
                          marginRight: 3,
                          fontSize: 21,
                          fontWeight: "lighter",
                        }}
                      />
                      {d.bedrooms}
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
