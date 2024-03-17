# Getting Started

## Installing Node

### From the website

Go to [https://nodejs.org/](https://nodejs.org/) and follow the instructions for installing version 20.x.x. To run this project at least version 20 is required.

### Using Nvm

Nvm (short for Node Version Manager) is a tool that helps with using multiple versions of Node at the same time.

```console
nvm install v20
```

Then to use the newly installed version of Node type the following for your specific version of Node:

```console
nvm use 20.x.x
```

Once Node v20 is installed you have access to two new commands `node` and `npm`. `npm` (short for Node Package Manager) is the official package manager provided by Node. It is used to install and manage dependencies. The `node` command is for running raw `.js` files, but we will not be using that.

## Installing Dependencies

Now run the following command to install the dependencies. This will create a folder in the root directory of the project called `node_modules` this folder is not to be committed to the GIT (hence its inclusion in the .gitignore).

```console
npm run setup
```

Alternatively you can run `npm install` which will also install dependencies, but it will not setup the tools in the prefered way (e.g. disabling astro telemetry)

## Running the project

Now that all dependencies are installed you can run the following commands:

- `npm run setup` - Installs all dependencies and disables astro telemetry - runs "npm i && astro telemetry disable"
- `npm run dev` - Starts the development server - runs "astro dev"
- `npm run start` - Starts the development server - runs "astro dev"
- `npm run build` - Builds and compiles the files into html assets and puts it into the `/dist` folder. The `/dist` folder should be put on the file server - runs "astro build"
- `npm run preview` - Takes the built files from `/dist` and starts a server to preview the built files - runs "astro preview"
- `npm run format:check` - Checks which formatting issues exist - runs "prettier --check ."
- `npm run format:write` - Formats all of the files in the project - runs "prettier --write ."

To start developing you can use `npm run start` or `npm run dev`.

## Development resources

- [All about the config.json](config.md)
- [Project formatting](formatting.md)
- [What the project structure looks like](project-structure.md)
- [How to link to other pages](content/linking.md)
- [How internationalization works](content/internationalization.md)
- [How to use icons](content/icons.md)

## Docs

- [Components](components.md)
- [Config](config.md)
- [Formatting](formatting.md)
- [Layouts](layouts.md)
- [Project Structure](project-structure.md)
- [Aliasing](content/aliasing.md)
- [Icons](content/icons.md)
- [Internationalization](content/internationalization.md)
- [Linking](content/linking.md)
- [New Guide Sections](content/new-guide-sections.md)
- [New Guides](content/new-guides.md)
- [New Pages](content/new-pages.md)
