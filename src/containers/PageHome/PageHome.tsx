import React, {useEffect, useState} from "react";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import { Helmet } from "react-helmet";
import SectionHero2 from "components/SectionHero/SectionHero2";
// import SectionSliderLargeProduct from "components/SectionSliderLargeProduct";
import SectionSliderProductCard from "components/SectionSliderProductCard";
import DiscoverMoreSlider from "components/DiscoverMoreSlider";
import SectionPromo3 from "components/SectionPromo3";
import SectionClientSay from "components/SectionClientSay/SectionClientSay";
import SectionMagazine5 from "containers/BlogPage/SectionMagazine5";
import Heading from "components/Heading/Heading";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import { useAppSelector } from "app/hooks";


function PageHome() {
  
  const fetchProducts = useAppSelector((state) => state.product.products)
  const [products, setProducts] = useState(fetchProducts);
  
  useEffect(() => {
    setProducts(fetchProducts)
  },[fetchProducts])
  
  console.log(products);
  
  return (
    <div className="nc-PageHome relative overflow-hidden">
      <Helmet>
        <title>EcoFreaky</title>
      </Helmet>

      {/* SECTION HERO */}
      <SectionHero2 />

      <div className="container relative space-y-24 my-8 md:my-12 lg:space-y-20 lg:my-14">
        
        {/* SECTION */}
        <SectionSliderProductCard
          data={products}
        />

        <div className="mt-20 lg:mt-30">
          <DiscoverMoreSlider />
        </div>


        <SectionSliderProductCard
          heading="Best Sellers"
          subHeading="Best selling of the month"
          data={[...products].reverse()}
        />
       

        {/* SECTION */}
        <SectionPromo3 />

        <div className="relative py-24 lg:py-32">
          <BackgroundSection />
          <div>
            <Heading rightDescText="From the Ciseco blog">
              The latest news
            </Heading>
            <SectionMagazine5 />
            <div className="flex mt-16 justify-center">
              <ButtonSecondary>Show all blog articles</ButtonSecondary>
            </div>
          </div>
        </div>

        {/*  */}
        <SectionClientSay />
      </div>
    </div>
  );
}

export default PageHome;
