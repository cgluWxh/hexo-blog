---
title: Safari 桌面端和移动端的一些问题
date: 2025-08-14 11:00:00
tags: 前端
---

#### 判断 `isComposing`

在移动端, 使用 `event.isComposing` 来判断是可行的. 但如果在 mac 上, 如果绑定了按 `Enter` 提交 / 换行的事件或按 `Backspace` 来删除整个节点, 则读取到的 `event.isComposing` 始终为 `false`. 在这种情况下, 使用 `event.keyCode` 来判断是否为 `Composing` 状态. 正常的 `Enter` / `Backspace` 的 `keyCode` 为其原始值, `Composing` 时 `keyCode` 为 `229`.

```js
const evt = (event as React.KeyboardEvent).nativeEvent;
if (evt.isComposing || evt.keyCode === 229) {
    // 适用于 Chrome 和 Safari 的 isComposing 检测
    return ALLOW_DEFAULT;
}
```

#### `SVG` 图像的显示

需显式指定 `width` 和 `height`, 否则元素大小为 `0`, 不显示.

#### Safari 的 bug: 删除 Composing 文字时若当前节点为空会删除当前节点

```ts
const onDOMBeforeInput = (browser.isAppleMobile || browser.isMacSafari) ? (event: InputEvent) => {
    if (event.inputType !== 'deleteCompositionText') {
        return;
    }

    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    const { startContainer, endContainer, endOffset, startOffset } = range;

    /**
     * Safari 删除 Composition Text 时会删除一个空节点导致 Slate 无法正常识别
     * 我们在 Safari 删除 Composition Text 前在节点内插入一个 0 宽空格, 骗过 Safari 使它不删除
     */
    if (
        startContainer &&
        isTextNode(startContainer) &&
        startContainer === endContainer &&
        startOffset === 0 &&
        endOffset === (startContainer as Text).length 
    ) {
        startContainer.parentElement!.insertBefore(document.createTextNode(ZERO_WIDTH_SPACE), startContainer);
    }
    } : undefined

const onInput = (browser.isAppleMobile || browser.isMacSafari) ? (event: React.FormEvent<InputEvent>) => {
    if ((event.nativeEvent as InputEvent).inputType !== 'deleteCompositionText') {
        return;
    }

    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    const node = range.startContainer;
    if (!node || !node.parentElement) return;

    const textNodes = Array.from(node.parentElement.childNodes).filter(isTextNode);

    for (const textNode of textNodes) {
        if (textNode.textContent === ZERO_WIDTH_SPACE) {
        textNode.remove();
        } else if (textNode.textContent && textNode.textContent.includes(ZERO_WIDTH_SPACE)) {
        textNode.textContent = textNode.textContent.replace(new RegExp(ZERO_WIDTH_SPACE, 'g'), '');
        }
    }
    } : undefined
```