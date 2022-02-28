const phoneSearch = _ => {
    const searchText = document.getElementById('search-input').value;

    console.log(searchText);

    try {
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`

        fetch(url)
        .then(response => response.json())
        .then(phones => {
            console.log(phones.data);

            document.getElementById('display-total').innerText = `${phones.data.length} Phones Found`;

            const displayPhones = document.getElementById('display-phones');
            const div = document.createElement('div');

            phones.data.forEach(phone => {
                console.log(phone);
                console.log(phone.brand);
                console.log(phone.phone_name);
                console.log(phone.image);
                console.log(phone.slug);

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
                            <small class="text-muted">${phone.slug}</small>
                        </div>
                        </div>
                    </div>
                    `
                displayPhones.appendChild(div);
            });
        })
    } catch (error) {
        console.log('Something Went Wrong!');
    }
}