# how-react-works

This is a website describing how ReactJS works, and how it can be useful.

# development

Because this website uses JSX, you'll need to install the JSX compiler:
```
npm install babel-cli@6 babel-preset-react-app@3
```
Then you'll need to tell it to start listening for script changes to compile:
```
npx babel --watch scripts/src --out-dir scripts/dist --presets react-app/prod
```