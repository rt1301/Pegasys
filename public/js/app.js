var width = window.innerWidth;
var height = window.innerHeight;
var lastScroll =0;
// Animsition code
$(document).ready(function() {
    $(".animsition").animsition({
      inClass: 'fade-in',
      outClass: 'fade-out',
      inDuration: 1500,
      outDuration: 800,
      linkElement: '.animsition-link',
      // e.g. linkElement: 'a:not([target="_blank"]):not([href^="#"])'
      loading: true,
      loadingParentElement: 'body', //animsition wrapper element
      loadingClass: 'animsition-loading',
      loadingInner: '', // e.g '<img src="loading.svg" />'
      timeout: false,
      timeoutCountdown: 5000,
      onLoadEvent: true,
      browser: [ 'animation-duration', '-webkit-animation-duration'],
      // "browser" option allows you to disable the "animsition" in case the css property in the array is not supported by your browser.
      // The default setting is to disable the "animsition" in a browser that does not support "animation-duration".
      overlay : false,
      overlayClass : 'animsition-overlay-slide',
      overlayParentElement : 'body',
      transition: function(url){ window.location.href = url; }
    });
  });
// Smooth Scrolling using luxy.js 
luxy.init({
    wrapper: '#luxy',
    wrapperSpeed:  0.03
});
document.addEventListener("DOMContentLoaded", function() {
  var lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));

  if ("IntersectionObserver" in window) {
    let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          let lazyImage = entry.target;
          lazyImage.src = lazyImage.dataset.src;
          lazyImage.srcset = lazyImage.dataset.srcset;
          lazyImage.classList.remove("lazy");
          lazyImageObserver.unobserve(lazyImage);
        }
      });
    });

    lazyImages.forEach(function(lazyImage) {
      lazyImageObserver.observe(lazyImage);
    });
  } else {
    // Possibly fall back to event handlers here
  }
});
// Navbar 
const burger = document.querySelector(".burger");
const nav = document.querySelector(".nav-links");
const navLinks = document.querySelectorAll(".side-link");
const Navcontents = $("nav>:not('div.burger')");
 // Toggle
 burger.addEventListener("click",()=>
 {
    const contents = $("#luxy");
    const footer   = $("footer");
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
    for(var i=0;i<Navcontents.length;i++)
    {
        Navcontents[i].classList.toggle("blur");
    }
    for(var i=0;i<contents.length;i++)
    {
        contents[i].classList.toggle("blur");
    }
    footer[0].classList.toggle("blur");
 });
// Solar System animation
var planets = document.getElementsByClassName("orbit");
var ss = [];
var universe = $("universe");
for(var i=0;i<planets.length;i++)
{
    ss.push(planets[i].getAttribute("id").toString());
}
$("#data a").click(function(e)
{
    var ref = $(this).attr("class");
    for(var i=0;i<ss.length;i++)
    {
        $("#"+ss[i]).find("dl").addClass("unactive");
        planets[i].style.borderColor = "rgba(255, 255, 255, 0.2)";
    }
    $("#sun").find("dl").addClass("unactive");
    $("#"+ref).find('dl').toggleClass("unactive");
    $("#"+ref).css("border-color","rgb(255, 255, 255)");
    e.preventDefault();
});
$(".set-zoom").click(function(){
    $("#ss-container").toggleClass("zoom-large zoom-close");
});
// Carousel Animation
if($("div.Carousel").length!=0)
{
const track =  document.querySelector(".carousel__track");
const slides = Array.from(track.children);
const nextBtn = document.querySelector("button.right");
const prevBtn = document.querySelector("button.left");
const dotsNav = document.querySelector(".carousel__nav");
const dots      = Array.from(dotsNav.children);
var slideWidth = slides[0].getBoundingClientRect().width;
for(var i=0;i<slides.length;i++)
{
    slides[i].style.left = slideWidth*i + 'px';
}
const moveToSlide = (track, currentSlide, targetSlide)=> {
    track.style.transform  = 'translateX(-' + targetSlide.style.left + ')';
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
}

const updateDots = (currentDot,targetDot)=>{
    currentDot.classList.remove('current-slide');
    targetDot.classList.add('current-slide');
}
const hideShowArrow = (targetIndex,slides) => {
    if(targetIndex === 0)
    {
        prevBtn.classList.add('is-hidden');
        nextBtn.classList.remove('is-hidden');
    }
    else if(targetIndex === (slides.length -1))
    {
        prevBtn.classList.remove('is-hidden');
        nextBtn.classList.add('is-hidden');
    }
    else
    {
        prevBtn.classList.remove('is-hidden');
        nextBtn.classList.remove('is-hidden');
    }
}
prevBtn.addEventListener('click',function(){
    const currentSlide = track.querySelector('.current-slide');
    const prevSlide = currentSlide.previousElementSibling;
    const currentDot   = dotsNav.querySelector(".current-slide");
    const prevDot      = currentDot.previousElementSibling;
    const prevIndex = slides.findIndex(slide => slide === prevSlide);
    moveToSlide(track, currentSlide, prevSlide);
    updateDots(currentDot,prevDot);
    hideShowArrow(prevIndex,slides);
});
nextBtn.addEventListener('click',function(){
    const currentSlide = track.querySelector('.current-slide');
    const nextSlide = currentSlide.nextElementSibling;
    const currentDot   = dotsNav.querySelector(".current-slide");
    const nextDot      = currentDot.nextElementSibling;
    const nextIndex = slides.findIndex(slide => slide === nextSlide);
    moveToSlide(track, currentSlide, nextSlide);
    updateDots(currentDot,nextDot);
    hideShowArrow(nextIndex,slides);
});

dotsNav.addEventListener('click',function(e){
    const targetDot = e.target.closest('button');
    if(!targetDot) return;
    const currentSlide = track.querySelector(".current-slide");
    const currentDot   = dotsNav.querySelector(".current-slide");
    const targetIndex  = dots.findIndex(dot => dot === targetDot);
    const targetSlide  = slides[targetIndex];
    moveToSlide(track,currentSlide,targetSlide);
    updateDots(currentDot,targetDot);
    hideShowArrow(targetIndex,slides);
});
}
// Smooth Scrolling using jQuery
// Select all links with hashes
$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
      && 
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      }
    }
  });
