<script>
    import Item from "./Item.svelte";
    import { items, localItems } from "../stores";

    console.log(JSON.stringify($items));
</script>

<div>
    <!-- Den kunne ikke lide, at jeg parsede null, undefined eller {} ind i en each funktion :( -->
    {#if $items}
        {#each $items as e}
            <Item bind:Item={e} />
        {/each}
    {/if}
</div>

<!--CSS (PT ikke tailwind, ad)-->
<style lang="postcss">
    div {
        height: 500px;
    }
</style>
