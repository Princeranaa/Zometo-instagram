import React, { useState } from "react";
import { Form, Link, useNavigate } from "react-router-dom";
import "../../style/auth-shared.css";
import axios from "axios";
import { toast } from "react-toastify";

function FoodPartnerRegister() {

  const navigate = useNavigate()

  const [FormData, setFormData] = useState({
    businessName: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    contactName: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { businessName, email, password, phone, address, contactName } = FormData;

    if (! businessName || !email || !password || !phone || !address || !contactName) {
      toast.error("Please fill in all fields");
      return;
    }

    const res = await axios.post(
      "http://localhost:3000/api/auth/food-partner/register",
      { name: businessName, email, password, phone, address, contactName },
      { withCredentials: true }
    );
    console.log(res.data);
    toast.success(res.data.message);
    navigate("/create-food");
  };

  return (
    <div className="auth-page-wrapper">
      <div
        className="auth-card"
        role="region"
        aria-labelledby="partner-register-title"
      >
        <header>
          <h1 id="partner-register-title" className="auth-title">
            Partner sign up
          </h1>
          <p className="auth-subtitle">Grow your business with our platform.</p>
        </header>
        <nav className="auth-alt-action" style={{ marginTop: "-4px" }}>
          <strong style={{ fontWeight: 600 }}>Switch:</strong>{" "}
          <Link to="/user/register">User</Link> •{" "}
          <Link to="/food-partner/register">Food partner</Link>
        </nav>
        <form className="auth-form" noValidate onSubmit={handleSubmit}>
          <div className="field-group">
            <label htmlFor="businessName">Business Name</label>
            <input
              id="businessName"
              name="businessName"
              value={FormData.businessName}
              placeholder="Tasty Bites"
              autoComplete="organization"
              onChange={handleChange}
            />
          </div>
          <div className="two-col">
            <div className="field-group">
              <label htmlFor="contactName">Contact Name</label>
              <input
                id="contactName"
                name="contactName"
                value={FormData.contactName}
                placeholder="Jane Doe"
                autoComplete="name"
                onChange={handleChange}
              />
            </div>
            <div className="field-group">
              <label htmlFor="phone">Phone</label>
              <input
                id="phone"
                name="phone"
                value={FormData.phone}
                placeholder="+1 555 123 4567"
                autoComplete="tel"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="field-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={FormData.email}
              placeholder="business@example.com"
              autoComplete="email"
              onChange={handleChange}
            />
          </div>
          <div className="field-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={FormData.password}
              placeholder="Create password"
              autoComplete="new-password"
              onChange={handleChange}
            />
          </div>
          <div className="field-group">
            <label htmlFor="address">Address</label>
            <input
              id="address"
              name="address"
              placeholder="123 Market Street"
              value={FormData.address}
              autoComplete="street-address"
              onChange={handleChange}
            />
            <p className="small-note">
              Full address helps customers find you faster.
            </p>
          </div>
          <button className="auth-submit" type="submit">
            Create Partner Account
          </button>
        </form>
        <div className="auth-alt-action">
          Already a partner? <Link to="/food-partner/login">Sign in</Link>
        </div>
      </div>
    </div>
  );
}

export default FoodPartnerRegister;
