const auth = "563492ad6f9170000100000174ae4a76023741ec974d47a36d908cbd"
const gallery = document.querySelector('.gallery')
const searchInput = document.querySelector('.search-input')
const form = document.querySelector('.search-form')
const more = document.querySelector('.more')
let searchValue
let fetchLink
let page
let currentSearch

searchInput.addEventListener('input', updateButton)
form.addEventListener("submit", (e) => {
    e.preventDefault()
    currentSearch = searchValue
    searchPhotos(searchValue)

})

more.addEventListener("click", loadMore)


function updateButton(e){
    searchValue = e.target.value

 }
async function fetchApi(url){
    const dataFetch = await fetch(url, {
        method: "GET",
        headers: {
            Accept: 'application/json',
            Authorization: auth
        }
    })
    const data = await dataFetch.json()
    
    return data

}

function generatePictures(data){
    data.photos.forEach(photo => {
        const galleryImg = document.createElement('div')
        galleryImg.classList.add('.gallery-img')
        galleryImg.innerHTML = 
        `<div class="gallery-info">
        <p>${photo.photographer}</p>
        <a href="${photo.src.original}">Скачать</a>
        </div>
        <img src=${photo.src.large}}></img> `
        
        gallery.appendChild(galleryImg)
    })

}
async function curatedPhoto(){
    fetchLink = "https://api.pexels.com/v1/curated"
    const data = await fetchApi(fetchLink)
    generatePictures(data)

}

async function searchPhotos(query){
    clear()
    fetchLink =`https://api.pexels.com/v1/search?query=${query}`
    const data = await fetchApi(fetchLink)
    generatePictures(data)
    
   
}

function clear(){
    gallery.innerHTML = ''
    
    searchValue.input = ''
    
    
}
// function clearInput(){
//     if(searchValue == undefined){
//         fetchApi = "https://api.pexels.com/v1/curated"
//     } else {
//         searchValue.input == ''
//     }
// }
async function loadMore(){
    page++
    if(currentSearch){
    fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}?page=${page}` 
    } else {
    fetchLink =`https://api.pexels.com/v1/curated?page=${page}`
    }
    const data = await fetchApi(fetchLink)
    generatePictures(data)
    

}
curatedPhoto()