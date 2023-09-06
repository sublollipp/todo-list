<script>
    import { items } from "../stores";
    import { fade } from "svelte/transition";

    export let Item = {
        text: "",
        completed: false,
        id: null
    }

    //Sets the "items" store itself minus whatever item has an id matching this iteration's.
    function deleteSelf() {
        items.update(list=>list.filter(listItem=>listItem.id!=Item.id));
    }

</script>

<style lang="postcss">
    .item {
        width: 480px;
        height: 40px;
        padding-left: 10px;
        padding-right: 10px;
        display: flex;
        align-content: center;
        justify-content: space-between;
        font-family: sans-serif;
        background-color: rgba(0, 0, 0, 0);
    }
    .item:hover {
        background-color: rgba(0, 0, 0, 0.8);
        transition: background-color 0.6s;
    }

    .item:hover > .deleteButton {display:block;}

    .deleteButton {
        background-color: transparent;
        border: none;
        color: rgba(255, 255, 255, 0.6);
        position: relative;
        display: none;
        cursor: pointer;
    }

    .deleteButton:hover {
        color: rgba(255, 255, 255, 1);
        transition: color 0.4s;
    }

    .leftSide {
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    
</style>

<div class="item" in:fade>
    <div class="leftSide">
        <input type="checkbox" bind:checked={Item.completed} style="cursor: pointer;">
        <span class="text-red-500">{Item.text}</span>
    </div>
    <button class="deleteButton" on:click={deleteSelf}>🗑️</button>
</div>