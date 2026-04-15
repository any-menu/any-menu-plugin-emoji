/**
 * ## 本地版和远程版数据
 * 
 * 见: https://github.com/missive/emoji-mart?tab=readme-ov-file#-data
 * 
 * - 本地版 (选用)
 *   - 优点: Picker立即显示结果，离线可用
 *   - 缺点: 初始页面加载速度较慢 (需要加载较大文件)
 * - 远程版
 *   - 优点: 仅需要时获取，不影响你的应用包大小
 *   - 缺点: 网络延时问题，无法离线使用 (除非你配置了服务程序)
 */

import { Picker } from 'emoji-mart'
import data from '@emoji-mart/data'

export function init_panel(el: HTMLElement, send: (str: string) => void) {
  // option: https://github.com/missive/emoji-mart?tab=readme-ov-file#options--props
  const picker = new Picker({
    data,
    onEmojiSelect: (emoji: any) => {
      console.log('debug emoji', emoji)
      send(emoji.native)
    },
    locale: 'zh',   // 中文搜索（需安装 @emoji-mart/data/i18n/zh.json）
    theme: 'dark',  // light / dark / auto
  })

  el.appendChild(picker as unknown as HTMLElement) // Picker 类型是一个自定义 Web Component
}
