const container = document.getElementById("global-list")
const url = "http://localhost:3000/api/";
let produit = "teddies";

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

//fonction permettant de récupérer tous les articles d'une même catégorie et de les afficher dans le html
loadtData(); 
function loadtData(){
    let requete = new XMLHttpRequest(); // créer un objet 
    requete.open("get", url + produit); // premier paramètre :  get / post, deuxieme paramètre : url
    requete.responseType = "json"; //Nous attendons du Json
    requete.send(); //Nous envoyons notre requête 
    requete.onload = function(){ //lorsque la requête est prête 
        if (requete.readyState === XMLHttpRequest.DONE){
            if (requete.status === 200) {
                let reponse = requete.response; //on stock la réponse.  
                let articles = reponse;
                console.log(articles) ;
                sessionStorage.setItem('article', produit)
                container.innerHTML="";
                articles.forEach(article => {
                    const card = `<div class="col-12 col-lg-4  shadow-lg p-3 mb-5 bg-body rounded">
                                    <a href="/produit.html?id=${article._id}">
                                        <div class="card">
                                            <img src="${article.imageUrl}" alt="" class="card-img" style="height: 277px;" >
                                            <div class="card-body">
                                                <h5 class="card-title">${article.name}</h5>
                                                <p class="card-text">${article.description}</p>
                                                <p class="card-text"> ${article.price / 100} €</p>
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

//fonction permettant a l'utilisateur de choisir la catégorie d'article
function modifierCategorie(){ 
    var select_article = document.getElementById("article");
    console.log(select_article.value);
    produit = select_article.value; 
    loadtData();
}





 