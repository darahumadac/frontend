#!/bin/bash
jq '.photos[].src.medium' properties_images.json > temp_urls.json
jq --slurpfile source temp_urls.json '.properties[] | .photoUrl = $source[.id]' db.json | jq -s '.' > temp_data.json
jq --slurpfile source temp_data.json '.properties = $source[0]' db.json > temp_db.json
mv temp_db.json db.json
rm temp_*.json