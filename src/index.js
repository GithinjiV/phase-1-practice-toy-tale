let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  const toyCollection = document.querySelector('div#toy-collection')
  document.addEventListener('click', handleEvents)
  const url = 'http://localhost:3000/toys'
  toyFormContainer.addEventListener('submit', handleSubmit)

  fetch(url)
    .then(res=> res.json())
    .then(toys=>{
      toys.forEach(toy=>{
        toyCollection.innerHTML += `<div class="card">
        <h2>${toy.name}</h2>
        <img src=${toy.image} class="toy-avatar" />
        <p class="likes" data-id=${toy.likes}>${toy.likes} Likes</p>
        <button data-id = ${toy.id} class="like-btn" id=${toy.id}>Like ❤️</button>
        <button class="delete-btn" id=${toy.id}>Delete</button>
      </div>`
      })
    })

  
    
  

  function handleSubmit(e){
    e.preventDefault()
    let newObj = {
      name:e.target.name.value,
      image:e.target.image.value,
      likes:0
    }
    fetch(url,{
      method:'POST',
      headers:{
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body:JSON.stringify(newObj)
    })
    .then(res=> res.json())
    .then(data=>{
      console.log(data)
    })
  }




  function handleEvents(e){
    if(e.target.className == 'like-btn'){
      let likes = e.target.previousElementSibling.dataset.id
      let newLikes = parseInt(likes) + 1
      console.log(newLikes)
      likeToy(e.target.id, newLikes)
    }else if(e.target.className == 'delete-btn'){
      e.target.parentNode.remove()
      deleteToy(e.target.id)
    }
  }

  const likeCount = document.querySelector('p.likes')
  
  function likeToy(id, newLikes){
    
    fetch(`${url}/${id}`,{
      method:'PATCH',
      headers:{
        'Content-Type': 'application/json',
        Accept:'application/json'
      },
      body:JSON.stringify({likes: newLikes })
    })
    .then(r => r.json())
    .then(update=>{
      likeCount.innerHTML = `${update.likes} likes` 
    })
  }

  
  function deleteToy(id){
    fetch(`${url}/${id}`,{
      method:'DELETE',
      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then(res=>res.json())
    .then(data=>console.log(data))
  }
});
