import { ContentScriptContext } from "wxt/client"

import AssistButton from "@/components/AssistButton.svelte"

import wait from "@/lib/wait"
import ConnectSvelte from "@/lib/ConnectSvelte"
import TabListener from "@/lib/TabListener"

import css from './style.css?inline'

export default class ButtonBinder {
    private connected = false

    constructor(protected ctx: ContentScriptContext) { }

    connectHandler(element: Element) {
        const td = element.querySelector('td')!;
        const connector = new ConnectSvelte(AssistButton, css, { id: td.id })
        
        connector.mount(this.ctx, element).then(c => c.mount())
    }

    async handler() {
        await wait(200)
        const elements = document.querySelectorAll('table.iN:not(:has(>ui-quill))')
        elements.forEach(element => this.connectHandler(element))
    }

    async composeButtonListener() {
        if (this.connected === true) return undefined
        const composeButton = document.querySelector('div[jscontroller="eIu7Db"]');
        composeButton?.addEventListener('click', this.handler)
    }

    mountDefaultCases() {
        const elements = document.querySelectorAll('table.iN')
        elements.forEach(element => this.connectHandler(element))
    }

    mount() {
        TabListener((info) => {
            if (info.status !== 'complete') return undefined
            this.mountDefaultCases()
            this.composeButtonListener()
            this.connected = true
        })
    }
}