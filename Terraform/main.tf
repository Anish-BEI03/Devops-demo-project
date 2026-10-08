resource "aws_security_group" "app_ports" {
  name_prefix = "citybites-app-ports-"
  description = "Allow inbound traffic for web apps, backend api and chat server"
  vpc_id      = data.aws_vpc.main.id

  ingress {
    description = "Backend API"
    from_port   = 4000
    to_port     = 4000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "Chat Server Socket.io"
    from_port   = 5001
    to_port     = 5001
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "Chat Client"
    from_port   = 5172
    to_port     = 5172
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "Admin Panel"
    from_port   = 5173
    to_port     = 5173
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "Frontend"
    from_port   = 5174
    to_port     = 5174
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "HTTP Web"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "HTTPS Web"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name        = "citybites-app-ports"
    environment = "production"
  }
}

resource "aws_instance" "web-server"{
  key_name = data.aws_key_pair.terraform-key.key_name 
  ami = data.aws_ami.ubuntu.id
  instance_type = "t3.micro"
  subnet_id = data.aws_subnet.my-public-subnet.id
  vpc_security_group_ids = [data.aws_security_group.main.id, aws_security_group.app_ports.id]
  associate_public_ip_address = true
  tags = {
    Name = "web-server"
    environment="production"
  }

  user_data = file("docker.sh")

root_block_device {
  volume_size = var.root_volume_size
  volume_type = "gp3"
  delete_on_termination = true
}
}



