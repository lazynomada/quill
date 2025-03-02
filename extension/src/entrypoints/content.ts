import AppInitializer from '@/binders/AppInitializer'

import './style.css'


export default defineContentScript({
  matches: ['<all_urls>'],
  cssInjectionMode: 'ui',
  main(ctx) {
    AppInitializer(ctx)
  },
})
