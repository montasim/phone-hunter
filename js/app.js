// on click search this function works
const phoneSearch = _ => {
    // display spinner 
    document.getElementById('spinner').style.display = 'block';
    // get search input
    const searchText = document.getElementById('search-input').value;

    try {
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`

        fetch(url)
        .then(response => response.json())
        .then(phones => {
            // get display field id
            const displayPhones = document.getElementById('display-phones');

            console.log(phones);
            console.log(phones.status);
            
            if(phones.status == true){
                // clear previous result
                displayPhones.innerHTML = '';

                // display total result
                document.getElementById('display-total').innerHTML = `
                <div class="alert alert-success" role="alert">
                    ${phones.data.length} Phones Found
                </div>`;

                phones.data.forEach(phone => {
                    console.log(phone);
                    console.log(phone.brand);
                    console.log(phone.phone_name);
                    console.log(phone.image);
                    console.log(phone.slug);

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
                            <div class="card-footer d-flex justify-content-between">
                                <small class="text-muted">${phone.slug}</small>
                                <button class="btn btn-outline-success">See Details</button>
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