provider "aws" {
  region = var.aws_region
}

# VPC Architecture
resource "aws_vpc" "worksphere_vpc" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true
  tags = { Name = "worksphere-enterprise-vpc" }
}

# EKS Cluster Provisioning
module "eks" {
  source          = "terraform-aws-modules/eks/aws"
  version         = "20.8.4"
  cluster_name    = "worksphere-eks-cluster"
  cluster_version = "1.29"
  vpc_id          = aws_vpc.worksphere_vpc.id
  subnet_ids      = [aws_subnet.public_1.id, aws_subnet.public_2.id]

  eks_managed_node_groups = {
    enterprise_nodes = {
      min_size     = 3
      max_size     = 10
      desired_size = 5
      instance_types = ["t3.xlarge"]
    }
  }
}

# RDS PostgreSQL Instance
resource "aws_db_instance" "worksphere_rds" {
  identifier           = "worksphere-enterprise-db"
  allocated_storage    = 100
  engine               = "postgres"
  engine_version       = "15.4"
  instance_class       = "db.m5.xlarge"
  db_name              = "worksphere_enterprise"
  username             = "postgres"
  password             = var.db_password
  skip_final_snapshot  = true
}

resource "aws_subnet" "public_1" {
  vpc_id            = aws_vpc.worksphere_vpc.id
  cidr_block        = "10.0.1.0/24"
  availability_zone = "${var.aws_region}a"
}

resource "aws_subnet" "public_2" {
  vpc_id            = aws_vpc.worksphere_vpc.id
  cidr_block        = "10.0.2.0/24"
  availability_zone = "${var.aws_region}b"
}
