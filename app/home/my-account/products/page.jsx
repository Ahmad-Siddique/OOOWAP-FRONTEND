import { auth } from "@/auth";
import Products from "../_components/Products";

export default async function Page() {
  const session = await auth();
  return <Products loginInfo={session} />;
}
