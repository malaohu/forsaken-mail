Forsaken-Mail
==============
即收即毁的临时邮件服务

[在线演示](http://forsaken.somecolor.cc/)


### 步骤 

### 域名解析 

为了接收电子邮件，您的smtp服务器地址应该在某处可用。两个记录应该添加到您的DNS记录中。假设我们想在``*@subdomain.domain.com```:*接收电子邮件，首先是MX记录：```subdomain.domain.com MX 10 mxsubdomain.domain.com```。这意味着像``*@subdomain.domain.com``这样的地址的邮件服务器将是``mxsubdomain.domain.com```.*然后是A记录：``mxsubdomain.domain.com是.your.mailin.server```的.ip.address。这会告诉您可以在哪个ip地址找到邮件服务器。

您可以启动Mailin（请参阅下一节）并使用[smtp服务器测试]（http://mxtoolbox.com/diagnostic.aspx）验证所有内容是否正确。


### 开始 

```
npm install && npm start
```

```
pm2 start start.json

# 或者

pm2 start start-blacklist.json
(启动黑名单过滤)
```

愉快的使用吧！ 

### 配置

黑名单配置：
config.js 中
