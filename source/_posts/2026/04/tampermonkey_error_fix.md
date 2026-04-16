---
title: 持续记一些如何用 Tampermonkey 脚本修复特定页面崩溃的思路
date: 2026-04-16 21:40:00
tags: Dev
---

# 拦截 parentNode 为 null 时的 removeChild 崩溃

核心思路：重写 `Node.prototype.parentNode` 的 getter. 当检测到特定调用栈且父节点为 `null` 时, 返回一个带有空方法（no-op）的假对象, 从而避免 `null.removeChild()` 报错. 

```javascript
const originalDesc = Object.getOwnPropertyDescriptor(Node.prototype, 'parentNode');

const fakeNode = {
    removeChild: () => null,
    appendChild: () => null
};

Object.defineProperty(Node.prototype, 'parentNode', {
    get() {
        const parent = originalDesc.get.call(this);
        
        // 关键检测：父节点为空 且 调用栈包含目标函数
        if (parent === null) {
            const stack = new Error().stack || '';
            if (stack.includes('_removeScrollBars') || stack.includes('Reaction')) {
                return fakeNode;
            }
        }
        
        return parent;
    },
    configurable: true // 允许后续恢复或再次修改
});
```

**要点：**
1. **覆盖**：使用 `Object.defineProperty` 重写 getter, 保留原始 getter 引用以便正常情况透传. 
2. **检测**：在 getter 内部实例化 `new Error()` 获取当前调用栈（`stack`）, 通过字符串匹配定位触发删除操作的特定函数名. 通过此方法可实现让代码以 `str` 的形式知道自己的调用栈, 进而进行针对性 patch, 不影响其他正常页面. 