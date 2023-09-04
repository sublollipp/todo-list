<script>
    import { items, currentId } from "../stores";
    let inputName = "";

    function addItem(t) {
        console.log("Input " + JSON.stringify($items));
        items.update((b)=>[...b, {text: t, completed: false, id: $currentId}]);
        currentId.update((b)=>b+1);
        inputName = "";
    }
</script>

<style>
    div {
        display: flex;
        justify-content: space-between;
        background-color: rgba(255, 255, 255, 0.2);
        padding: 10px 20px;
    }

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
        font-size: 17px;
        cursor: pointer;
    }

    button:hover {
        background-color: white;
        color: black;
        transition-duration: 0.4s;
    }
</style>

<div>
    <input 
        type="text" 
        bind:value={inputName} 
        placeholder="To-Do titel" 
        on:keypress={k=>{if (k.key=='Enter') {addItem(inputName)}}}>
    <button on:click={()=>{addItem(inputName);}}>Tilføj To-Do</button>
</div>