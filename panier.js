// console.log(JSON.parse(localStorage.getItem('product')));
console.log(localStorage);
const container = document.getElementById("global-list")

let teddies = []; //j'initialise un tableau qui va acceuillir l'ensemble des teddy
let products = [];

function recupTeddies() {     
    for(let i = 0; i < localStorage.length; i++){   //je créé une boucle qui va recupéré chaque teddy du local storage 
        const key = localStorage.key(i);
        let teddy = JSON.parse(localStorage.getItem(key)); 
        products.push(teddy._id);     // j'envoie chaque teddy dans le tableau teddies   
        teddies.push(teddy);     // j'envoie chaque teddy dans le tableau teddies        
        };
    teddies.forEach(teddy => { //boucle qui va afficher chaque teddy du tableau teddies dans le html
        const card = `<div class="col-12 col-lg-4 ">
                        <a href="/produit.html?id=${teddy._id}">
                            <div class="card">
                                <img src="${teddy.imageUrl}" alt="" class="card-img-top">
                                <div class="card-body">
                                    <h5 class="card-title">${teddy.name}</h5>
                                    <p class="card-text">${teddy.description}</p>
                                    <p class="card-text"> ${teddy.price}</p>
                                </div>  
                            </div>
                        </a>
                    </div>` 
        container.innerHTML += card; 
        return products
    });                                 
}
recupTeddies();
console.log(products);

// (function () {
//     'use strict'
  
//     // Fetch all the forms we want to apply custom Bootstrap validation styles to
//     var forms = document.querySelectorAll('.needs-validation')
  
//     // Loop over them and prevent submission
//     Array.prototype.slice.call(forms)
//       .forEach(function (form) {
//         form.addEventListener('submit', function (event) {
//           if (!form.checkValidity()) {
//             event.preventDefault()
//             event.stopPropagation()
//           }  
//           form.classList.add('was-validated')
//       }, false)
//     })
// })()


const inputFirstName = document.querySelector('#validationCustom01');
const inputLastName = document.querySelector('#validationCustom02');
const inputCity = document.querySelector('#validationCustom03');
const inputAdress = document.querySelector('#validationCustom05');
const inputMail = document.querySelector('#email');
const validation = document.querySelector('#validFor');


validation.addEventListener('click', (e) => {
    e.preventDefault();
       if(e.target.value != null){
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
            fetch('http://localhost:3000/api/teddies/order', {
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
                // location.href ="index.html"; 
            })
        }
    }
})
    
