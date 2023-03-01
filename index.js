//loading phones
const loadPhones = async (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit);
}
//display phones
const displayPhones = (phones, dataLimit) => {
    const phonesContainer = document.getElementById('phones-container');

    phonesContainer.innerText = '';

    //display 10 phones only by slice also show all button

    const showAll = document.getElementById('show-all');
    if (dataLimit && phones.length > 10) {
        phones = phones.slice(0, 10);
        showAll.classList.remove('d-none');
    }
    else {
        showAll.classList.add('d-none');
    }

    //display no phone found message
    const noPhone = document.getElementById('no-phone-found-message');

    if (phones.length === 0) {
        noPhone.classList.remove('d-none');
    }
    else {
        noPhone.classList.add('d-none');
    }



    //display all phones
    phones.forEach(phone => {
        // console.log(phone)
        //create child elements 
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
                <div class="card h-100 p-4">
                        <img src="${phone.image}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${phone.phone_name}</h5>
                            <p class="card-text">This is a longer card with supporting text below as a natural lead-in
                                to additional content. This content is a little bit longer.</p>
                                <!-- Button trigger modal -->
                            <button onclick="loadPhoneDetails('${phone.slug}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneModal">Details</button>
                        </div>
                </div>

       `;

        phonesContainer.appendChild(phoneDiv);
    })
    //stop loader or spinner
    toggleSpinner(false);
}

//show all button
const processData = (dataLimit) => {
    toggleSpinner(true);

    const searchField = document.getElementById('input-field');
    const searchText = searchField.value;
    loadPhones(searchText, dataLimit);
}



//search phone
document.getElementById('search-btn').addEventListener('click', function () {

    //start spinner or loader
    processData(10);
})

//enter press for search input area

document.getElementById('input-field').addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        processData(10);
    }
});

//function for start loader or spinner

const toggleSpinner = isLoading => {
    const loader = document.getElementById('loader');

    if (isLoading) {
        loader.classList.remove('d-none');
    }
    else {
        loader.classList.add('d-none');
    }
}

//show all btn data loading

document.getElementById('btn-show-all').addEventListener('click', function () {
    processData();
})

//load phone details in modal
const loadPhoneDetails = async (id) => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data);
}

const displayPhoneDetails = phone => {
    //console.log(phone);
    const modalTitle = document.getElementById('phoneModalLabel')
    modalTitle.innerText = phone.name;

    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.innerHTML = ` 
                <p>Release Date: ${phone.releaseDate ? phone.releaseDate : 'No release date found'} </p>
                <p>BlueTooth: ${phone.others ? phone.others.Bluetooth : 'No Bluetooth information found'} </p>
                <p>GPS: ${phone.others ? phone.others.GPS : 'No GPS information found'} </p>
                <p>WLAN: ${phone.others ? phone.others.WLAN : 'No WLAN information found'} </p>

`;
}




//loadPhones('iphone');

