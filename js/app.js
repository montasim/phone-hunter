// on click search this function works
const phoneSearch = _ => {
    // display spinner 
    document.getElementById('spinner').style.display = 'block';

    // get search input
    const searchText = document.getElementById('search-input').value.toLowerCase();

    if(searchText == ''){
        // hide spinner 
        document.getElementById('spinner').style.display = 'none';

        // display no data
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
                    displayPhones.innerHTML = '';
    
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
                                    onclick="displayPhoneDetails(${phone.phone_name})"
                                    >
                                    See Details</div>
                                </div>
                                </div>
                            </div>
                            `
                        displayPhones.appendChild(div);
                    });
                    // hide spinner 
                    document.getElementById('spinner').style.display = 'none';
                }
                else{
                    // clear previous data
                    displayPhones.innerHTML = '';
    
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
}

// display phone details
const displayPhoneDetails = id => {

    console.log(id);
    
    try {
        const url = `https://openapi.programming-hero.com/api/phone/${id}`

        fetch(url)
        .then(response => response.json())
        .then(phone => {
            // get display field id
            const phonesDetails = document.getElementById('phone-details');
            
            if(phone.status == true){
                // clear previous result
                phonesDetails.innerHTML = '';

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
                        <p class="card-text">Bluetooth: ${phone.data.others.Bluetooth}</p>
                        <p class="card-text">GPS: ${phone.data.others.GPS}</p>
                        <p class="card-text">NFC: ${phone.data.others.NFC}</p>
                        <p class="card-text">Radio: ${phone.data.others.Radio}</p>
                        <p class="card-text">USB: ${phone.data.others.USB}</p>
                        <p class="card-text">WLAN: ${phone.data.others.WLAN}</p>
                        <p class="card-text text-muted">${phone.data.releaseDate}</p>
                    </div>
                </div>
                        `
                        phonesDetails.appendChild(div);

                // hide spinner 
                document.getElementById('spinner').style.display = 'none';
            }
            else{
                // clear previous data
                displayPhones.innerHTML = '';

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

// while pressing enter
var input = document.getElementById('search-input');
input.addEventListener('keyup', function (event) {
if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById('search-btn').click();
    }
});