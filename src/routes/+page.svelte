<script>
    import Header from "./components/Header.svelte";
    import List from "./components/List.svelte";
    import InputField from "./components/InputField.svelte";
    import Login from "./components/Login.svelte";
    import ProfilHeader from "./components/ProfilHeader.svelte";

    import { userIn, items, localItems, currentId } from "./stores";

    //Nogle funktioner kan ikke lide stores...
    $: localUser = $userIn;
    //elsker debugging
    console.log(localUser);
</script>

<style lang="postcss">
    .container {
        width: 500px;
        background-color: rgb(74, 51, 206);
    }
</style>
{#if localUser != null }
<div class="container">
    <ProfilHeader />
    <Header />
    <List />
    <InputField />
</div>
{:else}
    <Login />
{/if}

<!--button on:click={()=>{console.log("user " + JSON.stringify(localUser.uid) + "items " + JSON.stringify($items) + "localItems " + JSON.stringify(localItems) + " id: " + JSON.stringify($currentId))}}>tesbg</button-->