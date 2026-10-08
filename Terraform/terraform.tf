terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "6.68.0"
    }
  }
  backend "s3" {
    bucket = "terraform-state-bucket-7a7cc75793cd04a7"
    key    = "devsecops-project/terraform/terraform.tfstate"
    region = "us-east-1"
    use_lockfile = true
  }
}

provider "aws" {
    region = "us-east-1"
}

