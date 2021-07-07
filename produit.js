// 1 récupérer l'id du teddy dans l'url
let params = (new URL(document.location)).searchParams;
let id = params.get('id'); 

// 2 faire la requete pour l'objet teddy correspondant a l'id
function getTeddies() {
    const url = "http://localhost:3000/api/teddies";
    let requete = new XMLHttpRequest(); // créer un objet 
    requete.open("get", url); // premier parametre :  get / post, deuxieme parametre : url
    requete.responseType = "json"; //Nous attendons du Json
    requete.send(); //Nous envoyons notre requete 

 requete.onload = function(){ //lorsque la requete est prete 
     if (requete.readyState === XMLHttpRequest.DONE){
         if (requete.status === 200) 
         console.log(requete.response);
             return requete.response;
            }
            else {
                alert("Un probleme est intervenu, merci de revenir plus tard");
                return [];
            }     
}}
    
             let teddies = getTeddies().then; //on stock la réponse.
             console.log(teddies);         
             //on récupère le teddy correspondant:
             const teddy = teddies.find( teddy => teddy._id == id);
            
             //on affiche le teddy dans le HTML:
             const container = document.getElementById("global-list")
             container.innerHTML = `<div class="col-8 mx-auto">                               
                                          <div class="card ">
                                              <img src="${teddy.imageUrl}" alt="" class="card-img-top">
                                              <div class="card-body">
                                                  <h5 class="card-title">${teddy.name}</h5>
                                                  <p class="card-text">${teddy.description}</p>
                                                  <p class="card-text"> prix : ${teddy.price}€</p>
                                                  <button type="button" class="btn btn-dark" data-toggle="modal" data-target="#confirm">Ajouter au panier</button>
                                              </div>
                                          </div>                               
                                      </div>` 
            // quand je clique sur le bouton j'ajoute au localstorage JSON.stringify(teddy)) :
            let product = []
            let btn = document.querySelector("#confirm")
            btn.addEventListener('click', () => {
                product.push(teddy)
                addToCart("product", JSON.stringify(product));                
            })

            let store = document.querySelector("#local")
            store.addEventListener('click', () => {
                location.href = "panier.html";
            })
            let acceuil = document.querySelector("#acceuil")
            acceuil.addEventListener('click', () => {
                location.href = "index.html";
            })


            // TODO: attention AddToCart est appelé lorsqu'on clique sur le bouton 
            
            
    
    function addToCart(key, value) {
        localStorage.setItem(key, value);
    };
    

    


 

// afficher le teddy sur la page 