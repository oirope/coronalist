# coronalist
A grocery list for all your COVID-19 dreams. I realized it was a clone of [Reesisms](https://github.com/Spaceface16518/Reesisms) halfway through making it.

## Running locally

### Prerequisites
You need to have [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) and [Node](https://nodejs.org/en/download/) installed.

### Install
Create a .env file with a specified PORT and MONGODB_URI.
```
git clone https://github.com/GeometricStoat/coronalist
npm install
npm start
```
This should start the server at the port you specified in the .env file.

## Deploying with Heroku and Docker
You can just link your Git repository to Heroku or deploy with Docker.

### Prerequisites
You need to have the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli), [Docker](https://docs.docker.com/install/), and this repository on your local machine.

### Pushing and Releasing
Simply login to Heroku via the CLI and create a new project.
```
heroku container:push web -a NAME_OF_PROJECT
heroku container:release web -a NAME_OF_PROJECT
```
You can also use docker-up:
```
npm install -g docker-up
docker-up
```
docker-up creates a new project every time, so add the --update flag and it will update the project with the name in the .heroku_app_name file.

## License
MIT
