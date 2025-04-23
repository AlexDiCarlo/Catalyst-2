// import Glide, { Controls, Breakpoints } from '@glidejs/glide/dist/glide.modular.esm'
import {
    forwardRef,
    useEffect,
  } from 'react';
  
import Glide from "@glidejs/glide";
import { useState } from 'react';

 


const GlideContainer = forwardRef<any, any>(
  ({ children, products, content, type, id, customTemplate }, ref) => {

    // Set variables for all the different configurations settings for feeds
    let glideItems; let deskColumns; let mobileColumns; let tabletColumns; let autoPlay; let autoPlaySpeed; let glideArrows; let glideDots; let glideType; let infiniteGlide; let timingFunc 
    
    // Check if custom template is set this value is passed to the glide container currently only used for a custom 1x1 carousel
    let customClass = customTemplate != undefined && customTemplate != "" ? "!w-[300px] lg:w-[324px] p-4 bg-white" : "";
    let customGlideClass = customTemplate != undefined && customTemplate != "" ? "flex flex-col mx-auto pb-4 items-center lg:group-[.text-right]:items-end lg:group-[.text-center]:items-center lg:group-[.text-left]:items-start lg:group-[.text-right]:pr-[30px] lg:group-[.text-left]:pl-[30px]" : "";

    if (customTemplate !== undefined && customTemplate != "") { 

          glideItems = 1; deskColumns = 1; mobileColumns = 1; tabletColumns = 1; autoPlay = 0; glideArrows = false; glideDots =   false; glideType ="carousel"
    } else if (type == "feed" || type == "rec") {
          glideItems = products.total; deskColumns = 4; mobileColumns = 0; tabletColumns = 2; autoPlay = 0; glideArrows = true; glideDots = false; glideType ="carousel"
    } else if (type == "promo") {
        glideItems = children.length; deskColumns = 3; mobileColumns = 1; tabletColumns = children.length > 1 ? 2 : 1; autoPlay = 0; glideArrows = false; glideDots =   false; glideType ="carousel"    
    } else if (type == "promo-dp") {
      glideItems = children.length; deskColumns = 1; mobileColumns = 1; tabletColumns =  1; autoPlay = 4000; glideArrows = false; glideDots =  false; glideType ="carousel"    
    } else {  
        glideItems = content.reference.length; deskColumns = content.layout_desktop; mobileColumns = content.layout_mobile; tabletColumns = content.layout_tablet; autoPlay = 0; autoPlaySpeed = 0; glideArrows = content.display_arrows; glideDots = content.display_pagination; glideType ="carousel"; infiniteGlide = content.continous_scroll; timingFunc = "cubic-bezier(0.165, 0.840, 0.440, 1.000)"
    }        

    let peekValue;
    if ( mobileColumns == "0" ) {
        peekValue = { before: 0, after: 125 };
        mobileColumns = 1;
    } else {
        peekValue = "0";
        if (mobileColumns == "stack1") {
            mobileColumns = 1;
        } else if (mobileColumns == "stack2") {
            mobileColumns = 2;
        } else {
            mobileColumns != "" ? (mobileColumns = mobileColumns) : (mobileColumns = deskColumns)
        }
    }

    let tabletpeekValue;
    if ( parseInt(glideItems) > 2 && tabletColumns == "" ) {
        tabletpeekValue = "0"
        tabletColumns = "3"
    } else if (parseInt(glideItems) > 1 && tabletColumns == "") {
        tabletpeekValue = { before: 0, after: 125 };
        tabletColumns = "1";
    } else {
        tabletpeekValue = "0"
        tabletColumns != "" || typeof(tabletColumns) != undefined ? (tabletColumns = tabletColumns) : (tabletColumns = deskColumns);
    }

    const sliderConfiguration:Partial<Glide.Options>= {
        type: "carousel",
        perView: deskColumns,
        autoplay: autoPlay,
        animationDuration: 200,
        touchRatio: .2,


        breakpoints: {
            767: {
            peek: peekValue,
            perView: mobileColumns,
            },	
            1024: {
                peek: tabletpeekValue,
                perView: tabletColumns,
            },
        }
      }; 





  const [sliderInstance, setSliderInstance] = useState("");
  useEffect(() => {
      const slider = new Glide(`.glide#g${id}`, sliderConfiguration);
      slider.mount();
      setSliderInstance(id);
      return () => {
        slider.destroy();
      };
  }, []);

  return (
    <div className={`${customGlideClass} `}>
      <div className={`opacity-0 fade-in-fast  glide ${customClass} ${id == sliderInstance ? "" : "invisible max-h-[300px]"}`}  id={'g'+id}>
        <div className='glide__track' data-glide-el='track'>
          <ul className='glide__slides'>
            {children}
          </ul>
        </div>
        {glideArrows != false ?
          <div className="glide__arrows" data-glide-el="controls">
          <button title="Previous" className="glide__arrow glide__arrow--left" data-glide-dir="<"> <i className="fa-solid fa-chevron-left"></i> </button>
          <button title="Next" className="glide__arrow glide__arrow--right" data-glide-dir=">"> <i className="fa-solid fa-chevron-right"></i> </button>
          </div>
        :null
        }
      </div>
    </div>
  )
}
)




const GlideSlide = forwardRef<any, any>(
    ({children, customTemplate}, ref, ) => { 
      let count = 0; 
      let customClass = customTemplate != undefined && customTemplate != "" ? "max-w-[300px]" : "";
      return (
        <li key={count} className={`glide__slide ${customClass}`}>
          {children}
        </li>
      );
    },
  );


// export default GlideContainer
export { GlideSlide, GlideContainer }