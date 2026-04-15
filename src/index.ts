import cssText from './style.css?inline';

import type { PluginInterface, PluginInterfaceCtx } from 'any-menu';

let cache_ctx: PluginInterfaceCtx | undefined

export default class EmojiPlugin implements PluginInterface {
  metadata = {
    id: 'any-menu-emoji',
    name: 'Example Plugin Simple',
    version: '1.0.0',
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
      const newPanel = document.createElement('div'); newPanel.innerText = 'New Panel Content';
      ctx.api.registerSubPanel({
          id: 'any-menu-emoji-panel',
          el: newPanel
      })
    }

    // 文本输出示例
    const selected = ctx.env.selectedText;
    if (selected && selected.trim() !== '') {
      // 如果有选中文本，在其后追加问候
      ctx.api.sendText(`${selected} — AnyMenu emoji plugin!`);
    } else {
      // 否则直接输出
      // ctx.api.sendText('AnyMenu emoji plugin!');

      // 否则显示面板
      ctx.api.hidePanel(['menu'])
      ctx.api.showPanel(['any-menu-emoji-panel'])
    }
  }
}
