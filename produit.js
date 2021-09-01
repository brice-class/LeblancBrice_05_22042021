//0 je déclare mes variables
let nbArticle;
let articles = sessionStorage.getItem('article');
console.log(articles);

// 1 récupération l'id de l'article dans l'url
let params = (new URL(document.location)).searchParams;
let id = params.get('id'); 
console.log(id)

//création d'une fonction permettant de rendre dynamique le caddie
function ajoutCaddie(){
    let nbPanier = 0;
    for(let i = 0; i < localStorage.length; i++){
        nbPanier += 1 
        console.log(nbPanier)
    }
    let caddie = document.querySelector("#caddie")
    caddie.textContent = nbPanier
}
ajoutCaddie()

// 2 création de la requête pour l'article correspondant à l'id
getArticle()
async function getArticle() {
    return new Promise(function (resolve, reject) {
        const url = "http://localhost:3000/api/";
        let requete = new XMLHttpRequest(); // créer un objet 
        requete.open("get", url + articles); // premier paramètre :  get / post, deuxieme paramètre : url
        requete.responseType = "json"; //Nous attendons du Json

        requete.onload = function(){ //lorsque la requête est prête 
            if (this.readyState === XMLHttpRequest.DONE && this.status >= 200 && this.status < 300) {
                console.log(this.response);
                resolve(this.response);
                //récupération l'article correspondant:
                const article = this.response.find( articles => articles._id == id);
                console.log(article)                
                const container = document.getElementById("global-list")
                let btn = document.querySelector("#local")
                let acceuil = document.querySelector("#continue")
                let cancel = document.querySelector("#cancel")
                typeof(article)                                    
                let name = "quantité"
                article[name] = 1             
                console.log(typeof(articles));

                //on affiche le teddy dans le HTML: 
                container.innerHTML =
                 `<div class="col-8 mx-auto">                               
                    <div class="card shadow-lg p-3 mb-5 bg-body rounded">
                    <img src="${article.imageUrl}" alt="" class="card-img-top">
                    <div class="card-body">
                    <h5 class="card-title">${article.name}</h5>
                    <p class="card-text">${article.description}</p>
                    <p  id="prixTotal" value = ${article.price} class="card-text"> prix : ${article.price/100}€</p> 
                    <select name="colors" id="colors">
                    </select>
                    <select name="quantité" id="quantité"  class="form-select" aria-label="Default select example" >
                        <option selected>Quantité</option>
                        <option value=1>1</option>
                        <option value=2>2</option>
                        <option value=3>3</option>
                    </select>
                    <button type="button" id="ajout" class="btn btn-dark" data-toggle="modal" data-target="#confirm">Ajouter au panier</button>                   
                    </div>
                    </div>                               
                    </div>`                    
                    let inputNum = document.querySelector("#quantité")
                    
                function selectQuantity(){    
                    article[name] = 1                    
                    var number = inputNum.value
                    console.log(number)
                    quantity = number
                    article[name] = number
                    console.log(article)                                             
                }
                inputNum.addEventListener('input' ,(e) => {
                    selectQuantity()
                })
               
                //permet a l'utilisateur de faire une sélection parmis les options disponibles
                function teinteArticle(articles){
                    if(articles === "teddies"){
                        let color = document.getElementById('colors');
                        for (let i = 0; i < article.colors.length; i++){
                        let choixColor = document.createElement('option');
                        choixColor.innerText = article.colors[i];
                        color.appendChild(choixColor);
                        }
                    } else if(articles === "furniture") {
                        let color = document.getElementById('colors');
                        for (let i = 0; i < article.varnish.length; i++){
                        let choixColor = document.createElement('option');
                        choixColor.innerText = article.varnish[i];
                        color.appendChild(choixColor);
                        }
                    } else if(articles === "cameras") {
                        let color = document.getElementById('colors');
                        for (let i = 0; i < article.lenses.length; i++){
                        let choixColor = document.createElement('option');
                        choixColor.innerText = article.lenses[i];
                        color.appendChild(choixColor);
                        }
                    }
                }
                teinteArticle(articles);
                console.log(article)
                btn.addEventListener('click', () => {                        
                    addToCart(id, JSON.stringify(article));                        
                    console.log(localStorage);      
                    location.href = "panier.html";     
                });
                
                    acceuil.addEventListener('click', () => {
                    addToCart(id, JSON.stringify(article));                         
                    location.href = "index.html";
                    })
                    
                    cancel.addEventListener('click', () => {   
                    location.href = "index.html";
                    })
                
                function addToCart(key, value) {
                    localStorage.setItem(key, value);
                };                     
            }
            else {
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
        requete.send(); //Nous envoyons notre requête 
    })
}

        


    




            
            
            
    
    

    