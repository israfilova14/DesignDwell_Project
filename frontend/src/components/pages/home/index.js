import BannerProduct from "../banner_product"
import HorizontalCardProduct from "../product_carousel/horizontal_card_product"
import VerticalCardProduct from "../product_carousel/vertical_card_product"
import ProductCategory from "../product_category"

const Home = () => {
   return(
     <div>
        <ProductCategory/>
        <BannerProduct/>
        <HorizontalCardProduct category={'carpet'} heading={'Carpet'}/>
        <HorizontalCardProduct category={'chandelier'} heading={'Chandelier'}/>
        <HorizontalCardProduct category={'curtain'} heading={'Curtain'}/>
        <HorizontalCardProduct category={'dishes set'} heading={'Dishes Set'}/>
        <VerticalCardProduct category={'kitchen furniture'} heading={'Kitchen Furniture'}/>
        <VerticalCardProduct category={'sofa chair set'} heading={'Sofa Chair Set'}/>
        <VerticalCardProduct category={'table and chair'} heading={'Table and Chair'}/>
        <VerticalCardProduct category={'wallpaper'} heading={'Wallpaper'}/>
     </div>
   )
}

export default Home