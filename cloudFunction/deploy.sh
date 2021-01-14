#### Variables
PROJECT_ID="my-medium-demo-project-299218"
####

## Deploy Cloud Function
gcloud functions deploy helloHttp \
  --project $PROJECT_ID \
  --runtime nodejs12 \
  --trigger-http \
  --entry-point helloWorld \
  --no-allow-unauthenticated
