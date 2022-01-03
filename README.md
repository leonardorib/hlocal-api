# About

NodeJS API for a companies/locations management system. The user can create companies, attach responsibles and locations to it. Locations also can have responsibles specified.

The user only has access to companies created by himself.

# How can I use the API?

This api is deployed on a Digital Ocean server. You can easily check the documentation and test it by accessing:

https://api.hlocal.leonardoribeiro.com/swagger

## How can I run it locally?

If you prefer to run it locally on your machine, follow the steps:

1. Clone this repository.

2. Create your .env at the root of the project file based on the .env.example.

3. Install the dependencies:

```
npm install
```

4. Start the containers (they must be already running before next step):

```
docker-compose up
```

5. Run database migrations with:

```
npm run docker:db-run-migrations
```

## Where is the app frontend?

You can check out the frontend repository at:

https://github.com/leonardorib/hlocal-app

## The author

Made with :heart: by Leonardo Ribeiro. :brazil:

Get in touch! :smiley:

<div><a href="https://www.linkedin.com/in/leonardorib/"><img alt="LinkedIn" src="https://img.shields.io/badge/LinkedIn-leonardorib-blue?style=for-the-badge&logo=linkedin&labelColor=333333"></a></div>&nbsp&nbsp<div><a href="mailto:leonardo.rib@hotmail.com"><img alt="Email" src="https://img.shields.io/badge/Email-leonardo.rib@hotmail.com-blue?style=for-the-badge&logo=microsoft-outlook&labelColor=333333"></a></div>
