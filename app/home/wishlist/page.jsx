import { auth } from "@/auth";
import Wishlist from "./_components/Wishlist";

export default async function page() {
  const session = await auth();
  return <Wishlist loginInfo={session} />;
}
