# seer-manage-system

系统环境：centos7

## 1. 安装Nginx

`yum install -y nginx`



## 2.下载 release v1.0版本的 dist.zip

```
cd /home

wget https://github.com/seer-developer-community/seer-analyse-manage/releases/download/v1.0/dist.zip

unzip dist.zip

```

## 3.配置Nginx代理

```
cd /etc/nginx/conf.d

vim mynginx.conf
```

**mynginx.conf的配置信息：**

```
server {
  listen 80 default_server;
  server_name _;
  listen [::]:80 default_server;
  root /home/dist;
  index index.html index.htm;
  location /apis {
    proxy_set_header Host   $host;
    proxy_set_header   X-Real-IP        $remote_addr;
    proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
    proxy_pass http://localhost:8999/;
  }
}
```

## 4.重启nginx

```
systemctl restart nginx
```
