const container = document.getElementById("global-list")

 const url = "http://localhost:3000/api/";
 let produit = "teddies";
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
             container.innerHTML="";
             articles.forEach(article => {
                const card = `<div class="col-12 col-lg-4 ">
                                <a href="/produit.html?id=${article._id}">
                                    <div class="card">
                                        <img src="${article.imageUrl}" alt="" class="card-img-top">
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

function modifierArticle(){
    var select_article = document.getElementById("article");
    console.log(select_article.value);
    produit = select_article.value;
    loadtData();
}





 