# Covid application

For app running you must firstly create mongodb two databases for test environment
and for development environment. For that you need use this
[Data source](https://www.ecdc.europa.eu/en/publications-data/data-covid-19-vaccination-eu-eea)
to feed data in mongo.
You need download in CSV and then import data into mongo using this
bash terminal command:  `mongoimport --type csv -d databaseName -c collectionName --headerline --drop data.csv`

# Env

You need create `.env` file by analogy `.env.example`

# Covid API

For app running you must use `npm run start:dev` terminal command.
Request Description:

GET /vaccine-summary

Query Parameters:\
c, country code to get report for \
dateFrom, yyyy-Www, eg. 2020-W10 (Including) \
dateTo, yyyy-Www, eg, 2020-W20 (Excluding) \
rangeSize, number, eg, the period for which to calculate metrics \
sort, either by NumberDosesReceived[descending] or weekStart [ascending]

Request example \
GET /vaccine-summary?c=AT&dateFrom=2020-W10&dateTo=2020-W53&range=5

# Covid API test running

For test running you must use `npm run test:e2e` terminal command



