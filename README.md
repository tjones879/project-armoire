# Project Armoire

To fetch all dependencies run
```
scripts/get_deps.sh
```

This will automatically navigate to both the backend and the
client and call `npm install` in their respective directories.


To run all tests:
```
scripts/run_tests.sh
```

This will also automatically navigate to directories and run
their respective tests by calling `npm test`.

To create the docker image run 
```
scripts/createImage.sh
```

This will use the Dockerfile to create the vm image. To add more languages for compilation, you have to add the proper compiler/interpreter to the image as well as the front end code. 

Starting the react dev server can be done by navigating to
`client` and calling `npm start`.

Starting the node backend server can be done by navigating to
`backend` and calling `npm start`.

A mongo daemon must also be run from localhost on port 27017.
Simply running `mongod` with no flags should default to 27017.

Node will automatically run on port 3001 and react will run on
port 300. Navigate to localhost:3000 to access the server. There
is a proxy that connects the react server to the backend's RESTful
API.
