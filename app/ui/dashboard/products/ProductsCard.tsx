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
    <div className="grid grid-cols-9 gap-2 items-center max-sm:grid-cols-4 shadow-custom-shadow rounded-xl mb-4 px-2 py-2">
      <div className="text-[14px] col-span-3 font-semibold text-green-600 flex gap-1 items-center max-sm:hidden justify-start">
        {product?.images.map((item, i) => (
          <ProdImg item={item} key={i} />
        ))}
      </div>
      <div className="text-[14px] font-semibold col-span-1 text-green-600">
        #{product?.id}
      </div>
      <div className="text-[14px] font-semibold col-span-1 text-green-600">
        {product?.sellingPrice}
      </div>
      <div className="text-[14px] font-semibold col-span-1 text-green-600 max-sm:hidden">
        {product?.collection}
      </div>
      <div className="text-[14px] font-semibold col-span-1 text-green-600">
        {product?.modelNumber}
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
  );
};

export default ProductsCard;
