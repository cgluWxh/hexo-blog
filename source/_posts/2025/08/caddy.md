---
title: Caddyfile 小记
date: 2025-08-24 03:58:00
tags: 服务器
---

#### 为什么使用 `Caddy`

不需要什么配置, 使你完全忘掉 SSL 证书的事.

#### 当前配置

```conf
{
	email $$YOUR_EMAIL$$
	acme_ca https://acme.zerossl.com/v2/DV90
	servers {
		protocols h1 h2 # 来禁用 UDP 443 端口, 只使用 TCP 443
	}
}
*.bilibiili.com, bilibiili.com {
	tls {
		dns cloudflare $$YOUR_API_KEY$$ # dns-01 验证后可签野卡
	}
}
prefix1.bilibiili.com {
	reverse_proxy localhost:4533
}
prefix2.bilibiili.com {
    handle_path /socket.io/* {
        reverse_proxy localhost:4534 {
            header_up Connection {>Connection}
            header_up Upgrade {>Upgrade}

            # 可选但推荐：设置较长的超时时间，因为 WebSocket 是长连接
            transport http {
                read_timeout 300s
                write_timeout 300s
            }
        }
    }
	reverse_proxy localhost:4534
}
```

#### 如何添加 `dns-01` 验证能力

去 [CaddyServer](https://caddyserver.com/download) 下载带有 caddy-dns/cloudflare 插件的自定义包即可. 

#### 生成的证书在何位置

若习惯不好使用了 `root` 用户运行, 在 `/root/.local/share/caddy/certificates/acme.zerossl.com-v2-dv90/`.

正常情况下在 `/var/lib/caddy/.local/share/caddy/certificates/acme.zerossl.com-v2-dv90/`.