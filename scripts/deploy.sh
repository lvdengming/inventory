#!/bin/bash

# 加载环境变量
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

if [ -f "$SCRIPT_DIR/.env.deploy" ]; then
  source "$SCRIPT_DIR/.env.deploy"
else
  echo "错误: 未找到 $SCRIPT_DIR/.env.deploy 文件"
  exit 1
fi

# 检查 dist 目录是否存在
if [ ! -d "dist" ]; then
  echo "错误: dist 目录不存在，请先执行构建"
  exit 1
fi

# 检查 sshpass 是否安装
if ! command -v sshpass &> /dev/null; then
  echo "错误: 请先安装 sshpass (brew install sshpass 或 apt install sshpass)"
  exit 1
fi

echo "正在部署到 ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH} ..."

# 删除服务器目标目录下所有文件
sshpass -p "${DEPLOY_PASSWORD}" ssh -o StrictHostKeyChecking=no -p "${DEPLOY_PORT}" \
  "${DEPLOY_USER}@${DEPLOY_HOST}" "rm -rf ${DEPLOY_PATH}/* ${DEPLOY_PATH}/.[!.]*"

if [ $? -ne 0 ]; then
  echo "错误: 清理远程目录失败"
  exit 1
fi

# 上传 dist 目录下所有文件到服务器
sshpass -p "${DEPLOY_PASSWORD}" scp -o StrictHostKeyChecking=no -P "${DEPLOY_PORT}" \
  -r dist/* "${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}/"

if [ $? -ne 0 ]; then
  echo "错误: 文件上传失败"
  exit 1
fi

echo "部署完成!"
