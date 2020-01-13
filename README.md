# My Cellar BE

This personal project was built to help organize and keep track of the wine a user drinks. I built the backend with postgreSQL and Express.js. A user can use the My Cellar FE app to post the bottle that they drink. A user enters the vineyard, the name of the bottle, the color of the wine, the type of wine, the year, and their own personal rating of the bottle. The front end repo can be found [here](https://github.com/colbyallen012/my-cellar-fe).

## Built With

Express.js 

PostgreSQL

Knex

Deployed to Heroku

## Endpoints 

[Heroku](https://the-vino-cellar.herokuapp.com/)

URL|Verb|Options|Sample Response
---|---|---|---
`https://the-vino-cellar.herokuapp.com/api/v1/vinos` | GET | Not Needed | Array of all existing Wines `Array of all existing wines:[{id: 1, Vineyard: Denver Vineyard, name: Good Wine, color: Red, type: Merlot, year: 2015, rating: 5}]` 
`https://the-vino-cellar.herokuapp.com/api/v1/vinos	` | Post | `Vineyard: string, name: string, color: string, type: string, year: integer, rating: integer` | `New Wine:[{id: 1, Vineyard: Boulder Vineyard, name: Great Wine, color: Red, type: Pinot Noir, year: 2009, rating: 8}]`
`https://the-vino-cellar.herokuapp.com/api/v1/vinos	` | DELETE | Not Needed | Status code of '204' and string of which palette was deleted.
