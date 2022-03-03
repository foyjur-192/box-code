
const main = document.getElementById('main');

const searchButton = () => {
  const input = document.getElementById('input-value');
  const error = document.getElementById('error');
  const inputValue = input.value;

  //error message shown

  if(inputValue.length===inputValue.data) {
    error.innerText = "Brand not found";
    input.value = "";
    main.innerHTML = "";
  }
  else if (inputValue == 'brand') {
    error.innerText = "Please give a brand name";
    input.value = "";
  }

  else {
    main.innerHTML = "";
    const url = `https://openapi.programming-hero.com/api/phones?search=${inputValue}`
    fetch(url)
      .then(res => res.json())
      .then(data => mobileDetails(data.data))
    input.value = "";
    error.innerHTML = "";
  }
}


const mobileDetails = (cards) => {
  const main = document.getElementById('listMore');
  const details = cards.slice(0, 20);
  main.innerHTML = "";

  for (const card of details) {
    const div = document.createElement('div');
    div.classList.add('col-lg-4');
    div.classList.add('mb-5');
    div.innerHTML = `
  <div class="card p-3" style="width: 20rem;">
  <img src="${card.image}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${card.phone_name}</h5>
    <p class="card-text">Brand Name: ${card.brand}</p>
    <button href="#" onclick="featureDetail('${card.slug}')" class="btn btn-primary">Explore Features</button>
  </div>
</div>

  `
    main.appendChild(div)
  }
}

const featureDetail = (slug) => {
  const url = `https://openapi.programming-hero.com/api/phone/${slug}`
  fetch(url)
    .then(res => res.json())
    .then(data => detailCard(data.data))
}

//add details

const detailCard = (cards) => {
  console.log(cards);
  const div = document.createElement("div");
  
  main.innerHTML = "";
  div.innerHTML = `
  <div class=" container mb-3" style="max-width: 1100px;">
  <div class="row g-0">
    <div class="col-md-4 col-sm-4 mb-5">
      <img src="${cards.image}" class="img-fluid rounded-start" style="width: 15rem"  alt="...">
    </div>
    <div class="col-md-8 col-sm-4 ">
      <div class="mb-5">
      <h3 class="card-title">Brand Name: ${cards.brand}</h3>
      <p class="card-text"> Release Date: ${cards.releaseDate}</p>
      <p class="card-text font-weight-300"> Name: ${cards.name}</p>
      <p class="card-text">ChipSet: ${cards.mainFeatures.chipSet}</p>
      <p class="card-text">DisplaySize : ${cards.mainFeatures.displaySize}</p>
      <p class="card-text">Memory: ${cards.mainFeatures.memory}</p>
      <p class="card-text">Sensors: ${cards.mainFeatures.sensors}</p>
      <p class="card-text">Storage: ${cards.mainFeatures.storage}</p>
     
      </div>
    </div>
  </div>
</div>

     
   
  
  `
  main.appendChild(div)
}


