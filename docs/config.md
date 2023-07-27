# Config.json

The `/config.json` file is where the main configuration of the project takes place. Here you can change thinks like the title, add metatags and add new languages.

## Structure

Since the config file is written in [JSON](https://www.json.org) it always requires a root object.

```json
{
    "title": "text", // <--- What gets displayed as title in your browser tab
    "metatags": [ // <--- Must be an array
        {
            "name": "text", // <--- the name of the <meta /> tag
            "content": "text" // <--- the content of the <meta /> tag
        }
    ],
    "languages": [ // <--- Must be an array. If only 1 or 0 languages exist, the language switcher will be hidden
        {
            "code": "text", // <--- The language code of the language. Is used for routing and redirecting
            "name": "text", // <--- The official name of the language. Used in the language switched
            "weight": 0, // <--- Must be a number. Is used to decide which language is displayed first
            "image": "text", // <--- A path as seen from the website root to an image. Is used in the language switcher (image should preferably be a flag)
            "isDefault": true // <--- Can be true or false. Is used to decide which language should be considered the default. There can only be ONE item with this on true
        }
    ]
}
```

If you want to know what the implications are on the project structure [click here](project-structure.md)

## Example

```json
{
  "title": "The New Oil",
  "metatags": [
    {
      "name": "description",
      "content": "Data is the new oil"
    },
    {
      "name": "monetization",
      "content": "$ilp.uphold.com/gywWRZd488m6"
    },
    {
      "name": "author",
      "content": "Nathan Bartram"
    }
  ],
  "languages": [
    {
      "code": "en",
      "name": "English",
      "weight": 1,
      "image": "/images/languages/en.svg",
      "isDefault": true
    },
    {
      "code": "nl",
      "name": "Dutch",
      "weight": 2,
      "image": "/images/languages/nl.svg",
      "isDefault": false
    }
  ]
}
```
