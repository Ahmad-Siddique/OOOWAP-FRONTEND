import { auth } from "@/auth";
import Products from "../../../_components/EditProduct";

export default async function Page({ params }) {
  const session = await auth();
  return <Products loginInfo={session} params={params} />;
}
