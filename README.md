# Breaddit API
-Link to the hosted version of this API is here: postgres://fpdhdrlh:C2vO1raxVg1SJTKYiAzJT_OVhALh34am@cornelius.db.elephantsql.com/fpdhdrlh 


-copy the code from the github page https://github.com/BeckBob/breaddit Create a new public GitHub repository. Do not initialise the project with a readme, .gitignore or license.

From your cloned local version of this project you'll want to push your code to your new repository using the following commands:

git remote set-url origin YOUR_NEW_REPO_URL_HERE
git branch -M main
git push -u origin main


-You will need to create two .env files for your project: .env.test and .env.development. Into each, add PGDATABASE=, with the correct database name for that environment (see /db/setup.sql for the database names). Double check that these .env files are .gitignored.

You'll need to run npm install at this point.




