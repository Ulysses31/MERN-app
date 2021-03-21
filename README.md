# React MERN CRUD App using Heroku and MongoDb

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### **`npm start`**

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### **`npm test`**

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### **`npm run build`**

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

# Heroku Deployment

To **deploy** the application

<ol>
<li><b>Project init</b></li>
  <ol>
   <li>delete .git && .gitignore from client</li>
   <li>add /client/node_modules in root .gitignore</li>
   <li>create file <b>Procfile</b> in root directory</li>
   <li>go to <b>root</b> package.json and add scripts
  "heroku-postbuild": "NPM_CONFIG_PRODUCTION=false npm install --prefix client"</li>
  </ol>
<li><b>cli build</b></li>
  <ol>
    <li>heroku login</li>
    <li>heroku create</li>
    <li>git:remote -a name-of-heroku-app</li>
    <li>do all git commits</li>
    <li>build the static client running cd client && npm run build from client folder</li>
    <li>git add . && git commit -m "add static client folder"</li>
    <li>git push into git remote repo</li>
    <li>deploy to heroku... <b>git push heroku master</b></li>
  </ol>
</ol>

# Heroku Link

https://fathomless-waters-33241.herokuapp.com/

## GitHub

Github url https://github.com/Ulysses31/MERN-app.git
