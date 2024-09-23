import AdminLayout from "@/components/AdminLayout";

const AdminHome = () => {
  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-4">Welcome to the Admin Panel</h1>
      <p>Use the sidebar to navigate through the admin functionalities.</p>
    </AdminLayout>
  );
};

export default AdminHome;
