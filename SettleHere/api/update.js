import fs from "fs";
import {faker} from "@faker-js/faker";

let data
fs.readFile("db.json", (err, data) => {
    if(err){
        console.error("error reading data");
        return;
    }
    console.log("read data successful")
    const dbData = JSON.parse(data)
    dbData.properties.forEach(p => {
        p.transactionType = ["buy", "rent"][Math.floor(Math.random() * 2)]
        const minPrice = p.transactionType == "rent" ? 2800 : 250000;
        const maxPrice = p.transactionType == "rent" ? 8000 : 5000000;
        p.price = faker.finance.amount({min: minPrice, max: maxPrice, dec: 0})
        p.toilets = Math.floor(Math.random() * 4)+1;
        p.type = ["house-and-lot", "condo", "commercial"][Math.floor(Math.random()*3)]
        p.bedrooms = faker.number.int({min: 1, max: 5})
        p.floorSize = faker.number.int({min: 500, max: 10000})
        p.buildYear = faker.date.past({years: 60}).getFullYear()
        p.furnishing = Math.floor(Math.random() * 3); //0: unfurnished, 1: partial furnished, 2: fully furnished
        p.tags = []
        if(Math.floor(Math.random()*10) == 1)
        {
            p.tags = ["rent-to-own"]
        }else if(Math.floor(Math.random()*6) == 1){
            p.tags = ["pre-selling"]
        }else if(Math.floor(Math.random() * 101 == 5)){
            p.tags = ["rent-to-own", "pre-selling"]
        }
        p.listedDate = faker.date.recent({days: 30})
    })
    console.log(dbData);

    fs.writeFile("db.json", JSON.stringify(dbData, null, 2), 'utf8', (err) => {
        if(err){
            console.error("Error writing updated properties to file");
        }else{
            console.log("Updated properties written to file");
        }
    })
    
})

