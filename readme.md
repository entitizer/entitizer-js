# entitizer

Entitizer main module.

## API

### entitize(context, options)

Entitize a context.

### concepts(context, options)

Extracts concepts from a context: text, lang, country.

### entitiesFromContext(context, options)

Extracts entities from a context.

### entitiesFromConcepts(context, concepts, options)

Extracts entities from concepts.

### entityById(id, options)

Gets an entity by id from Entitizer's DB

### entityByKey(key, options)

Gets an entity by key from Entitizer's DB

### entityByName(name, context, options)

Gets an entity by name & context from Entitizer's DB

### findEntity(name, lang, options)

Finds an entity on the Internet.

### quotes(text, lang, options)

Extracts quotes from a text.

### language(text, options)

Identify text language

### cultures()

Returns supported cultures.
