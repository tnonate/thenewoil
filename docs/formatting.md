# Formatting

## Prerequisites

- [NodeJS](https://nodejs.org/en/) is installed

## Introduction

For proper formatting of `.md`, `.mdx`, `.astro` files `prettier` is used. The formatting settings are defined inside of the `.prettierrc` file in the root directory.

## Installation

From the root directory run:

```cmd
npm i
```

This will install `prettier`, `prettier-plugin-astro`, `prettier-plugin-tailwindcss` and create a folder called `node_modules` in which the dependency files are stored

## Usage

### With VSCode / VSCodium

With VSCode install the following plugins:

- `DavidAnson.vscode-markdownlint`
- `esbenp.prettier-vscode`

This project contains a `.vscode` folder with `settings.json`, it by default sets prettier as the default formatter for `.astro`, `.css` and `scss` files. For the `.md` file extensions the `vscode-markdownlint` plugin is used.

*note: if you do not have `editor.formatOnSave` turned on, make sure to manually run the formatter*

### With commandline

To format all files in the project, run the following command:

```cmd
npm run format:write
```
