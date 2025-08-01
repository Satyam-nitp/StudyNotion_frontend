import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { apiConnector } from "../../services/apiconnector";

const ContactAdmin = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    domain: "",
    experience: "",
    linkedin: "",
    portfolio: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const toastId = toast.loading("Sending...");
    setLoading(true);

    try {
      const dataToSend = new FormData();
      dataToSend.append("name", formData.name);
      dataToSend.append("email", formData.email);
      dataToSend.append("domain", formData.domain);
      dataToSend.append("experience", formData.experience);
      dataToSend.append("linkedin", formData.linkedin);
      dataToSend.append("portfolio", formData.portfolio);
      dataToSend.append("message", formData.message);

      const response = await apiConnector(
        "POST",
        "http://localhost:4000/api/v1/reach/contactAdmin",
        dataToSend
      );

      if (response?.data?.success) {
        toast.success("Request submitted successfully");
        setFormData({
          name: "",
          email: "",
          domain: "",
          experience: "",
          linkedin: "",
          portfolio: "",
          message: ""
        });
      } else {
        toast.error(response?.data?.message || "Failed to submit");
      }
    } catch (error) {
      console.error("Contact Admin Error:", error);
      toast.error("Something went wrong");
    } finally {
      toast.dismiss(toastId);
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[600px] mx-auto my-10 text-white">
      <h2 className="text-2xl font-semibold mb-6">Contact Admin</h2>
      <form onSubmit={handleOnSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleOnChange}
          placeholder="Full Name"
          className="form-style"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleOnChange}
          placeholder="Email Address"
          className="form-style"
          required
        />
        <input
          type="text"
          name="domain"
          value={formData.domain}
          onChange={handleOnChange}
          placeholder="Domain / Subject (e.g. Web Development)"
          className="form-style"
          required
        />
        <input
          type="number"
          name="experience"
          value={formData.experience}
          onChange={handleOnChange}
          placeholder="Experience (in years)"
          className="form-style"
          required
          min={0}
        />
        <input
          type="text"
          name="linkedin"
          value={formData.linkedin}
          onChange={handleOnChange}
          placeholder="LinkedIn Profile (optional)"
          className="form-style"
        />
        <input
          type="text"
          name="portfolio"
          value={formData.portfolio}
          onChange={handleOnChange}
          placeholder="Portfolio / Website (optional)"
          className="form-style"
        />
        <textarea
          name="message"
          value={formData.message}
          onChange={handleOnChange}
          placeholder="Write your message or proposal..."
          rows={4}
          className="form-style resize-none"
          required
        ></textarea>
        <button
          type="submit"
          className="bg-yellow-50 text-richblack-900 py-2 px-4 rounded-md font-medium mt-4"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Request"}
        </button>
      </form>
    </div>
  );
};

export default ContactAdmin;

