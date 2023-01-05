window.onload = function (){
    let adsForm =  document.getElementById("ads-form");
    adsForm.addEventListener("submit", submitHandler)
}

async function submitHandler(e){
    e.preventDefault()

    let brand = document.getElementById("brand").value
    let type = document.getElementById("manual-automatic").value
    let year = document.getElementById("year").value
    let kms = document.getElementById("kmdriven").value
    let Description = document.getElementById("des").value
    let Price = document.getElementById("price").value

    // console.log(brandName,manualAuto,year,kmDriven,des,price)

    console.log(
        brand, type, year, kms, Description, Price
        )

    dataObj = {
        brand, type, year, kms, Description, Price
    }
    console.log(dataObj)

    let data = await fetch("https://dead-erin-beaver-tutu.cyclic.app/cars",{
        method: "POST",
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataObj)
    })

    let fetchData = await data.json()

    if(data.status == 201){
        brand.value = ""
        type.value = ""
        year.value = ""
        kms.value = ""
        Description.value = ""
        Price.value = ""
        alert("Data added successfully")

    }

    console.log(fetchData)

}