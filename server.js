'use strict'

const Path = require('path')
const Hapi = require('hapi')
const Joi = require('joi')
const Inert = require('inert')
const Hoek = require('hoek')

// Create a server with a host and port
const server = new Hapi.Server()
server.connection({
  host: '0.0.0.0',
  port: 8000
})

server.register(Inert, () => {})

// Harcoded payload
var adventurers = [{
  name: 'Agnium',
  location: 'Earth',
  age: 100,
  image: 'agnium.png'
}, {
  name: 'Abyor',
  location: 'Milky Way',
  age: 200,
  image: 'abyor.png'
}, {
  name: 'Hazeorid',
  location: 'Universe',
  age: 300,
  image: 'hazeorid.png'
}]

// Specify routes
server.route(
  [
    // Get homepage
    {
      method: 'GET',
      path: '/',
      handler: function(req, reply) {
        return reply('Hello all!');
      }
    },
    // Get all adventurers
    {
      method: 'GET',
      path: '/api/adventurers',
      handler: function(req, reply) {
        reply(adventurers);
      }
    },
    // Get adventurer by id
    {
      method: 'GET',
      path: '/api/adventurer/{id?}',
      handler: function(req, reply) {
        if (req.params.id) {
          if (adventurers.length <= req.params.id) {
            return reply('No adventurer found.').code(404);
          }
          return reply(adventurers[req.params.id]);
        }
        reply(adventurers)
      }
    },
    // Post to adventurers
    {
      method: 'POST',
      path: '/api/adventurers',
      config: {
        handler: function(req, reply) {
          var newadventurer = {
            filename: req.payload.filename,
            title: req.payload.title
          };
          adventurers.push(newadventurer);
          reply(newadventurer);
        }
      }
    },
    // Delete adventurer by id
    {
      method: 'DELETE',
      path: '/api/adventurer/{id}',
      handler: function(req, reply) {
        if (adventurers.length <= req.params.id) {
          return reply('No adventurer found.').code(404);
        }
        adventurers.splice(req.params.id, 1);
        reply(true);
      }
    }
  ]
);

// Start the server
server.start((err) => {
  if (err) {
    throw err
  }
  console.log('Server running at:', server.info.uri)
})
