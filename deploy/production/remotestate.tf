data "terraform_remote_state" "cajasocial" {
  backend = "s3"

  config = {
    bucket   = "tf-cajasocial-remote-state"
    key      = "cajasocial/production/state"
    region   = "us-east-1"
    profile  = "cajasocial"
    role_arn = "arn:aws:iam::CustomAccount:role/CustomRole"
  }
}

data "terraform_remote_state" "config" {
  backend = "s3"

  config = {
    bucket   = "tf-cajasocial-remote-state"
    key      = "cajasocial/config/state"
    region   = "us-east-1"
    profile  = "cajasocial"
    role_arn = "arn:aws:iam::CustomAccount:role/CustomRole"
  }
}

