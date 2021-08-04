let priceArray =  sessionStorage.getItem('prix');
priceArray = priceArray.split(',');
let userName =  sessionStorage.getItem('prénom');
console.log(userName)
let mail = sessionStorage.getItem('mail');
console.log(mail)
order = sessionStorage.getItem('order');

for(let i = 0; i<priceArray.length; i++)
    priceArray[i] = +priceArray[i];
    console.log(priceArray)

//La méthode reduce() applique une fonction qui est un « accumulateur » et qui traite chaque valeur
//  d'une liste (de la gauche vers la droite) afin de la réduire à une seule valeur.
const reducer = (accumulator, currentValue) => accumulator + currentValue;
let prixTotal = priceArray.reduce(reducer);
console.log(prixTotal);

const container = document.getElementById("global-list")

container.innerHTML = 
        `
        <div class="pt-5">
            <h5 class="card-title"> Merci beaucoup ${userName}</h5>
            <p class="card-text"> Votre commande n° ${order} d'un montant de ${prixTotal}€ est prise en charge</p>
            <p class="card-text"> Un mail de confirmation a été envoyé a l'adresse suivante : ${mail}.</p>
        </div>
        
        
        `


