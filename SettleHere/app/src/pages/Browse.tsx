import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardMedia,
  ImageList,
  Stack,
} from "@mui/material";

export default function Browse() {
  const { entity, tag, type } = useParams<string>();
  const [data, setData] = useState([]);

  const API_URL = "http://localhost:3000";
  useEffect(() => {
    const fetchData = async () => {
      const forFilter = tag === "sale" ? "buy" : tag;
      const filterBy = new URLSearchParams({ "tags[0]": forFilter });
      const response = await axios.get(`${API_URL}/${entity}?${filterBy}`);
      setData(response.data);
    };

    fetchData();
  }, []); //load once

  return (
    <>
      <h1>Browse {`${entity} ${tag || ""} ${type || "all"}`.trimEnd()}</h1>
      <Stack direction="row">
        <ImageList sx={{ width: "100%" }} cols={3} rowHeight={164}>
          {data.map((d) => (
            <Card key={d.id}>
              <CardHeader title={d.name} subheader={d.address.city}/>
              <CardMedia component="img" height="194" src={d.photoUrl}/>
            </Card>
          ))}
        </ImageList>
      </Stack>
    </>
  );
}

// HZhtwbEOxRzRgHH15BWqFntsANUYUWOfzLqG9oK0JymEnl45lLFqy7Yq