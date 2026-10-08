
variable "root_volume_size" {
  description = "Size of the root volume"
  type        = number
  default     = 8
}

variable "instance_type" {
  description = "Type of the instance"
  type        = string
  default     = "t3.micro"
}

variable "ssh_public_key" {
  description = "Public SSH key for EC2 key pair"
  type        = string
  default     = ""
}
