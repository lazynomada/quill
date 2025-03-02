import ButtonBinder from '@/binders/ButtonBinder'

import './style.css'

export default defineContentScript({
  matches: ['<all_urls>'],
  cssInjectionMode: 'ui',
  main(ctx) {
    new ButtonBinder(ctx).mount();
  },
})
