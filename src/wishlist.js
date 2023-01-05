let url = "https://dead-erin-beaver-tutu.cyclic.app/wishlisted_cars";
async function getData(url) {
  let data = await fetch(url);
  let fetchData = await data.json();
  console.log(fetchData, "fetchData");
  setData(fetchData);
}

function setData(data) {
  carContainer = document.getElementById("cars-container");
  carContainer.innerHTML = "";

  data.forEach((item) => {
    let { Description, Price, brand, id, kms, type, year } = item;
    let singleDiv = document.createElement("div");
    singleDiv.classList.add("single-car");
    img = document.createElement("img");
    img.src =
      "https://img.freepik.com/free-vector/red-sedan-car-isolated-white-vector_53876-64366.jpg?w=1380&t=st=1672902465~exp=1672903065~hmac=e98a1cfb686dd7f0a09f5c9d4ff4fd5a81f9b1b9fa7408a84d83c4630079ec8c";
    let heading = document.createElement("p");

    heading.className = "singleCarHeading";
    heading.innerHTML = `<strong><span>${year} </span> ${brand}</strong> <span>${type}<span>`;

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

    pTag.innerHTML = "Zero Down Payment";
    singleDiv.append(img, heading, spec, pricediv, pTag);
    carContainer.append(singleDiv);
  });
}

getData(url);
