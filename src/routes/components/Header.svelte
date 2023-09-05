<script>
    import { items, localItems } from "../stores";
    var itemsLength = null;
    var completedItems = null;
    
    $: if (Array.isArray($items)) {
        itemsLength = localItems.length;
        completedItems = localItems.filter((e)=>e.completed).length;
    }
    
    
</script>

<style>
    .container {
        color: white;
        background-color: rgba(0, 0, 0, 0.1);
        display: flex;
        justify-content: space-between;
        font-size: 1.5em;
        font-family: sans-serif;
        padding: 15px 20px;
    }
</style>

<div class="container">
    <span>Min to-do liste</span>
    {#if itemsLength != null}
        <span>{completedItems}/{itemsLength}</span>
    {/if}
</div>