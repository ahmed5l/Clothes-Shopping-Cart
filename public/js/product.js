const productImage=document.querySelectorAll(".product-images img");
const productImageSlide=document.querySelector('.image-slider');


let activeImageSlide =0;

productImage.forEach((item,i)=>{
    item.addEventListener('click',()=>{
        productImage[activeImageSlide].classList.remove('active');
    
        item.classList.add('active');
        productImageSlide.style.backgroundImage=`url(${item.src})`
         activeImageSlide=i;
    })
})


const sizeBtns=document.querySelectorAll('.size-radio-btn');
let checkedBtn=0;

sizeBtns.forEach((item,i)=>{
    item.addEventListener('click',()=>{
        sizeBtns[checkedBtn].classList.remove('check');
        item.classList.add('check');
        checkedBtn=i;
    })
})