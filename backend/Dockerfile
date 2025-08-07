# docker build -t metacall/weather-dashboard-example .
# docker run --rm -it metacall/weather-dashboard-example

FROM ubuntu:plucky

RUN apt-get update \
    && apt-get install -y --no-install-recommends wget ca-certificates \
    && wget -O - https://raw.githubusercontent.com/metacall/install/master/install.sh | sh

WORKDIR /weather-dashboard-example

COPY package.json requirements.txt ./

RUN metacall pip3 install -r requirements.txt \
    && metacall npm install

COPY . .

EXPOSE 5000

CMD ["metacall", "main.js"]
