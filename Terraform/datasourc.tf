data "aws_ami" "ubuntu" {
  most_recent = true
  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*"]
  }
  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
  owners = ["amazon"]
}

data "aws_vpc" "main" {
  tags = {
    Name        = "my_vpc"
    environment = "production"
  }
}

data "aws_security_group" "main" {
  filter {
    name   = "tag:Name"
    values = ["allow-http"]
  }
  filter {
    name   = "tag:environment"
    values = ["production"]
  }
  filter {
    name   = "vpc-id"
    values = [data.aws_vpc.main.id]
  }
}

data "aws_subnet" "my-public-subnet" {
  vpc_id = data.aws_vpc.main.id
  tags = {
    Name        = "my-public-subnet"
    environment = "production"
  }
}

data "aws_key_pair" "terraform-key" {
  key_name = "terraform-key"
}
