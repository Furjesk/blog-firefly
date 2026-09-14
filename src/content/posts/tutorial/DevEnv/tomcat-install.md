---
title: Tomcat 卸载与安装
published: 2021-09-29
pinned: false
description: 本文将介绍 Tomcat 绿色版的卸载与安装方法。
image: ./assets/tomcat.png
tags: [Tomcat, 安装, 指南, 教程]
category: 环境安装指南
slug: tutorial-tomcat-install
series: "环境安装指南"
seriesOrder: 1
---

【背景】

将我的Web Project项目导入Eclipse后Tomcat无法启动，关闭eclipse后再尝试启动tomcat依然无法启动。最笨的办法以及最没有技术含量的办法就是卸了重装...

## tomcat绿色解压版卸载

一、因tomcat的安装只需解压到某目录，卸载也只需将原tomcat目录删除即可

二、删除相关注册表。快捷键[win+R]呼出”运行“，输入"regedit"并按回车键，点击同意调出注册表管理界面，按下[ctrl+F]，输入"tomcat"进行逐项查找并逐项删除即可

三、以管理员身份运行cmd, 执行命令"`sc delete tomcat8`"(根据您的版本决定该写几)，删除tomcat service



## tomcat绿色解压版安装

### 1.下好后解压

tomcat官网

**https://tomcat.apache.org/index.html**

![](https://i.bmp.ovh/imgs/2021/09/2cd7a98bd2aed161.png)

### 2.配置环境变量

**2.1 右击此电脑——属性——高级系统设置——高级——环境变量**

**2.2 在系统变量下点击新建，添加 `CATALINA_HOME8`，地址就是上面解压的地址，例如：`D:\DownLoad\apache-tomcat-8.5.71`**

**2.3 在系统变量Path中新添一行：`%CATALINA_HOME8%\bin;%CATALINA_HOME8%\lib`**

![](https://i.bmp.ovh/imgs/2021/09/a8f884b156607b88.png)

**环境变量配置完成**

### 3.启动和安装 Tomcat

**启动：**

进入安装目录的bin目录下，双击启动startup.bat（启动后不要关闭窗口，否则就停止服务了）

打开浏览器，地址栏输入 `localhost:8080` 即可访问。

**安装：**

通过 CMD 安装，以管理员身份运行

* 输入命令`D:`回车（进入d盘）

* 输入`cd D:\DownLoad\apache-tomcat-8.5.71\bin`（进入bin目录）
* 输入 `service.bat install `

稍候提示 the service "tomcat8" has been installed，则表示成功。后面就可以 在服务 中找到 Tomcat 的服务项，然后 启动 Tomcat 服务了。