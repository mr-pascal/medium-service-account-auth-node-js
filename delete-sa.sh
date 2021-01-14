## delete-sa.sh

#### Variables
SERVICE_ACCOUNT_ID="customer-1"
PROJECT_ID="my-medium-demo-project-299218"
####

### Delete service account
gcloud iam service-accounts delete \
  "$SERVICE_ACCOUNT_ID@$PROJECT_ID.iam.gserviceaccount.com"