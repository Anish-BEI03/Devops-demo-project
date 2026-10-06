# =============================================================================
# OUTPUT VALUES
# =============================================================================

# VPC Outputs
output "vpc_id" {
  description = "The ID of the VPC"
  value       = module.vpc.vpc_id
}

output "vpc_cidr_block" {
  description = "The CIDR block of the VPC"
  value       = module.vpc.vpc_cidr_block
}

output "private_subnets" {
  description = "List of IDs of private subnets"
  value       = module.vpc.private_subnets
}

output "public_subnets" {
  description = "List of IDs of public subnets"
  value       = module.vpc.public_subnets
}

# EKS Outputs
output "cluster_name" {
  description = "The name of the EKS cluster"
  value       = module.devops_demo_eks.cluster_name
}

output "cluster_endpoint" {
  description = "Endpoint for EKS control plane"
  value       = module.devops_demo_eks.cluster_endpoint
}

output "cluster_security_group_id" {
  description = "Security group ID attached to the EKS cluster"
  value       = module.devops_demo_eks.cluster_security_group_id
}

output "configure_kubectl" {
  description = "Command to configure kubectl to connect to the EKS cluster"
  value       = "aws eks update-kubeconfig --region ${var.aws_region} --name ${module.devops_demo_eks.cluster_name}"
}
