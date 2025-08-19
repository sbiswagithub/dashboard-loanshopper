"use client";

import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { useRouter, useSearchParams } from "next/navigation";
import propertiesData from "../../data/properties.json";

const Property = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const propertyId = searchParams.get("id");

  const [formData, setFormData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    address: "",
    streetAddress: "",
    city: "",
    state: "",
    postcode: "",
    country: "",
    notes: "",
    status: "New",
    listing: "Listed",
    listedBy: "Admin User",
    proposals: [],
  });
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (propertyId) {
      setIsEditMode(true);
      const propertyToEdit = propertiesData.find((p) => p.id === propertyId);
      if (propertyToEdit) {
        setFormData(propertyToEdit);
        console.log(
          "Pre-filled form with data for ID:",
          propertyId,
          propertyToEdit
        );
      } else {
        console.warn("Property with ID not found in data:", propertyId);
        setIsEditMode(false);
        provided;
        setFormData({
          id: "",
          firstName: "",
          lastName: "",
          email: "",
          mobile: "",
          address: "",
          streetAddress: "",
          city: "",
          state: "",
          postcode: "",
          country: "",
          notes: "",
          status: "New",
          listing: "Listed",
          listedBy: "Admin User",
          proposals: [],
        });
      }
    } else {
      setIsEditMode(false);
      setFormData({
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        address: "",
        streetAddress: "",
        city: "",
        state: "",
        postcode: "",
        country: "",
        notes: "",
        status: "New",
        listing: "Listed",
        listedBy: "Admin User",
        proposals: [],
      });
    }
  }, [propertyId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Attempting to save property data:", formData);

    if (isEditMode) {
      console.log("Updating property with ID:", formData.id, formData);
      alert(
        `Property "${formData.address}" updated successfully (simulated)! Check console for data.`
      );
    } else {
      const newId = `prop${propertiesData.length + 1}-${Date.now()}`;
      const newData = { ...formData, id: newId, listedBy: "New User" };
      console.log("Adding new property:", newData);
      alert(
        `New property "${newData.address}" added successfully (simulated)! Check console for data.`
      );
    }

    router.push("/properties");
  };

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="mb-0 text-primary">
          {isEditMode ? "Edit Property" : ""}
        </h3>
        <button
          className="btn btn-outline-secondary"
          onClick={() => router.back()}
        >
          <i className="bi bi-arrow-left me-2"></i>Back
        </button>
      </div>

      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <ul className="nav nav-tabs card-header-tabs" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className="nav-link active"
                id="seller-tab"
                data-bs-toggle="tab"
                data-bs-target="#tab-seller-details"
                type="button"
                role="tab"
                aria-controls="tab-seller-details"
                aria-selected="true"
              >
                <p className="text-primary m-0 fw-bold">Seller details</p>
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="location-tab"
                data-bs-toggle="tab"
                data-bs-target="#tab-property-location"
                type="button"
                role="tab"
                aria-controls="tab-property-location"
                aria-selected="false"
              >
                <p className="text-primary m-0 fw-bold">Property Location</p>
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="additional-tab"
                data-bs-toggle="tab"
                data-bs-target="#tab-additional-info"
                type="button"
                role="tab"
                aria-controls="tab-additional-info"
                aria-selected="false"
              >
                <p className="text-primary m-0 fw-bold">
                  Additional information
                </p>
              </button>
            </li>
          </ul>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="tab-content">
              <div
                className="tab-pane fade show active"
                id="tab-seller-details"
                role="tabpanel"
                aria-labelledby="seller-tab"
              >
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label" htmlFor="firstName">
                      <strong>First Name</strong>
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="John"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label" htmlFor="lastName">
                      <strong>Last Name</strong>
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Doe"
                      required
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label" htmlFor="mobile">
                      <strong>Mobile</strong>
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="mobile"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      placeholder="041111111"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label" htmlFor="email">
                      <strong>Email Address</strong>
                    </label>
                    <input
                      className="form-control"
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="user@example.com"
                      required
                    />
                  </div>
                </div>
              </div>

              <div
                className="tab-pane fade"
                id="tab-property-location"
                role="tabpanel"
                aria-labelledby="location-tab"
              >
                <div className="mb-3">
                  <label className="form-label" htmlFor="address">
                    <strong>Full Address</strong>
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="e.g., 123 Main St, Anytown, NSW 2000"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="streetAddress">
                    <strong>Street Address</strong>
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id="streetAddress"
                    name="streetAddress"
                    value={formData.streetAddress}
                    onChange={handleChange}
                    placeholder="Unit or Block # and Street name"
                    required
                  />
                </div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label" htmlFor="city">
                      <strong>Town or City</strong>
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">
                      <strong>State</strong>
                    </label>
                    <div className="dropdown">
                      <button
                        className="btn btn-outline-secondary dropdown-toggle form-control text-start d-flex justify-content-between align-items-center"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        {formData.state || "Select state"}
                      </button>
                      <ul className="dropdown-menu">
                        {[
                          "ACT",
                          "NSW",
                          "NT",
                          "QLD",
                          "SA",
                          "TAS",
                          "VIC",
                          "WA",
                          "Other",
                        ].map((stateOption, index) => (
                          <li key={index}>
                            <a
                              className="dropdown-item"
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handleSelectChange("state", stateOption);
                              }}
                            >
                              {stateOption}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label" htmlFor="postcode">
                      <strong>Post Code</strong>
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="postcode"
                      name="postcode"
                      value={formData.postcode}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label" htmlFor="country">
                      <strong>Country</strong>
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      placeholder="Australia"
                      required
                    />
                  </div>
                </div>
              </div>

              <div
                className="tab-pane fade"
                id="tab-additional-info"
                role="tabpanel"
                aria-labelledby="additional-tab"
              >
                <div className="mb-3">
                  <label className="form-label" htmlFor="notes">
                    <strong>Property notes</strong>
                  </label>
                  <textarea
                    className="form-control"
                    id="notes"
                    name="notes"
                    rows="4"
                    value={formData.notes}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">
                      <strong>Status</strong>
                    </label>
                    <div className="dropdown">
                      <button
                        className="btn btn-outline-secondary dropdown-toggle form-control text-start d-flex justify-content-between align-items-center"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        {formData.status || "Select Status"}
                      </button>
                      <ul className="dropdown-menu">
                        {["New", "Under Negotiation", "Sold"].map(
                          (statusOption, index) => (
                            <li key={index}>
                              <a
                                className="dropdown-item"
                                href="#"
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleSelectChange("status", statusOption);
                                }}
                              >
                                {statusOption}
                              </a>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">
                      <strong>Listing Type</strong>
                    </label>
                    <div className="dropdown">
                      <button
                        className="btn btn-outline-secondary dropdown-toggle form-control text-start d-flex justify-content-between align-items-center"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        {formData.listing || "Select Listing Type"}
                      </button>
                      <ul className="dropdown-menu">
                        {["Listed", "Off market"].map(
                          (listingOption, index) => (
                            <li key={index}>
                              <a
                                className="dropdown-item"
                                href="#"
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleSelectChange("listing", listingOption);
                                }}
                              >
                                {listingOption}
                              </a>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 text-end">
              <button className="btn btn-primary" type="submit">
                {isEditMode ? "Update Property" : "Add Property"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="card shadow mt-4">
        <div className="card-header py-3">
          <h6 className="text-primary m-0 fw-bold">
            Property Images (Placeholder)
          </h6>
        </div>
        <div className="card-body text-center text-muted py-5">
          <p>Image upload/management would go here.</p>
          <img
            src="https://cdn.bootstrapstudio.io/placeholders/600x400.png"
            alt="Property Placeholder"
            className="img-fluid rounded"
            style={{ maxWidth: "300px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Property;
