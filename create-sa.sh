## create-sa.sh

#### Variables
SERVICE_ACCOUNT_ID="customer-1"
PROJECT_ID="my-medium-demo-project-299218"
SA_DESCRIPTION="Customer 1 description"
SA_DISPLAY_NAME="Customer 1"
ROLE_NAME="roles/cloudfunctions.invoker"
####

### Create service account
gcloud iam service-accounts create $SERVICE_ACCOUNT_ID \
    --project="$PROJECT_ID" \
    --description="$SA_DESCRIPTION" \
    --display-name="$SA_DISPLAY_NAME"

### Add Policy Binding / Role to service account
gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:$SERVICE_ACCOUNT_ID@$PROJECT_ID.iam.gserviceaccount.com" \
    --role="$ROLE_NAME"

### Print list of service accounts
gcloud iam service-accounts list \
  --project="$PROJECT_ID"