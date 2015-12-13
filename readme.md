# entitizer

Entitizer main module.

## API

### concepts(context, options)

Extracts concepts from a context: text, lang, country.

### entitiesFromContext(context, options)

Extracts entities from a context.

### entitiesFromConcepts(context, concepts, options)

Extracts entities from concepts.

### getEntity(name, options)

Gets an entity by name from Entitizer's DB

### findEntity(name, lang, options)

Finds an entity on the Internet.

### quotes(context, options)

Extracts quotes from a context: text, lang.

### language(text, options)

Identify text language

### languages()

Returns supported languages.
