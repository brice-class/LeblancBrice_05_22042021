// console.log(JSON.parse(localStorage.getItem('product')));
console.log(localStorage);
const container = document.getElementById("global-list")

let teddies = []
let price = 0;



function displayTeddies() {

    
    // let product = JSON.parse(localStorage.getItem("product"));
    // console.log(product)
    // product.forEach(teddy => {
        for(let i = 0; i < localStorage.length; i++){
            const key = localStorage.key(i);
            let teddy = JSON.parse(localStorage.getItem(key)); 
            console.log(teddy);

    let teddyCard = `<div class="col-12 col-lg-4 ">
                            <a href="/produit.html?id=${teddy._id}">
                                <div class="card">
                                    <img src="${teddy.imageUrl}" alt="" class="card-img-top">
                                    <div class="card-body">
                                        <h5 class="card-title">${teddy.name}</h5>
                                        <p class="card-text">${teddy.description}</p>
                                        <p class="card-text"> prix : ${teddy.price}€</p>
                                    </div>
                                </div>
                            </a>
                        </div>` 

        // teddies.push(teddy._id);
        container.innerHTML += teddyCard; 
    };
}
displayTeddies();

(function () {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }  
          form.classList.add('was-validated')
      }, false)
    })
})()


// const inputFirstName = document.querySelector('#validationCustom01');
// inputFirstName.addEventListener('input', function(e) {
//     let value = e.target.value;
//     console.log(value);
//         addFirstName("Prénom", JSON.stringify(value))

// });

// function addFirstName(key, value) {
//     localStorage.setItem(key, value);
// };
// /*    */
// const inputLastName = document.querySelector('#validationCustom02');
// inputLastName.addEventListener('input', function(e) {
//     let value = e.target.value;
//     console.log(value);
//         addLastName("Nom", JSON.stringify(value))

// });
// function addLastName(key, value) {
//     localStorage.setItem(key, value);
// };

// const inputMail;
// const inputState;
// const inputCity;
// const products = [//id des teddies];
// const contact = {firstName, lastName, address, city et email, products}