---
title: "BiliSing: 一种基于哔哩哔哩的 KTV 点歌台方案"
date: 2025-08-24 03:30:00
tags: [Projects, 前端]
---

#### 简介

我如此向苹果审核说: BiliSing 是一款允许用户使用其他设备控制运行该软件设备上播放的媒体的软件. 当用户自建同步服务器后, 可以由多个控制端控制该设备所播放的媒体. 用户还可以通过 AirPlay 的方式将该设备播放的媒体投屏到电视等设备以供多人聚会时一同观看. 

省流就是, 基于哔哩哔哩的ktv点歌系统. 人们去一个可以投屏的ktv, 或者聚众集会, 可以拿一台设备开这个软件, 其他一群人扫码就可以控制这个设备上放的视频, 你可以再拿这个设备去投屏或者接投影, 或者直接在大屏幕安装这个. 除此之外, 如果你想记住你们这次一起放了什么视频, 点那个一键添加收藏夹, 可以新建个收藏夹把所有放过的存进去. 

#### 如何使用

仅主设备（播放设备）需要下载客户端/浏览器插件, 
安卓  [https://sing.bilibiili.com/static/BiliSing_1.0.apk](https://sing.bilibiili.com/static/BiliSing_1.0.apk)
苹果  [https://apps.apple.com/app/bilising/id6749165474](https://apps.apple.com/app/bilising/id6749165474)
浏览器插件  [https://sing.bilibiili.com/static/bilising.user.js](https://sing.bilibiili.com/static/bilising.user.js)
或直接用对应设备浏览器打开  [https://sing.bilibiili.com](https://sing.bilibiili.com)  选择播放设备后按提示操作. 
从设备扫描主设备上的二维码或输入同一房间号即可控制主设备播放. 

#### 关于做

最开始给 AI 看了这个.

```js
# BiliSing
BiliSing 是一个卡拉ok点歌系统. 后端由Python+Flask实现, 前端由原生js实现. 该项目没有任何数据库部分, 所有运行时数据保存在内存中. 
后端需要维护一个以下类型的房间列表和房间信息. 
typedef RoomList = RoomInfo[]
typedef RoomInfo = {
    playList: Song[];
    currentPlaying: Song[];
    roomId: String;
    users: User;
}
typedef User = {
    name: String;
    uuid: String; // 随机生成
    type: 'master' | 'slave'; // master代表播放设备, slave代表点歌设备
}
typedef Song = {
    title: String; // 视频标题
    producer: String; // 尝试解析哔哩哔哩的视频up主名称
    url: String; // 该视频的哔哩哔哩播放链接
}

前端需要在输入一个房间id和当前设备类型后加入一个房间, 若该id不存在且当前设备身份为master则创建, 无需使一个房间只有一个master. 
前端与后端通过socket.io连接. 
若当前设备为master, 前端需把currentPlaying的Song通过iframe的方式嵌入并播放哔哩哔哩视频；若没有currentPlaying, 展示暂无正在播放歌曲. master界面同时需要展示下一首播放的歌曲. 
若当前设备为slave, 前端需允许通过粘贴哔哩哔哩分享链接的方式点歌, 同时允许在播放列表中删除歌曲和调整歌曲顺序. 

**注：歌曲即为哔哩哔哩的一个视频. **
```

后来发现哔哩的 `iframe` 跨域问题一直不解决, 改做了浏览器插件. 于是苹果得做个 APP , 过审的过程放在 [/posts/2025/08/bilising-appstore.html](/posts/2025/08/bilising-appstore.html) . 

#### 关于致谢

感谢 Skyzhou 的测试视频.

感谢 Enkephalin 的 Icon 设计.