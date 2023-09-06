<script>
    import { GoogleSignIn, GithubSignIn, emailSignInAttempt } from "../firebase";
    import { goto } from "$app/navigation"

    var mail = "";
    var password = "";
    let mailcomplaint = false;
    let passcomplaint = false;



</script>

<style lang="postcss">
    button {
        display: inline-block;
        padding: 10px 15px;
        background-color: rgb(74, 51, 206);
        color: white;
        font-family: sans-serif;
        box-shadow: none;
        border-color: rgb(74, 51, 206);
        border-radius: 3px;
        border-style: solid;
        font-size: 21px;
        cursor: pointer;
        margin: 10px 0px;
    }

    button:hover {
        background-color: white;
        color: black;
        transition-duration: 0.4s;
    }

    .container {
        display: flex;
        flex-direction: column;
        width: 500px;
    }

    input {
        padding: 15px 0px;
        margin: 5px 0px;
    }

    .hori {
        display: flex;
        justify-content: space-between;
    }
</style>

<div class="container">
    {#if mailcomplaint}
        <p style="color: red;">Du skal bruge en e-mail for at logge ind...</p>
    {/if}
    {#if passcomplaint}
        <p style="color: red;">Du skal bruge en adgangskode for at logge ind...</p>
    {/if}
    <input type="username" name="username" placeholder="E-mail" bind:value={mail}/>
    <input type="password" name="password" placeholder="Adgangskode" bind:value={password}/>
    <div class="hori">
        <button on:click={emailSignInAttempt(mail, password)} style="width: 47%;">Log ind</button>
        <button on:click={()=>{
            localStorage.setItem("tempmail", mail);
            localStorage.setItem("temppass", password);
            goto("/SignUp");
            }} style="width: 47%;">Lav en ny bruger</button>
    </div>
</div>

<button on:click={GoogleSignIn} style="width: 500px;">Log ind med Google</button>
<br />
<button on:click={GithubSignIn} style="width: 500px;">Log ind med Github</button>