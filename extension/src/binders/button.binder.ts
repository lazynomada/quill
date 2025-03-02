import { ContentScriptContext } from "wxt/client"

import wait from "@/lib/wait"
import ConnectSvelte from "@/lib/ConnectSvelte"
import TabListener from "@/lib/TabListener"

import css from './style.css?inline'

export default class ButtonBinder {
    private connected = false
    private connector: ConnectSvelte

    constructor(protected ctx: ContentScriptContext) {
        this.connector = new ConnectSvelte(css)
    }

    async handler() {
        await wait(200)
        const elements = document.querySelectorAll('table.iN:not(:has(>ui-quill))')
        elements.forEach(element => this.connector.mount(this.ctx, element).then(c => c.mount()))
    }

    async composeButtonListener() {
        if (this.connected === true) return undefined
        const composeButton = document.querySelector('div[jscontroller="eIu7Db"]');
        composeButton?.addEventListener('click', this.handler)
    }

    mountDefaultCases() {
        const elements = document.querySelectorAll('table.iN')
        elements.forEach(element => this.connector.mount(this.ctx, element).then(c => c.mount()))
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