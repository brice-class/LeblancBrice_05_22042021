const container = document.getElementById("global-list")

 const url = "http://localhost:3000/api/teddies";
 let requete = new XMLHttpRequest(); // créer un objet 
 requete.open("get", url); // premier parametre :  get / post, deuxieme parametre : url
 requete.responseType = "json"; //Nous attendons du Json
 requete.send(); //Nous envoyons notre requete 


 requete.onload = function(){ //lorsque la requete est prete 
     if (requete.readyState === XMLHttpRequest.DONE){
         if (requete.status === 200) {
             let reponse = requete.response; //on stock la réponse.  
             let teddies = reponse;
             console.log(teddies) ;

             teddies.forEach(teddy => {
                const card = `<div class="col-12 col-lg-4 ">
                                <a href="/produit.html?id=${teddy._id}">
                                    <div class="card">
                                        <img src="${teddy.imageUrl}" alt="" class="card-img-top">
                                        <div class="card-body">
                                            <h5 class="card-title">${teddy.name}</h5>
                                            <p class="card-text">${teddy.description}</p>
                                            <p class="card-text"> ${teddy.price} €</p>
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





 