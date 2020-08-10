const burger = document.querySelector(".burger");
const nav = document.querySelector(".nav-links");
const navLinks = document.querySelectorAll(".side-link");
const contents = $("nav>:not('div.burger')");
 // Toggle
 burger.addEventListener("click",()=>
 {
    if(burger.classList.contains('toggle'))
    {
        document.getElementById("side-menu").style.width = '0px';
    }
    else
    {
       document.getElementById("side-menu").style.width = '400px';
       if(window.innerWidth<=768 && window.innerWidth>=568)
       {
           document.getElementById("side-menu").style.width = '768px';
       }
       if(window.innerWidth<=568)
       {
        document.getElementById("side-menu").style.width = '568px';
       }
    }
     // Animate Links
     navLinks.forEach((link,index)=>{
     if(link.style.animation)
     {
         link.style.animation = '';
     }
     else
     {
       link.style.animation = `navLinksFade 0.5s ease forwards ${index/7 + 0.8}s`;
     }
     });
     burger.classList.toggle('toggle');
     document.getElementById("side-menu").classList.toggle("open");
    //  Adding Blur effect
    for(var i=0;i<contents.length;i++)
    {
        contents[i].classList.toggle("blur");
    }
 });