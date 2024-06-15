import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiGetproduct } from '../../apis';
import { Breadcrumb, Button, SelectQuantity, Comment } from '../../components';
import Slider from 'react-slick';
import ReactImageMagnify from 'react-image-magnify';
import Similar from '../../components/products/Similar'; 
import { formatMoney } from '../../ultils/helpers';

const sliderSettings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
};

const DetailProduct = () => {
  const { pid, title } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [currentImage, setCurrentImage] = useState(null);
  const [ids, setids] = useState(null);
  const [update, setupdate] = useState(false)
  const fetchProductData = async () => {
    const response = await apiGetproduct(pid);
    if (response.success) {
      setProduct(response.Product);
      setCurrentImage(response.Product.images[0]);
      setids(response.Product._id);
    }
  };

  useEffect(() => {
    if (pid) fetchProductData();
    window.scrollTo(0, 0);
  }, [pid]);

  useEffect(() => {
    if (pid) fetchProductData();
  }, [update]);

  const rerender = useCallback(() => {
    setupdate(!update)
  },[update])
  const handleQuantity = useCallback((number) => {
    if (!Number(number) || Number(number) < 1) {
      return;
    } else {
      setQuantity(number);
    }
  }, []);

  const handleChangeQuantity = useCallback((flag) => {
    if (flag === 'minus' && quantity > 1) {
      setQuantity((prev) => prev - 1);
    } else if (flag === 'plus') {
      setQuantity((prev) => prev + 1);
    }
  }, [quantity]);

  const handleClickImage = (e, el) => {
    e.stopPropagation();
    setCurrentImage(el);
  };

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
                <ReactImageMagnify
                  {...{
                    smallImage: {
                      alt: '',
                      isFluidWidth: true,
                      src: currentImage,
                    },
                    largeImage: {
                      src: currentImage,
                      width: 800,
                      height: 1200,
                    },
                  }}
                />
              </div>
              <div className='w-[458px] mt-4'>
                <Slider {...sliderSettings}>
                  {product.images.map((el) => (
                    <div className='flex w-full justify-around flex-col' key={el}>
                      <img
                        onClick={(e) => handleClickImage(e, el)}
                        src={el}
                        alt='sub-product'
                        className='h-[160px] w-[144px] object-cover border-gray-300 border rounded-[5px] cursor-pointer'
                      />
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
            <div className='flex-5 ml-4'>
              <div className='flex'>
                <h1 className='text-[25px] font-semibold text-red-500 w-[70%]'>{`${formatMoney(product.price)} VND`}</h1>
                <span className='text-red-500 text-sm pt-2'>{`Kho: ${product.quantity}`}</span>
              </div>
              <h2 className='p-4 text-[18px] font-medium'>Thông tin sản phẩm</h2>
              <ul className='list-square text-sm text-gray-500 pl-8'>
                {product.description.map((el) => (
                  <li key={el}>{el}</li>
                ))}
              </ul>
              <div className='text-sm flex flex-col gap-8'>
                <SelectQuantity quantity={quantity} handleQuantity={handleQuantity} handleChangeQuantity={handleChangeQuantity} />
                <Button fw>
                  Add to Cart
                </Button>
              </div>
            </div>
            <div className='w-1/4'>
              {/* Other product details can go here */}
            </div>
          </>
        )}
      </div>
      <div className='w-main m-auto mt-4'>
        <Comment 
        title={product?.title} 
        total={product?.totalRatings} 
        ratings={product?.ratings} 
        pid={ids}
        rerender = {rerender} />
      </div>
      <div className='w-main m-auto mt-4'>
        <h3 className='font-semibold flex text-gray-800 text-[30px] pb-4 border-b-2 border-main'>Sản phẩm tương tự</h3>
        <Similar category={product?.category} />
      </div>
    </div>
  );
};

export default DetailProduct;
