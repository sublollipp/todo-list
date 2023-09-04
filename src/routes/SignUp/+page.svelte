<script>
    import { emailSignUp } from "../firebase";
    import { browser } from "$app/environment";

    let username = "";
    let mail = "";
    let password = "";

    if (browser) {
        if (localStorage.getItem("tempmail") != null) {
            mail = localStorage.getItem("tempmail");
            localStorage.removeItem("tempmail")
        }
        if (localStorage.getItem("temppass") != null) {
            password = localStorage.getItem("temppass");
            localStorage.removeItem("temppass")
        }
    }
</script>

<style>
    div {
        width: 500px;
        display: flex;
        flex-direction: column;
        background-color: rgb(74, 51, 206);
        padding: 20px 0px 0px 0px
    }

    input {
        margin: 5px 20px;
        padding: 15px 0px;
    }

    button {
        margin: 15px 0px 0px 0px;
        padding: 15px 0px;
        cursor: pointer;
    }
</style>

<div>
    <input name="username" type="username" placeholder="Brugernavn" bind:value={username}/>
    <input name="email" type="email" placeholder="E-mail" bind:value={mail}/>
    <input name="password" type="password" placeholder="Adgangskode" bind:value={password}/>
    <button on:click={emailSignUp(mail, password, username)}>Lav Bruger</button>
</div>