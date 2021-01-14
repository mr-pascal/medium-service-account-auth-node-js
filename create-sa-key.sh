## create-sa-key.sh

#### Variables
SERVICE_ACCOUNT_ID="customer-1"
PROJECT_ID="my-medium-demo-project-299218"
####

### Create private key for service account
gcloud iam service-accounts keys create ~/key.json \
  --iam-account "$SERVICE_ACCOUNT_ID@$PROJECT_ID.iam.gserviceaccount.com"
