
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
