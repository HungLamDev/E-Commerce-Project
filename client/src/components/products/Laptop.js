import React, { useState, useEffect } from "react";
import { apiGetProducts } from "../../apis/product";
import Product from "../products/Productbanner";

const Laptop = () => {
  const [Laptop, setLaptop] = useState([]);
  const fetchLaptop = async () => {
    try {
      const response = await apiGetProducts({ limit: 10, category: "Laptop" });
      if (response?.success) {
        setLaptop(response.Products);
      }
    } catch (error) {
      console.error("Error fetching Laptop:", error);
    }
  };

  useEffect(() => {
    fetchLaptop();
  }, []);

  return (
    <div className="w-full text-base px-[10px] pr-2">
      <h3 className="font-semibold flex text-gray-800 text-[30px] pb-4 border-b-2 border-main">
        Laptop
      </h3>
      <div className="mt-4 mx-[-10px] flex flex-wrap">
        {Laptop?.map((product, index) => (
          <div key={index} className="w-1/5 px-2 mb-4">
            <Product
              key={product.id}
              pid={product.id}
              productData={product}
              isNew={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Laptop;
