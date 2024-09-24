import { StarFilledIcon } from "@radix-ui/react-icons";
import FeatureProductModal from "@/components/modals/FeatureProductModal";
import DeleteProductModal from "@/components/modals/DeleteProductModal";
import AddEditProductModal from "@/components/modals/AddEditProductModal";

export default function MyAccProductCard({
  product,
  fetchProducts = () => {},
  editProduct,
  handleSubmit = () => {},
  formData = {},
  handleInputChange = () => {},
  categories,
  handleFileChange = () => {},
  imagePreview,
  isSubmitting,
}) {
  return (
    <div
      key={product._id}
      className="bg-white p-4 w-full flex flex-col md:flex-row items-center"
    >
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full md:w-32 h-32 object-cover mb-4 md:mb-0 md:mr-4"
      />
      <div className="flex flex-col h-full">
        <h2 className="text-xl font-semibold">
          {product.name} ({product.price})
        </h2>
        <p className="text-gray-600">{product.tradesCount} Trades</p>
        <div className="flex items-center gap-1">
          <AddEditProductModal
            editProduct={true}
            handleSubmit={handleSubmit}
            formData={formData}
            handleInputChange={handleInputChange}
            categories={categories}
            imagePreview={imagePreview}
            handleFileChange={handleFileChange}
          />
          <FeatureProductModal />
          <DeleteProductModal fetchProducts={fetchProducts} />
        </div>
        <div className="flex items-center gap-1 text-gray-600">
          <StarFilledIcon className="h-5 w-5 text-gray-400" />
          <StarFilledIcon className="h-5 w-5 text-gray-400" />
          <StarFilledIcon className="h-5 w-5 text-gray-400" />
          <StarFilledIcon className="h-5 w-5 text-gray-400" />
          <StarFilledIcon className="h-5 w-5 text-gray-400" />
          <span>(0)</span>
        </div>
      </div>
    </div>
  );
}
