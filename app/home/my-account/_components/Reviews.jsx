"use client";
import { useEffect, useState } from "react";
import axios from "axios";

const Reviews = ({ loginInfo }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch reviews from backend API
  const fetchReviews = async () => {
    try {
      const token = loginInfo ? loginInfo.user.token : null;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/trade/getuserreviews`,
        config
      );
      setReviews(data);
    } catch (error) {
      setError(error.response?.data?.message || "Error fetching reviews");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [loginInfo]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Your Reviews</h1>
      <div className="space-y-6">
        {reviews && reviews.length > 0 ? (
          reviews.map((review) => (
            <div
              key={review._id}
              className="bg-white shadow-lg p-4 md:p-6 rounded-md"
            >
              <h2 className="text-lg font-semibold">
                Review for {review.product.name}
              </h2>
              <div className="flex items-center mt-2">
                <img
                  src={review.product.imageUrl} // Assuming the product object has an imageUrl field
                  alt={review.product.name}
                  className="w-16 h-16 object-cover rounded-md mr-4"
                />
                <div>
                  <p className="text-gray-600">Rating: {review.rating} stars</p>
                  <p className="text-gray-800 mt-2">{review.comment}</p>
                  <p className="text-gray-500 mt-1">
                    Reviewed on:{" "}
                    {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No reviews found.</p>
        )}
      </div>
    </div>
  );
};

export default Reviews;
