// 1 récupérer l'id du teddy dans l'url
let params = (new URL(document.location)).searchParams;
let id = params.get('id'); 
console.log(id)
getTeddies()
// displayTeddy(id)

// 2 faire la requete pour l'objet teddy correspondant a l'id
function getTeddies() {
    return new Promise(function (resolve, reject) {
        const url = "http://localhost:3000/api/teddies";
        let requete = new XMLHttpRequest(); // créer un objet 
        requete.open("get", url); // premier parametre :  get / post, deuxieme parametre : url
        requete.responseType = "json"; //Nous attendons du Json

        requete.onload = function(){ //lorsque la requete est prete 
            if (this.readyState === XMLHttpRequest.DONE && this.status >= 200 && this.status < 300) {
                console.log(this.response);
                resolve(this.response);
                //on récupère le teddy correspondant:
                const teddy = this.response.find( teddy => teddy._id == id);
                console.log(teddy)
                 //on affiche le teddy dans le HTML:
                const container = document.getElementById("global-list")
                let product = []
                let btn = document.querySelector("#ajout")

                btn.addEventListener('click', () => {
                    product.push(teddy)
                    console.log(product)
                    addToCart(id, JSON.stringify(teddy)); 
                    console.log(localStorage)    ;           
                });
                
                function addToCart(key, value) {
                    localStorage.setItem(key, value);
                };

                container.innerHTML = `<div class="col-8 mx-auto">                               
                    <div class="card ">
                    <img src="${teddy.imageUrl}" alt="" class="card-img-top">
                    <div class="card-body">
                    <h5 class="card-title">${teddy.name}</h5>
                    <p class="card-text">${teddy.description}</p>
                    <p class="card-text"> prix : ${teddy.price}€</p>                    
                    </div>
                    </div>                               
                    </div>` 
            }
            else {
                // alert("Un probleme est intervenu, merci de revenir plus tard");
                reject({
                    status: this.status,
                    statusText: this.statusText
                });
            }
        }
        requete.onerror = function () {
            reject({
                status: this.status,
                statusText: this.statusText
            });
        };
        requete.send(); //Nous envoyons notre requete 
    })
}

// async function displayTeddy(id) {
//     // await code here
//     let teddies = await getTeddies();
//     // code below here will only execute when await makeRequest() finished loading
//     if(teddies == null) {
//         alert("Teddy est null");
//     }
//     else {
//         const teddy = teddies.find(teddy => teddy.id === id);
//         console.log(teddy);
//         //on affiche le teddy dans le HTML:
//         const container = document.getElementById("global-list")
//         container.innerHTML = `<div class="col-8 mx-auto">                               
//         <div class="card ">
//         <img src="${teddy.imageUrl}" alt="" class="card-img-top">
//         <div class="card-body">
//         <h5 class="card-title">${teddy.name}</h5>
//         <p class="card-text">${teddy.description}</p>
//         <p class="card-text"> prix : ${teddy.price}€</p>
//         <button type="button" class="btn btn-dark" data-toggle="modal" data-target="#confirm">Ajouter au panier</button>
//         </div>
//         </div>                               
//         </div>` 


        // quand je clique sur les bouton j'ajoute au localstorage JSON.stringify(teddy)) :
        
        let store = document.querySelector("#local")
        store.addEventListener('click', () => {

        location.href = "panier.html";
        })
        let acceuil = document.querySelector("#acceuil")
        acceuil.addEventListener('click', () => {
        location.href = "index.html";
        })

// }
    




            // TODO: attention AddToCart est appelé lorsqu'on clique sur le bouton 
            
            
    
    

    

    

    


 

// afficher le teddy sur la page 