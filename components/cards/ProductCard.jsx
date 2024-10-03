import {
  ChevronRightIcon,
  ClipboardCopyIcon,
  ClipboardIcon,
  HeartFilledIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";

const ProductCard = ({
  product,
  addToWishList = () => {},
  isProductinWishlist = () => {},
}) => {
  return (
    <Link href={`/home/shop/${product.productNumber}`} passHref key={product.productNumber}>
      <div className="cursor-pointer flex flex-col">
        <div
          className="h-88  relative"
          style={{
            backgroundImage: `url(${product.imageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "top",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="absolute inset-0 flex items-center group transition-all ease-in duration-150 justify-center hover:bg-primary/60">
            <ClipboardIcon className="h-8 w-8 text-black opacity-0 group-hover:opacity-100 transition-all ease-in duration-150" />
          </div>
          <button
            onClick={(e) => {
              e.preventDefault(); // Prevent Link from triggering
              addToWishList(product._id);
            }}
            className="absolute top-4 left-4"
          >
            <HeartFilledIcon
              className={`h-6 w-6 ${
                isProductinWishlist(product._id) ? "text-[#DC3232]" : "text-[#8B8B8B]"
              }`}
            />
          </button>
        </div>
        <div className="flex flex-col py-2">
          <p className="text-sm font-medium">{product?.brand ? product.brand : "Other"}</p>
          <p className="text-lg font-medium mb-1">{product.name}</p>
          <p className="text-sm font-light mb-0.5 text-gray-600 ">
            By:{" "}
            <span className="">
              {product.userId.firstName} {product.userId.lastName}
            </span>
          </p>
          <p className="text-sm">${product.price}</p>
          <button className="mt-4 w-fit flex items-center gap-1 bg-black group text-white py-2 text-xl font-light pl-5 pr-4">
            Trade
            <ChevronRightIcon className="h-5 w-0 group-hover:w-5 transition-all ease-in duration-150" />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
