<script lang="ts">
    import Logo from "@/assets/svelte.svg"
    import Button from "./ui/button/button.svelte"

    function pressed() {
       const element = document.querySelector('table.iN table div[aria-label="Message Body"]') as HTMLDivElement
        if (!element) return;

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
