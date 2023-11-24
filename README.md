# Breaddit API
-Link to the hosted version of this API is here: postgres://fpdhdrlh:C2vO1raxVg1SJTKYiAzJT_OVhALh34am@cornelius.db.elephantsql.com/fpdhdrlh 


This project is an API for the purpose of accessing application data programmatically. The intention here is to mimic the building of a real world backend service (such as Reddit) which should provide this information to the front end architecture.

The database is PSQL, and you will interact with it using node-postgres.

-copy the code from the github page https://github.com/BeckBob/breaddit Create a new public GitHub repository. Do not initialise the project with a readme, .gitignore or license.

From your cloned local version of this project you'll want to push your code to your new repository using the following commands:

git remote set-url origin YOUR_NEW_REPO_URL_HERE
git branch -M main
git push -u origin main

To install dependencies, seed local database, and run tests look at package.json to find the scripts,
for the dependencies input into terminal "npm install ${dependency name}"

-You will need to create two .env files for your project: .env.test and .env.development. Into each, add PGDATABASE=, with the correct database name for that environment (see /db/setup.sql for the database names). Double check that these .env files are .gitignored.

You'll need to run npm install at this point.

to run tests input into terminal npm t

THE MINIMUM VERSION OF POSTGRES you will need is 8.7.3

THE MINIMUM VERSION OF NODE YOU WILL NEED IS 1.0.4




