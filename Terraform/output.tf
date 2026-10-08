output "webserver_public_ip" {
  value = aws_instance.web-server.public_ip
  description = "Public IP address of the web server"
}

output "webserver_public_dns_name" {
  value = aws_instance.web-server.public_dns
  description = "Public DNS name of the web server"
}
