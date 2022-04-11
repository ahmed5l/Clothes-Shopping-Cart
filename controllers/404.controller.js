const show404=(req,res) =>{
res.render("pages/404.ejs",{
    title :"404"
})
}



module.exports={
    show404
}