// 1 récupération l'id du teddy dans l'url
let params = (new URL(document.location)).searchParams;
let id = params.get('id'); 
console.log(id)
let articles = sessionStorage.getItem('article');
console.log(articles);

getArticle()

// 2 faire la requete pour l'objet teddy correspondant a l'id
function getArticle() {
    return new Promise(function (resolve, reject) {
        const url = "http://localhost:3000/api/";
        let requete = new XMLHttpRequest(); // créer un objet 
        requete.open("get", url + articles); // premier parametre :  get / post, deuxieme parametre : url
        requete.responseType = "json"; //Nous attendons du Json

        requete.onload = function(){ //lorsque la requete est prete 
            if (this.readyState === XMLHttpRequest.DONE && this.status >= 200 && this.status < 300) {
                console.log(this.response);
                resolve(this.response);
                //on récupère le teddy correspondant:
                const article = this.response.find( articles => articles._id == id);
                console.log(article)
                 //on affiche le teddy dans le HTML:
                const container = document.getElementById("global-list")
                let product = []
                let btn = document.querySelector("#local")
                let acceuil = document.querySelector("#continue")
                let cancel = document.querySelector("#cancel")
                console.log(typeof(articles));

                container.innerHTML =
                 `<div class="col-8 mx-auto">                               
                    <div class="card ">
                    <img src="${article.imageUrl}" alt="" class="card-img-top">
                    <div class="card-body">
                    <h5 class="card-title">${article.name}</h5>
                    <p class="card-text">${article.description}</p>
                    <p class="card-text"> prix : ${article.price}€</p> 
                    <select name="colors" id="colors">
                    </select>
                    <button type="button" id="ajout" class="btn btn-dark" data-toggle="modal" data-target="#confirm">Ajouter au panier</button>                   
                    </div>
                    </div>                               
                    </div>` 

                    //permet a l'utilisateur de faire une selection parmis les options disponibes
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

                    btn.addEventListener('click', () => {
                        product.push(article)
                        console.log(product)
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

        


    




            
            
            
    
    

    