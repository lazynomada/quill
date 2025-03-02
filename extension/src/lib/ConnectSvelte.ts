import AssistButton from "@/components/AssistButton.svelte"
import { mount, unmount } from "svelte"
import type { ContentScriptContext } from "wxt/client"

export default class ConnectSvelte {
    constructor(
        protected css: string,
    ) { }

    async mount(ctx: ContentScriptContext, anchor: Element) {
        this.loadStyles();
        return await createShadowRootUi(ctx, {
            anchor,
            name: 'ui-quill',
            position: 'inline',
    
            onMount: this.render,
            onRemove: () => {
                unmount(AssistButton)
            },
        })
    }

    loadStyles() {
        const style = document.createElement('style')
        style.innerHTML = this.css;
        style.type = 'text/css'
        document.head.append(style);
    }

    render(container: Element) {
        return mount(AssistButton, { target: container })
    }
}