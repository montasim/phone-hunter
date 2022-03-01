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
    }
    else{
        try {
            const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    
            fetch(url)
            .then(response => response.json())
            .then(phones => {
                // get display field id
                const displayPhones = document.getElementById('display-phones');
                
                if(phones.status == true){
                    // clear previous result
                    clearPreviousResult('display-phones');
                    clearPreviousResult('phone-details');
    
                    // display total result
                    document.getElementById('display-total').innerHTML = `
                    <div class="alert alert-success" role="alert">
                        ${phones.data.length} Phones Found
                    </div>`;
    
                    phones.data.forEach(phone => {
                        // create a div
                        const div = document.createElement('div');
    
                        // display each result
                        div.innerHTML = `
                            <div  class="col">
                                <div class="card h-100">
                                <img src="${phone.image}" class="image-fluid card-img-top p-3" alt="${phone.phone_name} image" />
                                <div class="card-body">
                                    <h3 class="card-title">${phone.phone_name}</h3>
                                    <h5 class="card-title text-muted">${phone.brand}</h5>
                                    <p class="card-text">
                                    Phone This is a wider card with supporting text below as a natural
                                    lead-in to additional content. This content is a little bit
                                    longer.
                                    </p>
                                </div>
                                <div class="card-footer">
                                    <div 
                                    class="text-primary"
                                    onclick="displayPhoneDetails('${phone.slug}')"
                                    >
                                    See Details</div>
                                </div>
                                </div>
                            </div>
                            `
                        displayPhones.appendChild(div);
                    });
                    // hide spinner 
                    displaySpinner(false);
                }
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
            console.log('API Error!');
        }
    }
}

// display phone details
const displayPhoneDetails = id => {
    // display spinner 
    displaySpinner(true);

    try {
        const url = `https://openapi.programming-hero.com/api/phone/${id}`

        fetch(url)
        .then(response => response.json())
        .then(phone => {
            // get phone details field id
            const phonesDetails = document.getElementById('phone-details');
            
            if(phone.status == true){
                // clear previous result
                clearPreviousResult('display-phones');
                clearPreviousResult('phone-details');
                clearPreviousResult('display-total');

                // create a div
                const div = document.createElement('div');

                console.log(phone.data);

                // display each result
                div.innerHTML = `
                <div class="container mx-auto d-flex">
                    <img
                    class=""
                    src="${phone.data.image}"
                    alt="Card image cap"
                    />
                    <div class="card-body">
                        <h5 class="card-title">${phone.data.name}</h5>
                        <p class="card-text">Chipset: ${phone.data.mainFeatures.chipSet}</p>
                        <p class="card-text">Display: ${phone.data.mainFeatures.displaySize}</p>
                        <p class="card-text">Memory: ${phone.data.mainFeatures.memory}</p>
                        <p class="card-text">Storage: ${phone.data.mainFeatures.storage}</p>
                        <p class="card-text text-muted">${phone.data.releaseDate}</p>
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
        console.log('API Error!');
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