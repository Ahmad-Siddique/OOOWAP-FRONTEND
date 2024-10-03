import AdminLayout from "@/components/AdminLayout";
import { auth } from "@/auth";
const AdminHome = async () => {
  const session = await auth();
  console.log("SESSION",session)
  return (
    <AdminLayout loginInfo={session}>
      <h1 className="text-3xl font-bold mb-4">Welcome to the Admin Panel</h1>
      <p>Use the sidebar to navigate through the admin functionalities.</p>
    </AdminLayout>
  );
};

export default AdminHome;
