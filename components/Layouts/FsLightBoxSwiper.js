import FsLightbox from "fslightbox-react";

function FsLightBoxSwiper({images , toggler}) {

        return(
            <>
             <FsLightbox
        toggler={ toggler }
        sources={ [
          'https://www.youtube.com/embed/bk7McNUjWgw'
        ] }
      />

        </>
        )
} 


export default FsLightBoxSwiper;