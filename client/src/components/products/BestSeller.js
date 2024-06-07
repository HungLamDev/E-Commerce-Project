import React, { useEffect, useState } from "react";
import { apiGetProducts } from "../../apis/product";
import { Product } from "..";
import Slider from "react-slick";

const tabs = [
  { id: 1, name: "best seller" },
  { id: 2, name: "new nerivas" },
];

// react slick
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
};

const BestSeller = () => {
  const [bestSellers, setBestSeller] = useState(null);
  const [newProducts, setNewProducts] = useState(null);
  const [activedTab, setActivedTab] = useState(1);
  const [products, setProducts] = useState(null);

  const fetchProducts = async () => {
    const response = await Promise.all([
      apiGetProducts({ sort: "-sold" }),
      apiGetProducts({ sort: "-createdAt" }),
    ]);
    if (response[0]?.success) {
      setBestSeller(response[0].Products);
      setProducts(response[0].Products);
    }
    if (response[1]?.success) setNewProducts(response[1].Products);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (activedTab === 1) setProducts(bestSellers);
    if (activedTab === 2) setProducts(newProducts);
    // Thay đổi key để Slider render lại khi products thay đổi
  }, [activedTab, bestSellers, newProducts]);

  return (
    <div>
      <div className="flex text-[20px]  gap-8 pb-4 border-b-2 border-orange-600">
        {tabs.map((el) => (
          <span
            key={el.id}
            className={`font-semibold capitalize pr-6 cursor-pointer border-r-2 text-gray-400 ${
              activedTab === el.id ? "text-gray-900" : ""
            }`}
            onClick={() => setActivedTab(el.id)}
          >
            {el.name}
          </span>
        ))}
      </div>
      <div className="mt-4 mx-[-10px]">
        <Slider {...settings}>
          {products?.map((el, index) => (
            <Product
              key={el.id || index} // Use index as a fallback key if el.id is undefined
              pid={el.id}
              productData={el}
              isNew={activedTab === 1 ? false : true}
            />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default BestSeller;
