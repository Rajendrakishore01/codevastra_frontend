import { useState } from "react";
import axios from "axios";

const API_BASE = "http://localhost:5000";

const ADMIN_FEE = 20;

export default function RegistrationModal({ open, onClose, eventName }) {
  const [form, setForm] = useState({
    fullName: "",
    rollNumber: "",
    address: "",
    collegeName: "",
    branch: "",
    section: "",
    email: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = "Required";
    if (!form.rollNumber.trim()) e.rollNumber = "Required";
    if (!form.email.trim()) e.email = "Required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Invalid email";
    if (!form.collegeName.trim()) e.collegeName = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);

      const { data } = await axios.post(
        `${API_BASE}/api/registrations/create-order`,
        {
          ...form,
          eventName,
        }
      );

      const options = {
        key: data.key,
        amount: data.amount,
        currency: "INR",
        name: "CodeVastra - Event Registration",
        description: eventName,
        order_id: data.orderId,
        prefill: {
          name: form.fullName,
          email: form.email,
        },
        handler: async function (response) {
          await axios.post(`${API_BASE}/api/registrations/verify`, {
            orderId: data.orderId,
            registrationId: data.registrationId,
            ...response,
          });

          alert("Registration + Payment successful ✅");
          setForm({
            fullName: "",
            rollNumber: "",
            address: "",
            collegeName: "",
            branch: "",
            section: "",
            email: "",
          });
          onClose();
        },
        theme: {
          color: "#f36100",
        },
      };

      if (window.Razorpay) {
        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        alert("Razorpay script not loaded.");
      }
    } catch (err) {
      console.error(err);
      alert("Error in registration or payment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-semibold">Register for {eventName}</h3>
          <button onClick={onClose} className="text-slate-500">
            ✕
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-3 text-sm"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Input
              label="Full name"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              error={errors.fullName}
            />
            <Input
              label="Roll number"
              name="rollNumber"
              value={form.rollNumber}
              onChange={handleChange}
              error={errors.rollNumber}
            />
          </div>

          <Input
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            error={errors.email}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Input
              label="College name"
              name="collegeName"
              value={form.collegeName}
              onChange={handleChange}
              error={errors.collegeName}
            />
            <Input
              label="Branch"
              name="branch"
              value={form.branch}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Input
              label="Section"
              name="section"
              value={form.section}
              onChange={handleChange}
            />
            <Input
              label="Address"
              name="address"
              value={form.address}
              onChange={handleChange}
            />
          </div>

          <div className="flex items-center gap-3 mt-2">
            <div className="text-sm text-slate-600">
              Fee: <strong>₹{ADMIN_FEE}</strong>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="ml-auto bg-orange-500 text-white px-4 py-2 rounded"
            >
              {loading ? "Processing..." : "Pay & Register"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-2 border rounded"
            >
              Cancel
            </button>
          </div>
        </form>

        <p className="mt-3 text-xs text-slate-400">
          Note: Real payment ke liye Razorpay ke test keys use karo backend me.
        </p>
      </div>
    </div>
  );
}

function Input({ label, name, value, onChange, error }) {
  return (
    <label className="block">
      <div>{label}</div>
      <input
        name={name}
        value={value}
        onChange={onChange}
        className={`mt-1 w-full rounded border px-3 py-2 ${
          error ? "border-red-400" : "border-slate-200"
        }`}
      />
      {error && <div className="text-red-500 text-xs">{error}</div>}
    </label>
  );
}
