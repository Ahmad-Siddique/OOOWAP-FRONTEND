import { auth } from "@/auth";
import ShopPage from "./_components/ShopPage";
import axios from "axios";

export default async function Page({ searchParams }) {
  const session = await auth(); // Handle authentication

  const {
    page=1,
    brands = "All",
    tiers = "",
    popularity = "",
    priceMin = 1,
    priceMax = 20000,
    userId = session ? session.user.id : "",
  } = searchParams;

  let users = [];
  let totalPages = 1;
  let currentPage = 1;

  // Build the query string
  const queryString = new URLSearchParams({
    brands,
    tiers,
    popularity,
    priceMin,
    priceMax,
    userId,
   
    
  }).toString();

  console.log(
    `${process.env.NEXT_PUBLIC_API_URL}/product/filtered?${queryString}&page=1`
  );
  // Fetch users from the API server-side
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/product/filtered?${queryString}&page=${page}`, // Add the params in the URL
      {
        // headers: {
        //   Authorization: `Bearer ${session?.user.token}`,
        // },
      }
    );

    users = response.data.products;
    totalPages = response.data.totalPages;
    currentPage = response.data.currentPage;
    // console.log("DETA",users)
  } catch (error) {
    console.error("Error fetching users:", error);
  }

  return (
    <ShopPage
      loginInfo={session}
      products={users}
      totalPages={totalPages}
      currentPage={currentPage}
      searchQuery={queryString}
    />
  );
}
