console.log(localStorage);
const container = document.getElementById("global-list")
let typeArticle = sessionStorage.getItem('article');
let articles = []; //j'initialise un tableau qui va acceuillir l'ensemble des articles
let products = []; //j'initialise un tableau qui va acceuillir les ID des articles
let price = [];// j'initialise un tableau qui va acceuillir le prix des articles

function recupArticles() {     
    for(let i = 0; i < localStorage.length; i++){   //création d'une boucle qui va recupéré chaque article du local storage 
        const key = localStorage.key(i);
        let article = JSON.parse(localStorage.getItem(key)); 
        products.push(article._id);     // j'envoie chaque ID dans le tableau products   
        articles.push(article);     // j'envoie chaque article dans le tableau articles 
        price.push(parseInt(article.price)); // j'envoie chaque prix dans le tableau price        
        };
    articles.forEach(article => { //boucle qui va afficher chaque article du tableau articles dans le html
        const card = `<div class="col-12 col-lg-4 ">
                        <a href="/produit.html?id=${article._id}">
                            <div class="card">
                                <img src="${article.imageUrl}" alt="" class="card-img" style="height: 277px;">
                                <div class="card-body">
                                    <h5 class="card-title">${article.name}</h5>
                                    
                                    <p class="card-text"> ${article.price}€</p>
                                </div>  
                            </div>
                        </a>
                    </div>` 
        container.innerHTML += card; 
        return products
    });                                 
}
recupArticles();
console.log(products);





const inputFirstName = document.querySelector('#validationCustom01');//
const inputLastName = document.querySelector('#validationCustom02');//
const inputCity = document.querySelector('#validationCustom03');// récupération du formulaire 
const inputAdress = document.querySelector('#validationCustom05');//
const inputMail = document.querySelector('#email');//
const validation = document.querySelector('#validFor');//
let isValid;//

(function () {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('input', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }  
          form.classList.add('was-validated')
      }, false)
    })
})()



// expression reguliere pour email

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
 
function validate() {
    const $result = $("#result");
    const email = $("#email").val();
    $result.text("");

    if (validateEmail(email)) {
    $result.text(email + " is valid :)");
    $result.css("color", "green");
    isValid = true
    } else {
    $result.text(email + " is not valid :(");
    $result.css("color", "red");
    isValid = false
    }
    return false;
}
  
inputMail.addEventListener("input", (e) => {
    validate()

} );

validation.addEventListener('click', (e) => {
    e.preventDefault();
       if(e.target.value != null && isValid == true){
        let contact = {
            firstName: inputFirstName.value,
            lastName: inputLastName.value,
            address: inputAdress.value,
            city: inputCity.value,
            email: inputMail.value
        };

        let pushApi = {contact, products};
        console.log(pushApi);
        
        if(confirm(`Voulez-vous valider la commande ?`)){
            fetch('http://localhost:3000/api/'+typeArticle+'/order', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(pushApi)

            })
            .then(reponse => {
                return reponse.json();
            })
            .then(reponse => {
                sessionStorage.setItem('order', reponse.orderId)
                sessionStorage.setItem('prix', price)
                sessionStorage.setItem('prénom', contact.firstName)
                sessionStorage.setItem('mail', contact.email)
                location.href ="confirmation.html"; 
            })
        }
    }
})
    
