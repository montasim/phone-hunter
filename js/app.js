// on click search this function works
const phoneSearch = _ => {
    // display spinner 
    displaySpinner(true);

    // get search input into lower case
    const searchText = document.getElementById('search-input').value.toLowerCase();

    if(searchText == ''){
        // display error message
        document.getElementById('display-total').innerHTML = `
        <div class="alert alert-danger" role="alert">
            Search Field is Empty!
        </div>
        `
        // hide spinner 
        displaySpinner(false);
    }
    else{
        displayPhone(searchText);
    }
}

const displayPhone = searchText => {
    try {
        // get dynamic search
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`

        fetch(url)
        .then(response => response.json())
        .then(phones => {
            // get display field id
            const displayPhones = document.getElementById('display-phones');
            
            // if search result found
            if(phones.status == true){
                // clear previous result
                clearPreviousResult('display-phones');
                clearPreviousResult('phone-details');

                // display total result
                document.getElementById('display-total').innerHTML = `
                <div class="alert alert-success" role="alert">
                    ${phones.data.length} Phones Found
                </div>
                `;

                show20Result(phones, displayPhones);

                document.getElementById('show-all').addEventListener('click', function(){
                    showAllResult(phones, displayPhones);
                })  

                // hide spinner 
                displaySpinner(false);
            }
            // if no search result found
            else{
                // clear previous data
                displayPhones.innerHTML = '';
                clearPreviousResult('display-phones');

                // display no data
                document.getElementById('display-total').innerHTML = `
                <div class="alert alert-danger" role="alert">
                    No Data Found!
                </div>
                `

                // hide spinner 
                displaySpinner(false);
            }
        })
    } 
    // api error
    catch (error) {
        console.log('API Search Error!');
    }
}

// display phone details
const displayPhoneDetails = id => {
    // display spinner 
    displaySpinner(true);

    try {
        // get dynamic url
        const url = `https://openapi.programming-hero.com/api/phone/${id}`

        fetch(url)
        .then(response => response.json())
        .then(phone => {
            // get phone details field id
            const phonesDetails = document.getElementById('phone-details');
            
            if(phone.status == true){
                // clear previous result
                clearPreviousResult('phone-details');
                clearPreviousResult('display-total');

                // create a div
                const div = document.createElement('div');

                console.log(phone.data);

                // display each result
                div.innerHTML = `
                    <div class="container">
                    <div class="row mx-auto">
                        <div class="col-sm-5">
                        <img
                            class="img-fluid w-75"
                            src="${phone.data?.image}"
                            alt="Card image cap"
                        />
                        </div>
                        <div class="col-sm-7 mt-5">
                        <h3 class="h3">${phone.data?.name}</h3>
                        <table class="table table-borderless">
                            <tbody class="fs-6">
                            <tr>
                                <td>Brand:</td>
                                <td>${phone.data?.brand}</td>
                            </tr>
                            <tr>
                                <td>Chipset:</td>
                                <td>${phone.data.mainFeatures?.chipSet}</td>
                            </tr>
                            <tr>
                                <td>Sensors:</td>
                                <td>${phone.data.mainFeatures?.sensors}</td>
                            </tr>
                            <tr>
                                <td>Display:</td>
                                <td>${phone.data.mainFeatures?.displaySize}</td>
                            </tr>
                            <tr>
                                <td>Memory:</td>
                                <td>${phone.data.mainFeatures?.memory}</td>
                            </tr>
                            <tr>
                                <td>Storage:</td>
                                <td>${phone.data.mainFeatures?.storage}</td>
                            </tr>
                            <tr>
                                <td>Others:</td>
                                <!-- optional chaining -->
                                <td>Bluetooth ${phone.data.others?.Bluetooth == undefined? 'No data' : phone.data.others.Bluetooth}, GPS ${phone.data.others?.GPS == undefined? 'No data': phone.data.others.GPS}, NFC ${phone.data.others?.NFC == undefined? 'No Data' : phone.data.others.NFC}, Radio ${phone.data.others?.Radio == undefined? 'No Data' : phone.data.others.Radio}, USB ${phone.data.others?.USB == undefined? 'No Data' : phone.data.others.USB}, WLAN ${phone.data.others?.WLAN == undefined? 'No Data' : phone.data.others.WLAN} </td>
                            </tr>
                            <tr>
                                <td>Release Date:</td>
                                <td>${phone.data?.releaseDate == ''? 'No Release Date Found' : phone.data.releaseDate}</td>
                            </tr>
                            </tbody>
                        </table>
                        </div>
                    </div>
                    </div>
                        `
                        phonesDetails.appendChild(div);

                // hide spinner 
                displaySpinner(false);
            }
            else{
                // clear previous data
                clearPreviousResult('phone-details')

                // display no data
                document.getElementById('display-total').innerHTML = `
                <div class="alert alert-danger" role="alert">
                    No Data Found!
                </div>
                `

                // hide spinner 
                document.getElementById('spinner').style.display = 'none';
            }
        })
    } 
    // api error
    catch (error) {
        console.log('API Search ID Error!');
    }
}

// search while pressing enter
var input = document.getElementById('search-input');
input.addEventListener('keyup', function (event) {
    if (event.keyCode === 13) {
            event.preventDefault();
            document.getElementById('search-btn').click();
        }
});

// display or hide spinner
const displaySpinner = isTrue => {
    if(isTrue){  
        document.getElementById('spinner').style.display = 'block';
    }
    else{  
        document.getElementById('spinner').style.display = 'none';
    }
}

// clear result 
const clearPreviousResult = id => {
    document.getElementById(id).innerHTML = '';
}

// check empty node
const checkEmptyNode = node => {
    node == undefined? 'No data' : node;
}

// show 20 result
const show20Result = (phones, displayPhones) => {
    // seperate each phone
    phones.data.slice(0, 20).forEach(phone => {
        // create a div
        const div = document.createElement('div');

        // display each result
        div.innerHTML = `
            <div  class="col">
                <div class="card h-100">
                <img src="${phone?.image}" class="image-fluid card-img-top p-3" alt="${phone?.phone_name} image" />
                <div class="card-body">
                    <h4 class="card-title"> ${phone?.phone_name}</h4>
                    <h5 class="card-title text-muted"> ${phone?.brand}</h5>
                </div>
                <div class="card-footer">
                    <button 
                    class="btn alert-dark"
                    onclick="displayPhoneDetails('${phone?.slug}')"
                    >
                    See Details</button>
                </div>
                </div>
            </div>
            `
        // append div to display
        displayPhones.appendChild(div);
    });
}

// show all result
const showAllResult = (phones, displayPhones) => {
    // display spinner 
    document.getElementById('spinner').style.display = 'block';

   // clear previous result
    clearPreviousResult('display-phones');

    // seperate each phone
    phones.data.forEach(phone => {
        // create a div
        const div = document.createElement('div');

        // display each result
        div.innerHTML = `
            <div  class="col">
                <div class="card h-100">
                <img src="${phone?.image}" class="image-fluid card-img-top p-3" alt="${phone?.phone_name} image" />
                <div class="card-body">
                    <h4 class="card-title"> ${phone?.phone_name}</h4>
                    <h5 class="card-title text-muted"> ${phone?.brand}</h5>
                </div>
                <div class="card-footer">
                    <div 
                    class="text-primary"
                    onclick="displayPhoneDetails('${phone?.slug}')"
                    >
                    See Details</div>
                </div>
                </div>
            </div>
            `
        // append div to display
        displayPhones.appendChild(div);
    });
    // hide spinner 
    document.getElementById('spinner').style.display = 'none';
}