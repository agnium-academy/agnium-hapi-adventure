Agnium Hapi Adventure
=====================

Adventure of web app with REST API, using hapi.js in action. This is a very simple campers database app.

REST API
--------

List of the routes:

| Route                | HTTP Verb | Description
|----------------------|-----------|------------------------------------
| /api/adventurers     | GET       | Get all the adventurers
| /api/adventurers     | POST      | Create an adventurer
| /api/adventurers/:id | GET       | Get a single adventurer
| /api/adventurers/:id | PUT       | Update an adventurer with new info
| /api/adventurers/:id | DELETE    | Delete an adventurer

Usage
-----

```
npm install
npm install -g pm2
pm2 start ecosystem.json
```
