"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaEye } from "react-icons/fa";
import AdminLayout from "@/components/AdminLayout"; // Adjust the path if necessary
import {
  Pagination,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter } from "next/navigation";


const ContactPanel = ({
  loginInfo,
  contacts,
  totalPages,
  currentPage,
  searchQuery,
}) => {


//   const [contacts, setContacts] = useState([]);
  const [searchTerm, setsearchTerm] = useState("");
  const [selectedContact, setSelectedContact] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
 const router = useRouter();
  // Fetch contacts from backend
//   const fetchContacts = async (query = "") => {
//     try {
//       const data = JSON.parse(localStorage.getItem("ooowap-user"));
//       const config = {
//         headers: {
//           Authorization: `Bearer ${data?.token}`,
//         },
//       };
//       const response = await axios.get(
//         `${process.env.NEXT_PUBLIC_API_URL}/contact`,
//         {
//           headers: config.headers,
//           params: {
//             search: query,
//           },
//         }
//       );
//       setContacts(response.data);
//     } catch (error) {
//       console.error("Error fetching contacts:", error);
//     }
//   };

//   useEffect(() => {
//     fetchContacts(); // Fetch all contacts on initial load
//   }, []);

  const handleSearch = (e) => {
    e.preventDefault(); // Prevent default form submission
    // fetchContacts(searchTerm); // Fetch contacts based on search query
  };

  const openModal = (contact) => {
    setSelectedContact(contact);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedContact(null);
    };
    

    const handleSearchSubmit = (e) => {
      e.preventDefault();
      const query = e.target.search.value; // Get the search query value
      router.push(`/home/admin/contact?search=${query}&page=1`); // Navigate to the first page with the search query
    };

    // Handle pagination
    const handlePageChange = (newPage) => {
      router.push(`/home/admin/contact?search=${searchQuery}&page=${newPage}`); // Maintain search query and change page
    };

  return (
    <AdminLayout>
      <h2 className="text-2xl font-bold mb-4">Contact Us Management</h2>

      {/* Search form */}
      <form onSubmit={handleSearchSubmit} className="flex space-x-2 mb-4">
        <input
          type="text"
          name="search"
          placeholder="Search contacts by name"
          className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#D5B868]"
          value={searchTerm}
          onChange={(e) => setsearchTerm(e.target.value)} // Update search query on input change
        />
        <button
          type="submit"
          className="bg-[#D5B868] text-white py-2 px-4 rounded-md flex items-center space-x-2"
        >
          Search
        </button>
      </form>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-[#C79B44] text-white">
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Message</th>
              <th className="py-2 px-4">Created At</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact._id} className="border-b">
                <td className="text-center py-2 px-4">{contact.name}</td>
                <td className="text-center py-2 px-4">{contact.email}</td>
                <td className="text-center py-2 px-4">
                  {contact.message.slice(0, 30)}...
                </td>
                <td className="text-center py-2 px-4">
                  {new Date(contact.createdAt).toLocaleDateString()}
                </td>
                <td className="text-center justify-center py-2 px-4 flex space-x-2">
                  <button
                    onClick={() => openModal(contact)}
                    className="flex items-center space-x-1 px-3 py-2 text-sm font-semibold text-white bg-[#D5B868] rounded-lg hover:bg-[#b79355] transition-all duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#b79355]"
                  >
                    <FaEye className="mr-1" /> <span>View</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Pagination className="mt-5 flex justify-center items-center space-x-2">
          {/* Previous Button */}
          <PaginationPrevious>
            <button
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              className={`px-3 py-2 border rounded ${
                currentPage === 1
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-white hover:bg-gray-100"
              }`}
              disabled={currentPage === 1}
            >
              Previous
            </button>
          </PaginationPrevious>

          {/* Page Numbers */}
          {[...Array(totalPages)].map((_, index) => (
            <PaginationItem key={index}>
              <button
                onClick={() => handlePageChange(index + 1)}
                className={`px-3 py-2 border rounded ${
                  currentPage === index + 1
                    ? "bg-[#C79B44] text-white font-bold"
                    : "bg-white hover:bg-gray-100"
                }`}
              >
                {index + 1}
              </button>
            </PaginationItem>
          ))}

          {/* Next Button */}
          <PaginationNext>
            <button
              onClick={() =>
                handlePageChange(Math.min(totalPages, currentPage + 1))
              }
              className={`px-3 py-2 border rounded ${
                currentPage === totalPages
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-white hover:bg-gray-100"
              }`}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </PaginationNext>
        </Pagination>
      </div>

      {/* Modal for Contact Details */}
      {selectedContact && isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3 p-6 relative">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
              Contact Details
            </h2>
            <div className="mb-4">
              <p className="text-gray-700">
                <strong>Name:</strong> {selectedContact.name}
              </p>
              <p className="text-gray-700">
                <strong>Email:</strong> {selectedContact.email}
              </p>
              <p className="text-gray-700 mt-2">
                <strong>Message:</strong>
                <br />
                {selectedContact.message}
              </p>
              <p className="text-gray-500 mt-2">
                <strong>Created At:</strong>{" "}
                {new Date(selectedContact.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="flex justify-center mt-4">
              <button
                onClick={closeModal}
                className="px-6 py-2 bg-[#D5B868] text-white rounded-lg shadow-md hover:bg-[#b79355] transition-all duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default ContactPanel;
