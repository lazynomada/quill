<script lang="ts">
    import Logo from "@/assets/svelte.svg"
    import Button from "./ui/button/button.svelte"

    const { id } = $props() as { id: string };

    function pressed() {
        console.log(id);
        const element = document.querySelector(`td[id="${id}"] table div[aria-label="Message Body"]`) as HTMLDivElement
        const texts = element.innerText.split("\n").filter(c => Boolean(c))

        console.log(texts);
    }
</script>

<Button
    variant="outline"
    size="icon"
    class="p-2 rounded-full"
    on:click={pressed}
>
    <img src={Logo} alt="SvelteButton" class="w-full h-full" />
</Button>
