let url = "https://dead-erin-beaver-tutu.cyclic.app/cars";
var fetchData = [],
  sortprice = "",
  sortkms = "";
var editid = 0;
getData(url);

window.onload = function () {
  let adsForm = document.getElementById("ads-form");
  adsForm.addEventListener("submit", submitHandler);

  let modal = document.getElementById("myModal");
  var span = document.getElementsByClassName("close")[0];
  span.onclick = function () {
    modal.style.display = "none";
  };
};

async function getData(url) {
  let data = await fetch(url);
  fetchData = await data.json();

  setData(fetchData);
}

function setData(data) {
  carContainer = document.getElementById("cars-container");
  carContainer.innerHTML = "";

  data.forEach((item) => {
    let { Description, Price, brand, id, kms, type, year } = item;
    let singleDiv = document.createElement("div");
    singleDiv.classList.add("single-car");
    singleDiv.id = id;
    img = document.createElement("img");
    img.src =
      "https://img.freepik.com/free-vector/red-sedan-car-isolated-white-vector_53876-64366.jpg?w=1380&t=st=1672902465~exp=1672903065~hmac=e98a1cfb686dd7f0a09f5c9d4ff4fd5a81f9b1b9fa7408a84d83c4630079ec8c";
    let heading = document.createElement("p");

    heading.className = "singleCarHeading";
    heading.innerHTML = `<strong><span>${year} </span> ${brand}</strong><br/><br/>
     <strong>LXI</strong> <span>${type}<span>
     `;

    spec = document.createElement("div");
    spec.className = "spec";

    spec.innerHTML = `
        <div><p>${kms} kms</p></div>
        <div><p>1st Owner</p></div>
        <div><p>Petrol</p></div>
        `;

    let pricediv = document.createElement("div");
    pricediv.className = "price";
    pricediv.innerHTML = `
    <div><p>₹ ${Math.floor(Price / 12)} / Month</p></div>
    <div><p>₹ ${Price}</p></div>
    `;

    pTag = document.createElement("p");
    pTag.className = "zeroDownPayment";

    iconsDiv = document.createElement("div");
    iconsDiv.className = "iconsDiv";

    iconsDiv.innerHTML = ` 
    <div><i class='fas fa-pencil-alt' style='font-size:16px' onclick="editProduct(${id})" ></i></div>
    <div><i class='fas fa-trash-alt' style='font-size:16px' onclick="deleteItem(${id})" ></i></div>
    <div><i class='far fa-heart' style='font-size:16px' onclick="addToWishlist(${id})" ></i></div>
    `;

    pTag.innerHTML = "Zero Down Payment";
    singleDiv.append(img, heading, spec, pricediv, pTag, iconsDiv);
    carContainer.append(singleDiv);
  });
}

async function submitHandler(e) {
  e.preventDefault();

  let brand = document.getElementById("brand").value;
  let type = document.getElementById("manual-automatic").value;
  let year = document.getElementById("year").value;
  let kms = document.getElementById("kmdriven").value;
  let Description = document.getElementById("des").value;
  let Price = document.getElementById("price").value;

  // console.log(brandName,manualAuto,year,kmDriven,des,price)

  console.log(brand, type, year, kms, Description, Price);

  dataObj = {
    brand,
    type,
    year,
    kms,
    Description,
    Price,
  };
  console.log(dataObj, "dataObj from submitHandler", editid);

  //   put data in the database
  let data = await fetch(
    "https://dead-erin-beaver-tutu.cyclic.app/cars/" + editid,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataObj),
    }
  );
  let fetchData = await data.json();

  console.log(fetchData);
  getData("https://dead-erin-beaver-tutu.cyclic.app/cars");
  let modal = document.getElementById("myModal");
  modal.style.display = "none";
}

async function addToWishlist(id) {
  let item = fetchData.find((item) => item.id == id);

  let data = await fetch(
    "https://dead-erin-beaver-tutu.cyclic.app/wishlisted_cars",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    }
  );
  fetchedData = await data.json();

  console.log(fetchedData);
}

function sortPrice() {
  let sortPrice = document.getElementById("sortByPrice").value;
    let newarr = [];
  if (sortPrice == "asc") {
   newarr =  fetchData.sort((a, b) => a.Price - b.Price);
  } else {
     newarr = fetchData.sort((a, b) => b.Price - a.Price);
  }

  setData(newarr);
}

function sortKms() {
  let sortKms = document.getElementById("sortBykms").value;
  console.log(sortKms, "sortKms");
  if (sortKms == "asc") {
    fetchData.sort((a, b) => a.kms - b.kms);
  } else {
    fetchData.sort((a, b) => b.kms - a.kms);
  }
  setData(fetchData);
}

function filterByBrand() {
  let brand = document.getElementById("filterByBrand").value;
  console.log(brand, "brand");
  let filteredData = fetchData.filter((item) => item.brand == brand);
  setData(filteredData);
}

async function editProduct(id) {
  let modal = document.getElementById("myModal");
  editid = id;

  let item = fetchData.find((item) => item.id == id);

  console.log(item);

  let brand = (document.getElementById("brand").value = item.brand);

  let type = (document.getElementById("manual-automatic").value = item.type);

  let year = (document.getElementById("year").value = item.year);
  let kms = (document.getElementById("kmdriven").value = item.kms);
  let Description = (document.getElementById("des").value = item.Description);
  let Price = (document.getElementById("price").value = item.Price);

  modal.style.display = "block";
}

async function deleteItem(id) {
  let data = await fetch(
    "https://dead-erin-beaver-tutu.cyclic.app/cars/" + id,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  let fetchData = await data.json();

  currentDiv = document.getElementById(id);
  currentDiv.remove();

  getData("https://dead-erin-beaver-tutu.cyclic.app/cars");
}
