---
title: 使用 Go 实现 Wake-on-LAN 中继服务器
date: 2025-09-06 14:00:00
tags: Dev
---

Go 写一个小服务端跑在路由器上，外部经路由器访问，向局域网内的设备发送 Wake-on-LAN 魔术包。

```bash
go get -u github.com/gin-gonic/gin
```

```go
package main

import (
	"encoding/hex"
	"fmt"
	"log"
	"net"
	"strings"

	"github.com/gin-gonic/gin"
)

// 发送 Wake-on-LAN 魔术包
func sendWOL(mac string, ip string, port int) error {
	// 去掉分隔符
	mac = strings.ReplaceAll(mac, ":", "")
	mac = strings.ReplaceAll(mac, "-", "")
	if len(mac) != 12 {
		return fmt.Errorf("MAC 地址格式错误: %s", mac)
	}

	// 转换为二进制
	macBytes, err := hex.DecodeString(mac)
	if err != nil {
		return fmt.Errorf("MAC 地址解码失败: %v", err)
	}

	// 构造魔术包
	var packet []byte
	packet = append(packet, []byte{0xff, 0xff, 0xff, 0xff, 0xff, 0xff}...)
	for i := 0; i < 16; i++ {
		packet = append(packet, macBytes...)
	}

	// 发送 UDP 包
	addr := fmt.Sprintf("%s:%d", ip, port)
	conn, err := net.Dial("udp", addr)
	if err != nil {
		return fmt.Errorf("UDP 连接失败: %v", err)
	}
	defer conn.Close()

	_, err = conn.Write(packet)
	if err != nil {
		return fmt.Errorf("发送失败: %v", err)
	}

	return nil
}

func main() {
	r := gin.Default()

	r.GET("/wake/", func(c *gin.Context) {
		mac := "FF-FF-FF-FF-FF-FF"
		ip := "255.255.255.255"
		port := 9

		err := sendWOL(mac, ip, port)
		if err != nil {
			log.Printf("Wake-on-LAN 失败: %v", err)
			c.String(500, "Wake-on-LAN 失败: %v", err)
			return
		}

		c.String(200, "Wake-on-LAN packet sent")
	})

	r.Run("0.0.0.0:4514")
}
```