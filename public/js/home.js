const ProductContainer =[...document.querySelectorAll('.product-container')];
const nextBtn =[...document.querySelectorAll('.next-btn')]
const preBtn =[...document.querySelectorAll('.pre-btn')]


ProductContainer.forEach((item ,i)=>{
    let containerDimenstions=item.getBoundingClientRect();
    let containerWidth=containerDimenstions.width;
    

    nextBtn[i].addEventListener('click' ,()=>{
        item.scrollLeft+= containerWidth
    })

    preBtn[i].addEventListener('click' ,()=>{
        item.scrollLeft-= containerWidth
    })
})