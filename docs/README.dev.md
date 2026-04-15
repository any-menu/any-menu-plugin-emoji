# 一些开发者笔记/杂记

(用户不用看)

## 记录项目 emoji-mart 使用方式

参考: https://github.com/missive/emoji-mart
参考: ../src/panel.ts

## Emoji 前端库调研

### 背景

调研: emoji字典/前端库

目前需求：我要往一个 div 里填入一个 emoji 显示/分类/搜索面板，选择 emoji 后直接调用我给定的 send 函数输出到光标位置

### 🏆 推荐库一览

| 库名 | 类型 | 框架 | 特点 |
|------|------|------|------|
| emoji-mart | 完整面板组件 | 框架无关 | 最流行，功能最全 |
| emoji-picker-element | Web Component | 框架无关 | 轻量，原生支持 |
| vue3-emoji-picker | 组件 | Vue 3 | 专为 Vue3 |
| @emoji-mart/react | 组件 | React | emoji-mart 的 React 封装 |
| unicode-emoji-json | 数据字典 | 无关 | 只提供数据，不含 UI |
| emojibase | 数据字典 | 无关 | 完整 emoji 数据库 |

### ⭐ 最推荐：emoji-mart

> GitHub: [missive/emoji-mart](https://github.com/missive/emoji-mart)  
> 支持：原生 JS、React、Vue、Svelte  
> 功能：分类、搜索、肤色、最近使用、自定义 emoji

**安装：**

```bash
npm install emoji-mart
```

**框架无关用法（直接挂载到 div）：**

```javascript name=emoji-picker.js
import data from '@emoji-mart/data'
import { Picker } from 'emoji-mart'

// 假设你的 send 函数
function send(emoji) {
  // 插入到光标位置（见下方工具函数）
  insertAtCursor(emoji.native)
}

// 挂载 emoji-mart 到指定 div
const picker = new Picker({
  data,
  onEmojiSelect: (emoji) => send(emoji),
  locale: 'zh',      // 中文搜索（需安装 @emoji-mart/data/i18n/zh.json）
  theme: 'light',    // light / dark / auto
})

document.getElementById('emoji-container').appendChild(picker)
```

**插入到光标位置的工具函数：**

```javascript name=insert-at-cursor.js
function insertAtCursor(text) {
  const el = document.activeElement // 当前聚焦的 input/textarea/contenteditable
  
  if (el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA')) {
    // 普通 input / textarea
    const start = el.selectionStart
    const end = el.selectionEnd
    el.value = el.value.slice(0, start) + text + el.value.slice(end)
    el.selectionStart = el.selectionEnd = start + text.length
    el.dispatchEvent(new Event('input', { bubbles: true }))
    
  } else if (el && el.isContentEditable) {
    // contenteditable div（如富文本编辑器）
    const sel = window.getSelection()
    if (sel.rangeCount > 0) {
      const range = sel.getRangeAt(0)
      range.deleteContents()
      range.insertNode(document.createTextNode(text))
      range.collapse(false)
    }
  }
}
```

### 方案二：轻量 Web Component（emoji-picker-element）

如果你不想引入大依赖：

```bash
npm install emoji-picker-element
```

```html name=emoji-picker.html
<script type="module">
  import 'emoji-picker-element'
  
  const picker = document.querySelector('emoji-picker')
  picker.addEventListener('emoji-click', event => {
    send(event.detail.unicode)  // 直接拿到 emoji 字符
  })
</script>

<div id="emoji-container">
  <emoji-picker></emoji-picker>
</div>
```

### 方案三：纯数据字典（自建 UI）

如果你想完全自定义 UI：

```bash
npm install unicode-emoji-json
# 或
npm install emojibase emojibase-data
```

```javascript name=emoji-data.js
// unicode-emoji-json 提供分类+搜索所需的原始数据
import data from 'unicode-emoji-json/data-by-group.json'

// data 结构:
// { "Smileys & Emotion": [ { emoji: "😀", name: "grinning face", ... }, ...], ... }
```

### 📋 选型建议

- 想快速集成 + 功能全：用 `emoji-mart`（支持中文搜索、分类、肤色）
- 想轻量 + 原生 Web Component：用 `emoji-picker-element`（~50KB gzip）
- 用 Vue3：用 `vue3-emoji-picker` 或 `emoji-mart` + Vue wrapper
- 完全自定义 UI：用 `unicode-emoji-json` 只取数据

最常见的聊天应用场景（你描述的需求）用 **emoji-mart** 是最合适的，它内置搜索、分类、最近使用，`onEmojiSelect` 回调直接拿到 emoji 字符，配合上面的 `insertAtCursor` 即可实现完整功能。
