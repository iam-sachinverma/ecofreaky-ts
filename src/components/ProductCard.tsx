import React, { FC } from "react";
import { Link } from "react-router-dom";
import NcImage from "shared/NcImage/NcImage";
import LikeButton from "./LikeButton";
import Prices from "./Prices";
import { ArrowsPointingOutIcon } from "@heroicons/react/24/outline";
import { Product, PRODUCTS } from "data/data";
import { StarIcon } from "@heroicons/react/24/solid";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import BagIcon from "./BagIcon";
import toast from "react-hot-toast";
import { Transition } from "@headlessui/react";
import ModalQuickView from "./ModalQuickView";
import ProductStatus from "./ProductStatus";
import IconDiscount from "./IconDiscount";
import {
  NoSymbolIcon,
  ClockIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

export interface ProductCardProps {
  className?: string;
  // data?: Product;
  data?: any;
  isLiked?: boolean;
}

const ProductCard: FC<ProductCardProps> = ({
  className = "",
  data,
  isLiked,
}) => {
  
  const {
    id,
    name,
    price,
    short_description,
    sizes,
    variants,
    variantType,
    status,
  } = data;  

  
  const [variantActive, setVariantActive] = React.useState(0);
  const [showModalQuickView, setShowModalQuickView] = React.useState(false);

  const renderStatus = () => {
    if (!data) {
      return null;
    }
    const CLASSES = `nc-shadow-lg rounded-full flex items-center justify-center absolute top-3 left-3 px-2.5 py-1.5 text-xs bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300`;
    if (data?.featured === true) {
      return (
        <div className={CLASSES}>
          <SparklesIcon className="w-3.5 h-3.5" />
          <span className="ml-1 leading-none">Best Seller</span>
        </div>
      );
    }
    if (data?.on_sale === true) {
      return (
        <div className={CLASSES}>
          <IconDiscount className="w-3.5 h-3.5" />
          <span className="ml-1 leading-none">On Sale</span>
        </div>
      );
    }
    if (data?.stock_status === 'outstock') {
      return (
        <div className={CLASSES}>
          <NoSymbolIcon className="w-3.5 h-3.5" />
          <span className="ml-1 leading-none">Sold Out</span>
        </div>
      );
    }
    // if (status === "limited edition") {
    //   return (
    //     <div className={CLASSES}>
    //       <ClockIcon className="w-3.5 h-3.5" />
    //       <span className="ml-1 leading-none">{status}</span>
    //     </div>
    //   );
    // }
    return null;
  };

  // const notifyAddTocart = ({ size }: { size?: string }) => {
  //   toast.custom(
  //     (t) => (
  //       <Transition
  //         appear
  //         show={t.visible}
  //         className="p-4 max-w-md w-full bg-white dark:bg-slate-800 shadow-lg rounded-2xl pointer-events-auto ring-1 ring-black/5 dark:ring-white/10 text-slate-900 dark:text-slate-200"
  //         enter="transition-all duration-150"
  //         enterFrom="opacity-0 translate-x-20"
  //         enterTo="opacity-100 translate-x-0"
  //         leave="transition-all duration-150"
  //         leaveFrom="opacity-100 translate-x-0"
  //         leaveTo="opacity-0 translate-x-20"
  //       >
  //         <p className="block text-base font-semibold leading-none">
  //           Added to cart!
  //         </p>
  //         <div className="border-t border-slate-200 dark:border-slate-700 my-4" />
  //         {renderProductCartOnNotify({ size })}
  //       </Transition>
  //     ),
  //     { position: "top-right", id: "nc-product-notify", duration: 3000 }
  //   );
  // };

  const renderProductCartOnNotify = ({ size }: { size?: string }) => {
    return (
      <div className="flex ">
        <div className="h-24 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
          <img
            src={data?.images[0].src}
            alt={name}
            className="h-full w-full object-cover object-center"
          />
        </div>

        <div className="ml-4 flex flex-1 flex-col">
          <div>
            <div className="flex justify-between ">
              <div>
                <h3 className="text-base font-medium ">{name}</h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  <span>
                    {variants ? variants[variantActive].name : `Natural`}
                  </span>
                  <span className="mx-2 border-l border-slate-200 dark:border-slate-700 h-4"></span>
                  <span>{size || "XL"}</span>
                </p>
              </div>
              <Prices price={price} className="mt-0.5" />
            </div>
          </div>
          <div className="flex flex-1 items-end justify-between text-sm">
            <p className="text-gray-500 dark:text-slate-400">Qty 1</p>

            <div className="flex">
              <button
                type="button"
                className="font-medium text-primary-6000 dark:text-primary-500 "
              >
                View cart
              </button>
            </div>
          </div>
        </div>
      </div>  
    );
  };

  // const getBorderClass = (Bgclass = "") => {
  //   if (Bgclass.includes("red")) {
  //     return "border-red-500";
  //   }
  //   if (Bgclass.includes("violet")) {
  //     return "border-violet-500";
  //   }
  //   if (Bgclass.includes("orange")) {
  //     return "border-orange-500";
  //   }
  //   if (Bgclass.includes("green")) {
  //     return "border-green-500";
  //   }
  //   if (Bgclass.includes("blue")) {
  //     return "border-blue-500";
  //   }
  //   if (Bgclass.includes("sky")) {
  //     return "border-sky-500";
  //   }
  //   if (Bgclass.includes("yellow")) {
  //     return "border-yellow-500";
  //   }
  //   return "border-transparent";
  // };

  // const renderVariants = () => {
  //   if (!variants || !variants.length || !variantType) {
  //     return null;
  //   }

  //   if (variantType === "color") {
  //     return (
  //       <div className="flex space-x-1">
  //         {variants.map((variant, index) => (
  //           <div
  //             key={index}
  //             onClick={() => setVariantActive(index)}
  //             className={`relative w-6 h-6 rounded-full overflow-hidden z-10 border cursor-pointer ${
  //               variantActive === index
  //                 ? getBorderClass(variant.color)
  //                 : "border-transparent"
  //             }`}
  //             title={variant.name}
  //           >
  //             <div
  //               className={`absolute inset-0.5 rounded-full z-0 ${variant.color}`}
  //             ></div>
  //           </div>
  //         ))}
  //       </div>
  //     );
  //   }

  //   return (
  //     <div className="flex ">
  //       {variants.map((variant, index) => (
  //         <div
  //           key={index}
  //           onClick={() => setVariantActive(index)}
  //           className={`relative w-11 h-6 rounded-full overflow-hidden z-10 border cursor-pointer ${
  //             variantActive === index
  //               ? "border-black dark:border-slate-300"
  //               : "border-transparent"
  //           }`}
  //           title={variant.name}
  //         >
  //           <div className="absolute inset-0.5 rounded-full overflow-hidden z-0">
  //             <img
  //               src={variant.thumbnail}
  //               alt="variant"
  //               className="absolute w-full h-full object-cover"
  //             />
  //           </div>
  //         </div>
  //       ))}
  //     </div>
  //   );
  // };

  const renderGroupButtons = () => {
    return (
      <div className="absolute bottom-0 group-hover:bottom-4 inset-x-1 flex justify-center opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
        <a href={`product/${id}`}>
          <ButtonPrimary
            className="shadow-lg"
            fontSize="text-xs"
            sizeClass="py-2 px-4"
            // onClick={() => notifyAddTocart({ size: "XL" })}
          >
            <BagIcon className="w-3.5 h-3.5 mb-0.5" />
            <span className="ml-1">View Product</span>
          </ButtonPrimary>
        </a>
        <ButtonSecondary
          className="ml-1.5 bg-white hover:!bg-gray-100 hover:text-slate-900 transition-colors shadow-lg"
          fontSize="text-xs"
          sizeClass="py-2 px-4"
          onClick={() => setShowModalQuickView(true)}
        >
          <ArrowsPointingOutIcon className="w-3.5 h-3.5" />
          <span className="ml-1">Quick view</span>
        </ButtonSecondary>
      </div>
    );
  };

  // const renderSizeList = () => {
  //   if (!sizes || !sizes.length) {
  //     return null;
  //   }

  //   return (
  //     <div className="absolute bottom-0 inset-x-1 space-x-1.5 flex justify-center opacity-0 invisible group-hover:bottom-4 group-hover:opacity-100 group-hover:visible transition-all">
  //       {sizes.map((size, index) => {
  //         return (
  //           <div
  //             key={index}
  //             className="nc-shadow-lg w-10 h-10 rounded-xl bg-white hover:bg-slate-900 hover:text-white transition-colors cursor-pointer flex items-center justify-center uppercase font-semibold tracking-tight text-sm text-slate-900"
  //             onClick={() => notifyAddTocart({ size })}
  //           >
  //             {size}
  //           </div>
  //         );
  //       })}
  //     </div>
  //   );
  // };

  return (
    <>
      <div
        className={`nc-ProductCard relative flex flex-col bg-transparent ${className}`}
        data-nc-id="ProductCard"
      >
        <Link to={`/product/${id}`} className="absolute inset-0"></Link>

        <div className="relative flex-shrink-0 bg-slate-50 dark:bg-slate-300 rounded-3xl overflow-hidden z-1 group">
          <Link to={`/product/${id}`} className="block">
            <NcImage
              containerClassName="flex aspect-w-11 aspect-h-12 w-full h-0"
              src={data?.images?.[0]?.src}
              className="object-cover w-full h-full drop-shadow-xl"
            />
          </Link>

          

          { renderStatus() }

          {/* <ProductStatus status={status} /> */}

          {/* Liked Product */}
          {/* <LikeButton liked={isLiked} className="absolute top-3 right-3 z-10" /> */}

          {/* {sizes ? renderSizeList() : renderGroupButtons()} */}

          { renderGroupButtons() }
        </div>  

        <div className="space-y-4 px-2.5 pt-5 pb-2.5">
          {/* {renderVariants()} */}

          <div>
            <h2
              className={`nc-ProductCard__title text-base font-semibold transition-colors`}
            >
              {name}
            </h2>
            {/* <p className={`text-sm text-slate-500 dark:text-slate-400 mt-1 `} 
            dangerouslySetInnerHTML={{__html: short_description}}>
            </p> */}
          </div>

          <div className="flex justify-between items-end ">
            <Prices price={+price} />
            <div className="flex items-center mb-0.5">
              <StarIcon className="w-5 h-5 pb-[1px] text-amber-400" />
              <span className="text-sm ml-1 text-slate-500 dark:text-slate-400">
                {(Math.random() * 1 + 4).toFixed(1)} (
                {Math.floor(Math.random() * 70 + 20)} reviews)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* QUICKVIEW */}
      <ModalQuickView
        show={showModalQuickView}
        onCloseModalQuickView={() => setShowModalQuickView(false)}
        data={data}
      />
    </>
  );
};

export default ProductCard;
