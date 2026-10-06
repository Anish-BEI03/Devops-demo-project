# =============================================================================
# LOCAL VALUES AND DATA SOURCES
# =============================================================================

# Data sources
data "aws_availability_zones" "available" {
  state = "available"
  filter {
    name   = "opt-in-status"
    values = ["opt-in-not-required"]
  }
}

data "aws_caller_identity" "current" {}

# Random suffix for unique resource names
resource "random_string" "suffix" {
  length  = 4
  special = false
  upper   = false
}

# Local computed values
locals {
  # Cluster configuration with unique suffix to avoid conflicts
  cluster_name = "${var.cluster_name}-${random_string.suffix.result}"
  
  # Network configuration
  azs             = slice(data.aws_availability_zones.available.names, 0, 2)
  private_subnets = [for k, v in local.azs : cidrsubnet(var.vpc_cidr, 8, k + 10)]
  public_subnets  = [for k, v in local.azs : cidrsubnet(var.vpc_cidr, 8, k)]
  
  # Common tags applied to all resources
  common_tags = {
    Environment   = var.environment
    Project       = "Devops Demo Project"
    ManagedBy     = "terraform"
    CreatedBy     = "Anish kumar dash"
    Owner         = data.aws_caller_identity.current.user_id
    CreatedDate   = "2026-10-06"
  }
  
  # Kubernetes subnet tags
  public_subnet_tags = {
    "kubernetes.io/cluster/${local.cluster_name}" = "shared"
    "kubernetes.io/role/elb"                      = "1"
  }
  
  private_subnet_tags = {
    "kubernetes.io/cluster/${local.cluster_name}" = "shared"
    "kubernetes.io/role/internal-elb"             = "1"
  }
}