import { mount } from "svelte"
import { ContentScriptContext, createShadowRootUi } from "wxt/client"

import Counter from "@/components/Counter.svelte"

import './style.css'

async function mountSvelte(container: HTMLElement) {
  mount(Counter, { target: container })
}

async function mountUI(ctx: ContentScriptContext) {
  const element = document.querySelectorAll('center')
  const anchor = element[element.length - 1]  
  
  return await createShadowRootUi(ctx, {
    anchor,
    name: 'ui-quill',
    position: 'inline',
    css: 'display: inline-block',
    onMount: mountSvelte
  })
}

export default defineContentScript({
  matches: ['<all_urls>'],
  cssInjectionMode: 'ui',
  main(ctx) {

    mountUI(ctx).then(c => c.mount())
    console.log('Hello content.')
  },
})
