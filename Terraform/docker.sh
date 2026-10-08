#!/bin/bash
set -e

apt-get update -y
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
usermod -aG docker ubuntu
apt-get install -y docker-compose-plugin
systemctl enable --now docker
chmod 666 /var/run/docker.sock || true
