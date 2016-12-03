# entitizer

Entitizer main module.

[![Build Status](https://travis-ci.org/entitizer/entitizer-js.svg?branch=master)](https://travis-ci.org/entitizer/entitizer-js)

## API

### execute(actionName, data, options)

Executes an action by name. Shortcut for `Action.execute`.

### validate(actionName, data, options)

Validates an action's input: `data` and `options`. Shortcut for `Action.validate`.


## ACTIONS

- `detect.language` - Detects language in a text.
- `entitize.text` - Entitize a text.
- `entitize.url` - Entitize article content from an html page.
- `explore.entity` - Finds an entity on the Internet.
- `extract.article` - Extracts an article from a web page.
- `extract.concepts` - Extracts concepts from a text.
- `extract.quotes` - Extracts quotes from a text.

- `entity.get` - Gets an entity from DB. By `id`, `key` or `name`.
- `entity.find` - Gets entities from DB. By `ids` or `keys`.
- `entity.put` - Create or replace an entity.
- `entity.update` - Updates an entity.
- `entity.delete` - Deletes an entity from DB.

- `entity_name.get` - Gets an entity name from DB. By `key` or `name`.
- `entity_name.find` - Gets entities from DB. By `keys` or `entityId`.
- `entity_name.put` - Create or replace an entity name.
- `entity_name.update` - Updates an entity name.
- `entity_name.delete` - Deletes an entity name from DB.
