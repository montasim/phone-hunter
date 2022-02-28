const phoneSearch = _ => {
    const searchText = document.getElementById('search-input').value;

    console.log(searchText);

    try {
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`

        fetch(url)
        .then(response => response.json())
        .then(phones => {
            console.log(phones.data);

            document.getElementById('display-total').innerText = `${phones.data.length} Phones Found`

            // phones.forEach(phone => {
            //     console.log(phone);
            // });

            const displayPhones = document.getElementById('display-phones');

            const div = document.createElement('div');

            div.innerHTML = `
            <div  class="col">
                <div class="card h-100">
                <img src="" class="card-img-top" alt="Phone image" />
                <div class="card-body">
                    <h3 class="card-title">Phone Name</h3>
                    <h5 class="card-title text-muted">Phone Brand</h5>
                    <p class="card-text">
                    Phone This is a wider card with supporting text below as a natural
                    lead-in to additional content. This content is a little bit
                    longer.
                    </p>
                </div>
                <div class="card-footer">
                    <small class="text-muted">Last updated 3 mins ago</small>
                </div>
                </div>
            </div>
            `
        })
    } catch (error) {
        console.log('Something Went Wrong!');
    }
}