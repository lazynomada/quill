
import { Component, mount, unmount } from "svelte"
import type { ContentScriptContext } from "wxt/client"

export default class ConnectSvelte {
    constructor(
        protected component: Component<any, any, any>,
        protected css: string,
        protected props: Record<string, any>
    ) { }

    async mount(ctx: ContentScriptContext, anchor: Element) {
        this.loadStyles();
        return await createShadowRootUi(ctx, {
            anchor,
            name: 'ui-quill',
            position: 'inline',
            onMount: (container) => this.render(container),
            onRemove: () => unmount(this.component),
        })
    }

    loadStyles() {
        const style = document.createElement('style')
        style.innerHTML = this.css;
        style.type = 'text/css'
        document.head.append(style);
    }

    render(container: Element) {
        return mount(this.component, { target: container, props: this.props })
    }
}