import { auth } from "@/auth";
import ShopPage from "./_components/ShopPage"; // Adjust the import path as needed

const Shop = async () => {
  const session = await auth();

  return <ShopPage loginInfo={session} />;
};

export default Shop;
