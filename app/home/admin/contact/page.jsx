"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaEye, FaTrash } from "react-icons/fa";
import AdminLayout from "../../../components/AdminLayout"; // Adjust the path if necessary

const ContactPanel = () => {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/contact`
        );
        setContacts(response.data);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };

    fetchContacts();
  }, []);

  const handleDelete = async (contactId) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/contact/${contactId}`
      );
      setContacts(contacts.filter((contact) => contact._id !== contactId));
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  const openModal = (contact) => {
    setSelectedContact(contact);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedContact(null);
  };

  return (
    <AdminLayout>
      <h2 className="text-2xl font-bold mb-4">Contact Us Management</h2>
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
                    className="btn bg-[#D5B868] flex items-center space-x-1"
                  >
                    <FaEye /> <span>View</span>
                  </button>
                  {/* <button
                    onClick={() => handleDelete(contact._id)}
                    className="btn btn-danger flex items-center space-x-1"
                  >
                    <FaTrash /> <span>Delete</span>
                  </button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Contact Details */}
      {selectedContact && isModalOpen && (
        <div>
          <input
            type="checkbox"
            id="contact-modal"
            className="modal-toggle"
            checked={isModalOpen}
            onChange={() => setIsModalOpen(!isModalOpen)}
          />
          <label htmlFor="contact-modal" className="modal cursor-pointer">
            <label className="modal-box relative" htmlFor="">
              <h2 className="text-xl font-bold mb-4">Contact Details</h2>
              <p>
                <strong>Name:</strong> {selectedContact.name}
              </p>
              <p>
                <strong>Email:</strong> {selectedContact.email}
              </p>
              <p>
                <strong>Message:</strong>
                <br />
                {selectedContact.message}
              </p>
              <p>
                <strong>Created At:</strong>{" "}
                {new Date(selectedContact.createdAt).toLocaleDateString()}
              </p>
              <div className="flex justify-end mt-4">
                <label htmlFor="contact-modal" className="btn btn-secondary">
                  Close
                </label>
              </div>
            </label>
          </label>
        </div>
      )}
    </AdminLayout>
  );
};

export default ContactPanel;
