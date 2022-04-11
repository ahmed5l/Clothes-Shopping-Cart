
const sizes=[];

document.getElementById('file').onchange = function () {
const reader = new FileReader();
reader.readAsDataURL(this.files[0]);
reader.onload = function () {
  document.getElementById('image').src = this.result
}


document.getElementById("action").classList.remove("d-none");



}


const checXs=document.getElementById("xs")
const checS=document.getElementById("s")
const checM=document.getElementById("m")
const checL=document.getElementById("l")
const checXl=document.getElementById("xl")
const checXxl=document.getElementById("xxl")
const checXxxl=document.getElementById("xxxl")
const changeBtn=document.getElementById('change')

let inSizes=document.getElementById("sizes");
checXs.addEventListener('click',(e)=>{
   if(e.srcElement.checked === true) checXs.setAttribute("name", checXs.value);
   else checXs.removeAttribute("name")
})
checS.addEventListener('click',(e)=>{
   if(e.srcElement.checked === true) checS.setAttribute("name", checS.value);
          else checS.removeAttribute("name")
})  


checM.addEventListener('click',(e)=>{
   if(e.srcElement.checked === true)checM.setAttribute("name", checM.value); 
   else checM.removeAttribute("name")

})  


checL.addEventListener('click',(e)=>{
   if(e.srcElement.checked === true) checL.setAttribute("name", checL.value);
   else checL.removeAttribute("name")
   
})


checXl.addEventListener('click',(e)=>{
   if(e.srcElement.checked === true)  checXl.setAttribute("name", checXl.value);
  else checXl.removeAttribute("name")
})


checXxl.addEventListener('click',(e)=>{
   if(e.srcElement.checked === true) checXxl.setAttribute("name", checXxl.value);
   else  checXxl.removeAttribute("name")

})


checXxxl.addEventListener('click',(e)=>{
   if(e.srcElement.checked === true) checXxxl.setAttribute("name", checXxxl.value);
 else   checXxxl.removeAttribute("name")

})



const a=document.getElementById("a")
const b=document.getElementById("b")
const c=document.getElementById("c")
const d=document.getElementById("d")
const e=document.getElementById("e")
const f=document.getElementById("f")
const g=document.getElementById("g")
   a.addEventListener('click',(e)=>{
   if(e.srcElement.checked === true) a.setAttribute("name", "a");
   else a.removeAttribute("name")
})
  b.addEventListener('click',(e)=>{
   if(e.srcElement.checked === true) b.setAttribute("name", "b");
          else b.removeAttribute("name")
})  


c.addEventListener('click',(e)=>{
   if(e.srcElement.checked === true)c.setAttribute("name", "c"); 
   else c.removeAttribute("name")

})  


d.addEventListener('click',(e)=>{
   if(e.srcElement.checked === true) d.setAttribute("name", "d");
   else d.removeAttribute("name")
   
})


e.addEventListener('click',(e)=>{
   if(e.srcElement.checked === true)  e.setAttribute("name", "i");
  else e.removeAttribute("name")
})


f.addEventListener('click',(e)=>{
   if(e.srcElement.checked === true) f.setAttribute("name", "f");
   else  f.removeAttribute("name")

})


  g.addEventListener('click',(e)=>{
   if(e.srcElement.checked === true) g.setAttribute("name", "g");
 else   g.removeAttribute("name")

})



changeBtn.addEventListener('click',()=>{
if(changeBtn.value == 'clothes'){
changeBtn.value="shoes"
console.log("1")

document.getElementById("shoes").classList.add("d-none");
document.getElementById("clothes").classList.remove("d-none");


}
else{
console.log("2")

changeBtn.value="clothes"

document.getElementById("clothes").classList.add("d-none");
document.getElementById("shoes").classList.remove("d-none");



}

})