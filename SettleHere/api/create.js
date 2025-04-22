import fs from "fs";
import { faker } from "@faker-js/faker";

const properties = Array.from({ length: 30 }, (_, i) => {
    const {city, zipCode, street, buildingNumber} = faker.location;
    const tags = ["buy", "rent"].slice(Math.floor(Math.random()*2), Math.floor(Math.random() * 3));
  return {
    id: i,
    name: `Property ${i+1}`,
    tags: tags.length == 0 ? ["buy"] : tags,
    address: {
      city: city(),
      postalCode: zipCode(),
      street: street(),
      unit: buildingNumber(),
    },
    photoUrl: faker.image.urlLoremFlickr({category: "house", width: 320, height: 240})
    //   "https://cdn.pixabay.com/photo/2014/11/21/17/17/house-540796_1280.jpg",
  };
});

const propertiesData = {
    properties
};

const propertiesJson = JSON.stringify(propertiesData, null, 2);
fs.writeFile("db.json", propertiesJson, 'utf8', (err) => {
    if(err){
        console.error("Error writing properties to file");
    }else{
        console.log("Properties written to file");
    }
})
