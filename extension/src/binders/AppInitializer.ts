import { mount, unmount } from "svelte"

import { ContentScriptContext, createShadowRootUi } from "wxt/client"

import AssistButton from "@/components/AssistButton.svelte"

import css from './style.css?inline'

function mountSvelte(container: HTMLElement) {
    return mount(AssistButton, { target: container })
}

function mountStyles() {
    const style = document.createElement('style')
    style.innerHTML = css;
    style.type = 'text/css'
    document.head.append(style);
}

async function mountShadowDom(ctx: ContentScriptContext, anchor: Element) {
    mountStyles();
    return await createShadowRootUi(ctx, {
        anchor,
        name: 'ui-quill',
        position: 'inline',

        onMount: mountSvelte,
        onRemove() {
            unmount(AssistButton)
        },
    })
}

// TODO: solve multiple composes in GMAIL
export default async function AppInitializer(ctx: ContentScriptContext) {
    chrome.runtime.onMessage.addListener(function (info: chrome.tabs.TabChangeInfo) {
        console.log(info.status);
        if (info.status !== 'complete') return;

        const element = document.querySelector('table.iN');

        console.log(element);

        if (!element) return;
        
        mountShadowDom(ctx, element).then(c => c.mount())
    })
}