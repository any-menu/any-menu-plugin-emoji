import cssText from './style.css?inline';

import type { PluginInterface, PluginInterfaceCtx } from 'any-menu';
import { init_panel } from './panel'

let cache_ctx: PluginInterfaceCtx | undefined

export default class EmojiPlugin implements PluginInterface {
  metadata = {
    id: 'any-menu-emoji',
    name: 'Example Plugin Simple',
    version: '1.0.2',
    min_app_version: '1.1.0',
    author: 'LincZero',
    description: 'An AnyMenu plugin about pick emoji.',
    icon: 'lucide-smile',
    css: cssText,
  };

  onLoad(): void {
    console.log('[EmojiPlugin] Plugin loaded');
  }

  onUnload(): void {
    if (cache_ctx) cache_ctx.api.unregisterSubPanel('any-menu-emoji-panel')
    console.log('[EmojiPlugin] Plugin unloaded');
  }

  async run(ctx: PluginInterfaceCtx): Promise<void> {
    // 注册面板示例
    if (!cache_ctx) {
      cache_ctx = ctx
      const newPanel = document.createElement('div'); newPanel.dataset.id = 'any-menu-emoji-panel'; newPanel.classList.add('any-menu-emoji-panel')
      ctx.api.registerSubPanel({
          id: 'any-menu-emoji-panel',
          el: newPanel
      })

      init_panel(newPanel, ctx.api.sendText)
    }

    ctx.api.hidePanel()
    ctx.api.showPanel(['any-menu-emoji-panel'])

    const input: HTMLInputElement|null = document.querySelector('.am-custom-panel .any-menu-emoji-panel .search>input')
    if (input) {
      input.focus()
    }
  }
}
