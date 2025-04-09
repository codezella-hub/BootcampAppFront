
import Header from "./commun/Header.jsx";
import Banner from "./commun/homeComponent/banner.jsx";
import Brand from "./commun/homeComponent/brand.jsx";
import About from "./commun/homeComponent/about.jsx";
import Category from "./commun/homeComponent/category.jsx";
import Course from "./commun/homeComponent/course.jsx";
import Section from "./commun/homeComponent/section.jsx";
import Events from "./commun/homeComponent/events.jsx";
import Facts from "./commun/homeComponent/facts.jsx";
import Insctructors from "./commun/homeComponent/insctructors.jsx";
import Feedback from "./commun/homeComponent/feedback.jsx";
import Blog from "./commun/homeComponent/blog.jsx";
import Cart from "./commun/Cart.jsx";
import FooterPrinciple from "./commun/FooterPrinciple.jsx";
import Header2 from "./commun/Header2.jsx";
import BackTo from "./commun/backTo.jsx";
import SearchBox from "./commun/SearchBox.jsx";


function Home() {
  return (
   <div>    {/* banner area start */}

    <Banner/>
  {/* banner area end */}
  {/* brand area start */}
 <Brand/>
  {/* brand area end */}
  {/* about area start */}
   <About></About>
  {/* about area end */}
  {/* category area start */}
  <Category/>
  {/* category area end */}
  {/* course area start */}
 <Course/>
  {/* course area end */}
  {/* why choose us section area start */}
<Section/>
  {/* why choose us section area end */}
  {/* up coming events area start */}
<Events/>
  {/* up coming events area end */}
  {/* fun facts area start */}
   <Facts/>
  {/* fun facts area end */}
  {/* instructor area start */}
 <Insctructors/>
  {/* instructor area start */}
  {/* feedback area start */}
 <Feedback/>
  {/* feedback area end */}
  {/* rts blog area start */}
<Blog/>
  {/* rts blog area end */}


</div>
  );
}

export default Home;