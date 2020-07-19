import Highway from '@dogstudio/highway';
import Tween from 'gsap';

class Fade extends Highway.Transition{
    in({from,to,done})
    {
        // Reset Scroll
      window.scrollTo(0, 0);

      // Remove Old View
      from.remove();
      done();
        const tl = new TimelineLite();
        tl.fromTo(to, 0.5, {left:"-100%",top:"50%"},{left:"0%"}).fromTo(to,0.5,{height:"2vh"},{height:"90vh",top:"10%",onComplete: function(){
            done();
        }});
    }
    out({from,done}){
        done();
    }
}
export default Fade;