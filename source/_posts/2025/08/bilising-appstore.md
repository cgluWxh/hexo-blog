---
title: 关于 BiliSing 的 App Store 过审
date: 2025-08-24 03:41:00
tags: Projects
---

#### 过审方案

软件本身过苹果的审核肯定是没问题, 关键是如何使其合理合法规避 ICP 备案在中国内地上架的问题.

采取了所谓 `枪弹分离` 模式. 上架版本不公开提供用于同步播放列表的服务器, 称需要用户自主搭建, 便未提供网络服务. 自己搭建的网络服务只共享给同学好友, 若要大规模发布 / 共享可以搭建非中国内地的同步服务器, 再单独分发同步服务器地址即可. 

#### 提交历史

**2025-08-15 v1.3 过审！**

**2025-08-14 中午 被拒**

- 需要更多信息：详细描述软件是用来干什么的？是否只能连接到哔哩哔哩的服务器，也连接到别的服务器吗？连接服务器后可以做什么？Demo视频。

    - Please explain in detail what your app is used for?

        - There is some situation that you go to someplace like a ktv with your friend and you can use your iPad to AirPlay some video to the big screen. This app solves the problem that is how to control the video your iPad playing. By creating a QR Code and use the sync server, you all can scan the QR code and control the content it plays on your iPhone or iPad or other devices. You all create a playlist and the iPad used to AirPlay just play these videos one by one, also you can switch to the next video or adjust their order on the controller.

    - Is it only able to connect to Bilibili's servers? Does it also connect to other servers?

        - Currently only Bilibili's servers are available. Because the sync server is designed to fit bilibili servers. We are considering to design more sync server to extend its compatibility.

    - What actions can be performed after connecting to the server?

        - Use other devices to control what's played on the device running the app.

    - Please provide a demo video that includes a full introduction of all the features and intended use of your app.

        - Attached.

- 需要更换 iPad 宣传图，需要展示软件详细运行时的截图而不只是首页截图。

**2025-08-13 晚上 被拒**

- 拒绝理由是隐私声明写的不符合，需要改进隐私声明

**2025-08-13 上午 被拒**

- 拒绝理由是需提供服务器和 ID 信息，同时不能在 iPad 版本介绍页使用 iPhone 截图。