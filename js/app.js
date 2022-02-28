const phoneSearch = _ => {
    const searchText = document.getElementById('search-input').value;

    console.log(searchText);

    try {
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    } catch (error) {
        
    }
}