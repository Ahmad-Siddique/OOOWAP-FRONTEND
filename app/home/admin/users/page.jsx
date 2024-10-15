import { auth } from "@/auth";
import Users from "../components/Users";
import axios from "axios";

export default async function Page({ searchParams }) {
  const session = await auth(); // Handle authentication

  const { search = "", page = 1 } = searchParams; // Get search and pagination from the URL
  console.log("SESSION:",session)
  let users = [];
  let totalPages = 1;
  let currentPage = 1;

  // Fetch users from the API server-side
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/users`,
      {
        headers: {
          Authorization: `Bearer ${session?.user.token}`,
        },
        params: { search, page },
      }
    );

    users = response.data.users;
    totalPages = response.data.totalPages;
    currentPage = response.data.currentPage;
    // console.log(users)
  } catch (error) {
    console.error("Error fetching users:", error);
  }

  return (
    <Users
      loginInfo={session}
      users={users}
      totalPages={totalPages}
      currentPage={currentPage}
      searchQuery={search}
    />
  );
}
