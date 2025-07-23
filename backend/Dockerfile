FROM ubuntu:plucky

RUN apt-get update \
    && apt-get install -y --no-install-recommends wget ca-certificates \
    && wget -O - https://raw.githubusercontent.com/metacall/install/master/install.sh | sh

WORKDIR /weather-dashboard-example

COPY package.json requirements.txt .

RUN metacall pip install -r requirements.txt \
    && metacall npm install

COPY . .

CMD ["metacall", "main.js"]
