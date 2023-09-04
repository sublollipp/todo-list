import { writable } from "svelte/store";

//Alle items i listen skal have et id, der skal kunne sættes fra mange forskellige steder.
export let currentId = writable(0);

//Brugeren skal opbevares lokalt (IKKE I LOCALSTORAGE ELLER SESSIONSTORAGE ELLER COOKIES) så koden kan dimse med det.
export var userIn = writable(null);

//Det samme som øverst men med listen over todos
export var items = writable([]);

//Jeg er bange for at fjerne denne her linje kode, men jeg *tror* ikke, at den bliver brugt nogen steder
export const itemsExample = writable(null);

//Nogle funktioner kan bare ikke stores, så denne export variabel har altid samme værdi som items, bare uden at være en store.
export var localItems = [];

//Jeg ændrer bogstavet en gang imellem for sjov :D
items.subscribe((k)=>{localItems=k});



