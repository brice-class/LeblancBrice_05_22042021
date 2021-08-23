const container = document.getElementById("global-list")
const url = "http://localhost:3000/api/";
let produit = "teddies";

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


loadtData(); 
function loadtData(){
    let requete = new XMLHttpRequest(); // créer un objet 
    requete.open("get", url + produit); // premier parametre :  get / post, deuxieme parametre : url
    requete.responseType = "json"; //Nous attendons du Json
    requete.send(); //Nous envoyons notre requete 
    requete.onload = function(){ //lorsque la requete est prete 
        if (requete.readyState === XMLHttpRequest.DONE){
            if (requete.status === 200) {
                let reponse = requete.response; //on stock la réponse.  
                let articles = reponse;
                console.log(articles) ;
                sessionStorage.setItem('article', produit)
                container.innerHTML="";
                articles.forEach(article => {
                    const card = `<div class="col-8 col-lg-4  shadow-lg p-3 mb-5 bg-body rounded">
                                    <a href="/produit.html?id=${article._id}">
                                        <div class="card">
                                            <img src="${article.imageUrl}" alt="" class="card-img" style="height: 277px;>
                                            <div class="card-body">
                                                <h5 class="card-title">${article.name}</h5>
                                                <p class="card-text">${article.description}</p>
                                                <p class="card-text"> ${article.price} €</p>
                                            </div>
                                        </div>
                                    </a>
                                </div>` 
                    container.innerHTML += card; 
                });                                      
            }
            else {
                alert("Un probleme est intervenu, merci de revenir plus tard");
            }
        }
    }
}


function modifierCategorie(){ //permet a l'utilisateur de choisir le type d'article
    var select_article = document.getElementById("article");
    console.log(select_article.value);
    produit = select_article.value; 
    loadtData();
}





 