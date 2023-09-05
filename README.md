# Duirky's Todo-liste - DA
[Denne todo-liste](https://todo-list-smoky-psi.vercel.app/) er lavet af mig, Duirky, fordi jeg gerne vil lære om Svelte. Todo-listen er primært lavet i Svelte, men en del Javascript indgår i Firebase-kommunikationen

## Login-metoder
Jeg bruger firebase auth til login. Man kan logge ind med email og password, Gmail eller Github

## Features
Man kan oprette og slette noter og markere dem som fuldendte. Det hele gemmes for din bruger i firebase firestore

## Behind the scenes
Todos opbevares som objekter i en liste. Denne liste er en Svelte store. De slettes vha. deres ID, som genereres meget simpelt. Hver gang man laver en note, får det et id, og currentId variablen øges med 1, så id'et viser, hvor mange noter, man har lavet. For et kæde det sammen med firebase, bliver det sat sammen i et enkelt objekt, som bliver opdateret, hver gang items stores bliver opdateres. Objektet indeholder id, som er en int, og items, som er en liste af objekter. Databasen bliver loadet ned i storen, når man logger ind, enten manuelt eller ved autologin. Autologin styres af firebases egen ting

# Duirky's Todo-list - EN
[This todo-list](https://todo-list-smoky-psi.vercel.app/) is made by me, Duirky, because i wanted to learn about Svelte. The todo-list is primarily made in Svelte, but quite a bit of Javascript is involved in communicating with Firebase.

## Login-methods
I use firebase auth for login. You can log in with email and password, Gmail, or Github.

## Features
You can create and delete notes and mark them as completed. It's all saved for your user in firebase firestore.

## Behind the scenes
Todos are stored as objects in a list. This list is a Svelte store. They're deleted by refering to their ID, which is generated in a quite simple way. Every time you make a note, that note is assigned an ID, and the currentId variable is increased by one. As such, the of a todo shows how many notes you have created before that one. To hook it up to firebase, it's put together to a single object containing the currentID (an integer) and the todos (a list of objects). The database is updated via a subscribe method of the items list. The database is loaded into the store upon login, whether it be automatic or manual. Automatic login is controlled by firebase.
