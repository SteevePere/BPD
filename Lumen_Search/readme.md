sudo docker build -t lumen_search .

sudo docker run --name lumen_search --network="host" -d lumen_search:latest

Ensuite on accède au container via localhost:80
