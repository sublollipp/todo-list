<script>
    import { userIn } from "../stores";
    import { signOutOfGoogle } from "../firebase";
    
    $: localUser = $userIn;
</script>

<style>
    .container {
        width: 500px;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    p {
        color: white;
        font-family: sans-serif;
        margin: 0px 20px;
    }

    img {
        width: 45px;
        height: 45px;
        padding: 5px;
    }

    button {
        margin: 20px;

    }
</style>

<div class="container">
    {#if localUser.photoURL != null}
        <img src={localUser.photoURL} alt="Profile">
    {/if}
    {#if localUser.displayName != null}
        <p>{localUser.displayName}</p>
    {/if}
    <button on:click={signOutOfGoogle}>Log Ud</button>
</div>