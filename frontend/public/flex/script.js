// const search = document.querySelector(".search-box input"),
//       images = document.querySelectorAll(".image-box");

// search.addEventListener("keyup", e =>{
//     if(e.key == "Enter"){
//         let searcValue = search.value,
//             value = searcValue.toLowerCase();
//             images.forEach(image =>{
//                 if(value === image.dataset.name){ //matching value with getting attribute of images
//                     return image.style.display = "block";
//                 }
//                 image.style.display = "none";
//          });
//     }
// });

// search.addEventListener("keyup", () =>{
//     if(search.value != "") return;

//     images.forEach(image =>{
//         image.style.display = "block";
//     })
// })


const search = document.querySelector(".search-box input"),
      images = document.querySelectorAll(".image-box");

search.addEventListener("input", () => {
    const searchValue = search.value.trim().toLowerCase();

    images.forEach(image => {
        const imageName = image.dataset.name.toLowerCase();
        const display = imageName.includes(searchValue) ? "block" : "none";
        image.style.display = display;
    });
});
