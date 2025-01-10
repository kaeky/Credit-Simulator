terraform {
  backend "s3" {
    bucket         = "tf-cajasocial-remote-state"
    key            = "cajasocial/micro_task_ecr"
    region         = "us-east-1"
    profile        = "cajasocial"
    dynamodb_table = "TerraformBackendLocks"
    ## The role_arn is the same as the one in the provider.tf file
    role_arn       = "arn:aws:iam::CustomAccount:role/CustomRole"
  }
}
