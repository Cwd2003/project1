import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ApiServices from "../../ApiServices";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UpdateReview() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {
    ApiServices.GetSingleReview({ _id: id })
      .then((res) => {
        if (res.data.success) {
          const rev = res.data.data;
          setRating(rev.rating);
          setComment(rev.comment);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch(() => toast.error("Failed to load review"));
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!rating || !comment) {
      toast.warn("All fields are required!");
      return;
    }

    ApiServices.UpdateReview({ _id: id, rating, comment })
      .then((res) => {
        if (res.data.success) {
          toast.success("Review updated successfully!");
          setTimeout(() => navigate("/admin/review"), 1500);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch(() => toast.error("Error updating review"));
  };

  return (
    <div className="container mt-4">
      <ToastContainer />
      <h3 className="text-center mb-3">Update Review</h3>

      <form onSubmit={handleUpdate} className="shadow p-4 col-md-6 offset-md-3">
        <div className="mb-3">
          <label className="form-label">Rating</label>
          <input
            type="number"
            className="form-control"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            min="1"
            max="5"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Comment</label>
          <textarea
            className="form-control"
            rows="3"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Update Review
        </button>
      </form>
    </div>
  );
}
