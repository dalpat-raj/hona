import { Product } from "@/lib/definations";
import { formatDate } from "@/lib/helpers";
import ProdImg from "@/app/ui/dashboard/products/ProdImg";
import { AiOutlineDelete } from "react-icons/ai";

type Props = {
  product: Product;
  handleDelete: any;
};

const ProductsCard = ({ product, handleDelete }: Props) => {

  return (
      <div className="shadow-custom-shadow rounded-xl my-2 p-2 bg-white">
        {product?.variants.map((item, i) => (
          <div className="mb-4 grid grid-cols-9 items-center gap-2 max-sm:grid-cols-4">
            <div className="col-span-3 max-sm:hidden">
              <ProdImg item={item?.images} key={i} />
            </div>
            <div className="text-[14px] font-semibold col-span-1 text-green-600">
              #{product?.id.slice(0,4)}...
            </div>
            <div className="text-[14px] font-semibold col-span-1 text-green-600">
              ₹ {item?.sellingPrice}
            </div>
            <div className="text-[14px] font-semibold col-span-1 text-green-600 max-sm:hidden">
              {product?.collection}
            </div>
            <div className="text-[14px] font-semibold col-span-1 text-green-600">
              {item?.modelNumber}
            </div>
            <div className="text-[14px] font-semibold col-span-1 text-green-600">
              {formatDate(new Date(product?.createdAt))}
            </div>
            <div className="text-[14px] col-span-1 text-green-600 max-sm:hidden ">
              <form onSubmit={handleDelete}>
                <input
                  type="text"
                  readOnly
                  name="id"
                  value={product?.id}
                  className="hidden"
                />
                <div className="w-20 h-8">
                  <button
                    type="submit"
                    className="flex justify-center items-center text-red-500 px-4 py-2"
                  >
                    <AiOutlineDelete size={20} />
                  </button>
                </div>
              </form>
            </div>
          </div>
        ))}
      </div>
  );
};

export default ProductsCard;
