terraform {
  backend "s3" {
    bucket         = "tf-cajasocial-remote-state"
    key            = "cajasocial/production/micro_task_service"
    region         = "us-east-1"
    profile        = "cajasocial"
    dynamodb_table = "TerraformBackendLocks"
    role_arn       = "arn:aws:iam::CustomAccount:role/CustomRole"
  }
}
