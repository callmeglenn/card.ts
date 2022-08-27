# card.ts
A card manager and builder for simulating card-collecting.

## Requirements
- [@napi-rs/canvas](https://www.npmjs.com/package/@napi-rs/canvas) - 0.1.29
- [short-unique-id](https://www.npmjs.com/package/short-unique-id) - 4.4.4

## Setup

```sh-session
npm install card.ts
```

**Creating a Card Collection**

```js
const { Collection, Series, Card } = require('card.ts')
// Export this collection to be used in your other folders.
const collection = new Collection(
	new Series("series_1").set(
		new Card({ name: "card_1" }),
		new Card({ name: "card_2" })
	),
	new Series("series_2").set(
		new Card({ name: "card_3" }),
		new Card({ name: "card_4" })
	)
)
```

**Creating a new card and fetching its image**

```js
const card = collection.create("series_1", "card_1")
// This will only work if you have an images/characters directory from your root folder.
// The .png image in the directory must have a similar name as the name parameter of a Card class.
const image = await card.image()
```

**Forcing cards to be created when creating collection**

```js
const { Collection, Series, Card, Data } = require('card.ts')
const series = new Series("series_1")
const card = new Card({ name: "card_1" })
// This forces cards with the following IDs to already be added with the Collection.
card.set(
	new Data({ id: "12345" }),
	new Data({ id: "abcde" }),
)
```
