import { auth } from "@/auth";
import axios from "axios";
import UserStore from "./component/UserStore";

const userproducts = async (id) => {
  const data = await axios.get(
    process.env.NEXT_PUBLIC_API_URL + "/product/store/" + id
  );
  return data.data;
};
const Page = async ({ params }) => {
  const session = await auth();
  
  const products = await userproducts(params.id);
  console.log(products)
  return (
    <UserStore
      loginInfo={session}
      userInfo={products.userInfo}
      products={products.products}
    />
  );
};

export default Page;
