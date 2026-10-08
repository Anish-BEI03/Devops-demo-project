resource "aws_key_pair" "terraform-key" {
  key_name   = "terraform-key"
  public_key = var.ssh_public_key != "" ? var.ssh_public_key : (fileexists("${path.module}/../terraform-key.pub") ? file("${path.module}/../terraform-key.pub") : "")
}

resource "aws_instance" "web-server"{
  key_name = aws_key_pair.terraform-key.key_name 
  ami = data.aws_ami.ubuntu.id
  instance_type = "t3.micro"
  subnet_id = data.aws_subnet.my-public-subnet.id
  vpc_security_group_ids = [data.aws_security_group.main.id]
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


