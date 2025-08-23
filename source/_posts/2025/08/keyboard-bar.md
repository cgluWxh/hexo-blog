---
title: 获取键盘的高度使得工具条吸附键盘于不同浏览器的方法
date: 2025-08-14 16:00:00
tags: 前端
---

#### 对于苹果 `Safari`

检测 `viewsualViewport` 的 `resize` 事件, 用两个 `viewsualViewport.height` 作差得键盘高度.

#### 对于新版本 `Chrome`

使用 `virtualKeyboardApi`.

```ts
if((window.navigator as any).virtualKeyboard) {
    const virtualKeyboardApi = (window.navigator as any).virtualKeyboard;
    virtualKeyboardApi.overlaysContent = true;
    virtualKeyboardApi.addEventListener('geometrychange', (e: any) => {
        const ctx = $.mobileEditBar.getContext();
        const ref = ctx.ref as unknown as HTMLElement;
        const height = virtualKeyboardApi.boundingRect.height ?? 0;
        ref.style.display = height > 0 ? 'block' : 'none';
    });
}
```