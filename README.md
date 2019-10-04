# This project is a heirloom register for the capstone project for COMP30022
## The architecture is documented here https://blog.isub.dev/university-capstone-project-airloom-a-web-app-to-track-heirlooms/
## The frontend has had some deployment changes, it is no longer being served by cloudfront, netlify is now our CDN, however the cloudfront distribution is still up
## The frontend should be easy to get up and running, however you will be using my AWS resources in doing so (cognito+lambda)
## The backend is hosted here https://github.com/isubasinghe/COMP30022-backend and this will require multiple environment variables. These include 
* DB_USER
* DB_PWD
* DB_URL
* DB_PORT
* DB_DATABASE
* LOGDNA_INGESTION_KEY
* COGNITO_ISS
* COGNITO_APP_CLIENT
* CLOUDINARY_URL
* SENTRY_DSN
* MAPBOX_TOKEN

