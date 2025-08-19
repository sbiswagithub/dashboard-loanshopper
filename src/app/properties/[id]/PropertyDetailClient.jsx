"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import "bootstrap/dist/css/bootstrap.min.css";

const PropertyDetailClient = ({ property }) => {
  const router = useRouter();

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  if (!property) {
    return (
      <div
        className="container-fluid py-5 d-flex justify-content-center align-items-center"
        style={{ minHeight: "60vh" }}
      >
        <div className="text-center">
          <p className="mt-3">Property not found or still loading...</p>
          <button
            className="btn btn-secondary mt-3"
            onClick={() => router.back()}
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <button
            className="btn btn-outline-secondary me-2"
            onClick={() => router.back()}
          >
            <i className="bi bi-arrow-left me-2"></i>Back to Properties
          </button>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-lg-8">
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
                    <p className="text-primary m-0 fw-bold">
                      Property Location
                    </p>
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
              <div className="tab-content">
                <div
                  className="tab-pane fade show active"
                  id="tab-seller-details"
                  role="tabpanel"
                  aria-labelledby="seller-tab"
                >
                  <form>
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <label className="form-label" htmlFor="first_name">
                          <strong>First Name</strong>
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          id="first_name"
                          value={property.firstName || ""}
                          readOnly
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label" htmlFor="last_name">
                          <strong>Last Name</strong>
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          id="last_name"
                          value={property.lastName || ""}
                          readOnly
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
                          value={property.mobile || ""}
                          readOnly
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
                          value={property.email || ""}
                          readOnly
                        />
                      </div>
                    </div>
                  </form>
                </div>

                <div
                  className="tab-pane fade"
                  id="tab-property-location"
                  role="tabpanel"
                  aria-labelledby="location-tab"
                >
                  <form>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="address_display">
                        <strong>Full Address</strong>
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        id="address_display"
                        value={property.address || ""}
                        readOnly
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="street_address">
                        <strong>Street Address</strong>
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        id="street_address"
                        value={property.streetAddress || ""}
                        readOnly
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
                          value={property.city || ""}
                          readOnly
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label" htmlFor="state">
                          <strong>State</strong>
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          id="state"
                          value={property.state || ""}
                          readOnly
                        />
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
                          value={property.postcode || ""}
                          readOnly
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
                          value={property.country || ""}
                          readOnly
                        />
                      </div>
                    </div>
                  </form>
                </div>

                <div
                  className="tab-pane fade"
                  id="tab-additional-info"
                  role="tabpanel"
                  aria-labelledby="additional-tab"
                >
                  <form>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="property_notes">
                        <strong>Property notes</strong>
                      </label>
                      <textarea
                        className="form-control"
                        id="property_notes"
                        rows="4"
                        value={property.notes || ""}
                        readOnly
                      ></textarea>
                    </div>
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <label className="form-label" htmlFor="status_display">
                          <strong>Status</strong>
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          id="status_display"
                          value={property.status || ""}
                          readOnly
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label" htmlFor="listing_display">
                          <strong>Listing</strong>
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          id="listing_display"
                          value={property.listing || ""}
                          readOnly
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card shadow mb-4">
            <div className="card-body p-0">
              <div
                id="propertyCarousel"
                className="carousel slide carousel-dark"
                data-bs-ride="carousel"
              >
                <div className="carousel-inner">
                  {[1, 2, 3].map((item, index) => (
                    <div
                      key={index}
                      className={`carousel-item ${index === 0 ? "active" : ""}`}
                    >
                      <img
                        className="img-fluid w-100 d-block rounded"
                        src="https://cdn.bootstrapstudio.io/placeholders/1400x800.png"
                        alt={`Property Image ${index + 1}`}
                        style={{ objectFit: "cover", height: "250px" }}
                      />
                    </div>
                  ))}
                </div>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#propertyCarousel"
                  data-bs-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#propertyCarousel"
                  data-bs-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Next</span>
                </button>
                <div className="carousel-indicators">
                  {[0, 1, 2].map((i) => (
                    <button
                      key={i}
                      type="button"
                      data-bs-target="#propertyCarousel"
                      data-bs-slide-to={i}
                      className={i === 0 ? "active" : ""}
                      aria-current={i === 0 ? "true" : "false"}
                      aria-label={`Slide ${i + 1}`}
                    ></button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card shadow mt-4">
        <div className="card-header py-3">
          <h6 className="text-primary m-0 fw-bold">Proposals</h6>
        </div>
        <div className="card-body">
          {property.proposals && property.proposals.length > 0 ? (
            property.proposals.map((person, index) => (
              <div key={index} className="mb-3">
                <h4 className="small fw-bold mb-1">
                  {person.name}
                  <span className="float-end text-muted small">
                    {person.percent === 100
                      ? "Complete!"
                      : `${person.percent}%`}
                  </span>
                </h4>
                <div className="progress" style={{ height: "8px" }}>
                  <div
                    className={`progress-bar bg-${person.color}`}
                    role="progressbar"
                    style={{ width: `${person.percent}%` }}
                    aria-valuenow={person.percent}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-muted fst-italic">
              No proposals available for this property yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailClient;
