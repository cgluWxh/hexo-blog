---
title: 写一个 Bash 脚本不完整下载 ZIP 文件并查看其内部结构
date: 2025-09-11 11:00:00
tags: Dev
---

偶然看见文章 [https://www.akams.cn/posts/zip-list](https://www.akams.cn/posts/zip-list) 提到可以通过下载 ZIP 文件的最后一部分来查看其内部结构。写了个 Bash 脚本实现这个功能。

```sh
#!/bin/bash

set -euo pipefail

LINK="$1"
TMPFILE=$(mktemp /tmp/zippeek.XXXXXX.zip)

# 获取文件总长度
LEN=$(curl -sI "$LINK" | awk -F': ' '/Content-Length/ {print $2}' | tr -d '\r')

if [ -z "$LEN" ]; then
    echo "无法获取 Content-Length"
    exit 1
fi

echo "文件总大小: $LEN 字节"

# 下载最后 1MB (如果文件比1MB小，就全下)
START=$(( LEN > 1048576 ? LEN - 1048576 : 0 ))
curl -s --range "$START"-"$LEN" -o "$TMPFILE" "$LINK"

# 用 zipinfo -s 查看结构
echo "ZIP 文件信息:"
zipinfo -s "$TMPFILE"

rm -f "$TMPFILE"
```