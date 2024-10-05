import { useRouter } from "next/navigation"; // Import useRouter for navigation

export default function MyAccProductCard({
  product,
  fetchProducts = () => {},
}) {
  const router = useRouter();

  const handleEditProduct = () => {
    // Redirect to the edit product page
    router.push(`/home/my-account/products/edit/${product._id}`);
  };

  const handleDeleteProduct = async () => {
    // Implement your delete logic here, and then call fetchProducts to refresh the product list
    // Example:
    // try {
    //   await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/product/products/${product._id}`, config);
    //   fetchProducts();
    //   toast.success("Product deleted successfully!");
    // } catch (error) {
    //   toast.error("Error deleting product!");
    // }
  };

  const handleViewQuestions = () => {
    // Redirect to the product's questions page
    router.push(`/home/my-account/products/questions/${product._id}`);
  };

  return (
    <div
      key={product._id}
      className="bg-white p-4 w-full flex flex-col md:flex-row items-center shadow-lg rounded-md"
    >
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full md:w-32 h-32 object-cover mb-4 md:mb-0 md:mr-4 rounded-md"
      />
      <div className="flex flex-col h-full">
        <h2 className="text-xl font-semibold">
          {product.name} ({product.price} {product.currency})
        </h2>
        <p className="text-gray-600">{product.tradesCount} Trades</p>

        <div className="flex items-center gap-2 mt-2">
          {/* Edit and Delete buttons */}
          <button
            onClick={handleEditProduct}
            className="bg-[#F5BA41] text-white py-2 px-4 rounded hover:bg-yellow-600 transition duration-150"
          >
            Edit
          </button>
          <button
            onClick={handleDeleteProduct}
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-150"
          >
            Delete
          </button>

          {/* Questions button */}
          <button
            onClick={handleViewQuestions}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-150"
          >
            Questions ({product.questionsCount || 0})
          </button>
        </div>
      </div>
    </div>
  );
}
