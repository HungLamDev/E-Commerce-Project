import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiGetproduct } from '../../apis';
import { Breadcrumb } from '../../components';
import Slider from "react-slick";
import ReactImageMagnify from 'react-image-magnify';

var settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1
};

const DetailProduct = () => {
  const { pid, title } = useParams();
  const [product, setProduct] = useState(null);

  const fetchProductData = async () => {
    const response = await apiGetproduct(pid);
    if (response.success) {
      setProduct(response.Product);
    }
  };

  useEffect(() => {
    if (pid) fetchProductData();
  }, [pid]);

  return (
    <div className='w-full pt-2'>
      <div className='h-[81px] flex items-center justify-center bg-gray-100'>
        <div className='w-main'>
          {title}
          <Breadcrumb title={title} category={product?.category} />
        </div>
      </div>
      <div className='w-main m-auto mt-5 flex'>
        {product && (
          <>
            <div className='flex-col gap-4 w-2/5'>
              <div className='h-[458px] w-[458px] border'>
                <ReactImageMagnify {...{
                    smallImage: {
                        alt: 'Wristwatch by Ted Baker London',
                        isFluidWidth: true,
                        src: product.images
                    },
                    largeImage: {
                        src: product.images,
                        width: 800,
                        height: 1200,
                        
                    }
                }} />
              </div>
              <div className='w-[458px] mt-4'>
                <Slider {...settings}>
                  {product?.images?.map(el =>(
                    <div className='flex w-full justify-around flex-col'>
                      <img  src={el} alt='sub-product' className='h-[160px] w-[144px] object-cover border-gray-300 border rounded-[5px]'/>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
            <div className='flex-5 ml-4'>
              <h1 className='text-[25px]'>{product.title}</h1>
              <p>Price: {product.price}</p>
            </div>
          </>
        )}
      </div>
      <div className='w-main m-auto mt-4'>Information</div>
    </div>
  );
};

export default DetailProduct;
