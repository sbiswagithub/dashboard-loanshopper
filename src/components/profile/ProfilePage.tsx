import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

export const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<string>("tab-5");

  return (
    <div className="container-fluid">
      <div className="row mb-2">
        <div className="col">
          <div className="card shadow py-2 border-left-info">
            <div className="card-body">
              <div className="row g-0 align-items-center">
                <div className="col me-2">
                  <div className="text-uppercase text-info mb-1 fw-bold text-xs">
                    <span>FINANCIAL PROFILE</span>
                  </div>
                  <div className="row g-0 align-items-center">
                    <div className="col-auto">
                      <div className="text-dark me-3 mb-0 fw-bold h5">
                        <span>50%</span>
                      </div>
                    </div>
                    <div className="col">
                      <div className="progress progress-sm">
                        <div
                          className="progress-bar bg-info"
                          role="progressbar"
                          style={{ width: "50%" }}
                          aria-valuenow={50}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        >
                          <span className="visually-hidden">50%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-clipboard-list fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-3">
          <div className="hstack gap-2 d-flex justify-content-end mt-2">
            <div className="mb-3">
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="formCheck-9"
                />
                <label className="form-check-label" htmlFor="formCheck-9">
                  <strong>Autosave</strong>
                </label>
              </div>
            </div>
            <button className="btn btn-primary" type="button">
              Save
            </button>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <div>
            {/* Tabs Navigation */}
            <ul className="nav nav-tabs" role="tablist">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                <li key={num} className="nav-item" role="presentation">
                  <button
                    className={`nav-link ${
                      activeTab === `tab-${num}` ? "active" : ""
                    }`}
                    role="tab"
                    onClick={() => setActiveTab(`tab-${num}`)}
                    type="button"
                  >
                    <h6 className="text-primary m-0 fw-bold">{num}</h6>
                  </button>
                </li>
              ))}
            </ul>

            <div className="tab-content">
              {/* Tab 1 */}
              <div
                className={`tab-pane ${
                  activeTab === "tab-1" ? "active show" : ""
                }`}
                role="tabpanel"
                id="tab-1"
              >
                <div className="card shadow mb-4">
                  <div className="card-body">
                    <h1>Minimum Info</h1>
                    <div className="row">
                      {/* Residential Address */}
                      <div className="col">
                        <div className="card">
                          <div className="card-header">
                            <h5 className="mb-0">Residential address</h5>
                          </div>
                          <div className="card-body">
                            <form>
                              <div className="mb-3">
                                <label className="form-label" htmlFor="address">
                                  <strong>Address</strong>
                                </label>
                                <input
                                  className="form-control"
                                  type="text"
                                  id="address"
                                  placeholder="Start typing address"
                                  name="address"
                                />
                              </div>

                              <div className="row">
                                <div className="col">
                                  <div className="mb-3">
                                    <label
                                      className="form-label"
                                      htmlFor="street_address"
                                    >
                                      <strong>Street address</strong>
                                    </label>
                                    <input
                                      className="form-control"
                                      type="text"
                                      id="street_address"
                                      placeholder="Unit or Block # and Street name"
                                      name="street_address"
                                    />
                                  </div>
                                </div>
                              </div>

                              <div className="row">
                                <div className="col">
                                  <div className="mb-3">
                                    <label
                                      className="form-label"
                                      htmlFor="city"
                                    >
                                      <strong>Town or City</strong>
                                    </label>
                                    <input
                                      className="form-control"
                                      type="text"
                                      id="city"
                                      name="city"
                                    />
                                  </div>
                                </div>
                                <div className="col">
                                  <div className="mb-3">
                                    <label className="form-label">
                                      <strong>State</strong>
                                    </label>
                                    <div className="dropdown">
                                      <button
                                        className="btn btn-primary dropdown-toggle"
                                        type="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                      >
                                        Select state
                                      </button>
                                      <div className="dropdown-menu">
                                        {[
                                          "ACT",
                                          "NSW",
                                          "NT",
                                          "QLD",
                                          "SA",
                                          "TAS",
                                          "VIC",
                                          "WA",
                                        ].map((state) => (
                                          <a
                                            key={state}
                                            className="dropdown-item"
                                            href="#"
                                          >
                                            {state}
                                          </a>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="row">
                                <div className="col">
                                  <div className="mb-3">
                                    <label
                                      className="form-label"
                                      htmlFor="postcode"
                                    >
                                      <strong>Post Code</strong>
                                    </label>
                                    <input
                                      className="form-control"
                                      type="text"
                                      id="postcode"
                                      name="postcode"
                                    />
                                  </div>
                                </div>
                                <div className="col">
                                  <div className="mb-3">
                                    <label
                                      className="form-label"
                                      htmlFor="country"
                                    >
                                      <strong>Country</strong>
                                    </label>
                                    <input
                                      className="form-control"
                                      type="text"
                                      id="country"
                                      placeholder="Australia"
                                      name="country"
                                    />
                                  </div>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>

                      {/* Basic Income Details */}
                      <div className="col">
                        <div className="card">
                          <div className="card-header">
                            <h5 className="mb-0">Basic income details</h5>
                          </div>
                          <div className="card-body">
                            <form>
                              <div className="vstack gap-1">
                                <div className="row">
                                  <div className="col-3">
                                    <label className="form-label">
                                      <strong>Gross annual income</strong>
                                    </label>
                                  </div>
                                  <div className="col">
                                    <input
                                      className="form-control"
                                      type="text"
                                      placeholder="$"
                                      name="cash_savings"
                                    />
                                  </div>
                                </div>
                                <hr />
                                <div className="hstack gap-1 justify-content-between">
                                  <div className="form-check">
                                    <input
                                      className="form-check-input"
                                      type="radio"
                                      id="formCheck-21"
                                      name="income_type"
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor="formCheck-21"
                                    >
                                      PAYG (Salaried)
                                    </label>
                                  </div>
                                  <div className="form-check">
                                    <input
                                      className="form-check-input"
                                      type="radio"
                                      id="formCheck-22"
                                      name="income_type"
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor="formCheck-22"
                                    >
                                      Self Employed
                                    </label>
                                  </div>
                                </div>
                                <hr />
                                <div className="row">
                                  <div className="col-3">
                                    <label className="form-label">
                                      <strong>Profession</strong>
                                    </label>
                                  </div>
                                  <div className="col">
                                    <input
                                      className="form-control"
                                      type="text"
                                      name="profession"
                                    />
                                  </div>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>

                      {/* Other Personal Details */}
                      <div className="col">
                        <div className="card">
                          <div className="card-header">
                            <h5 className="mb-0">Other personal details</h5>
                          </div>
                          <div className="card-body">
                            <form>
                              <div className="vstack gap-1">
                                <div className="row">
                                  <div className="col-3">
                                    <label className="form-label">
                                      <strong>Date of birth</strong>
                                    </label>
                                  </div>
                                  <div className="col">
                                    <input
                                      className="form-control"
                                      type="date"
                                    />
                                  </div>
                                </div>
                                <hr />
                                <div className="row">
                                  <div className="col-3">
                                    <label className="form-label">
                                      <strong>Dependants</strong>
                                    </label>
                                  </div>
                                  <div className="col">
                                    <div className="dropdown d-flex justify-content-end">
                                      <button
                                        className="btn btn-primary dropdown-toggle"
                                        type="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                      >
                                        Select
                                      </button>
                                      <div className="dropdown-menu">
                                        {["1", "2", "3", "4", "5 or more"].map(
                                          (dep) => (
                                            <a
                                              key={dep}
                                              className="dropdown-item"
                                              href="#"
                                            >
                                              {dep}
                                            </a>
                                          )
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <hr />
                                <div className="hstack gap-1 justify-content-between">
                                  {["Citizen", "Resident", "Work Visa"].map(
                                    (status, idx) => (
                                      <div key={status} className="form-check">
                                        <input
                                          className="form-check-input"
                                          type="radio"
                                          id={`formCheck-${26 + idx}`}
                                          name="residency"
                                        />
                                        <label
                                          className="form-check-label"
                                          htmlFor={`formCheck-${26 + idx}`}
                                        >
                                          {status}
                                        </label>
                                      </div>
                                    )
                                  )}
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tab 2 */}
              <div
                className={`tab-pane ${
                  activeTab === "tab-2" ? "active show" : ""
                }`}
                role="tabpanel"
                id="tab-2"
              >
                <div className="card">
                  <div className="card-body">
                    <h1>Statement of intent</h1>
                    <form>
                      <textarea
                        className="form-control"
                        rows={10}
                        placeholder="Enter your statement of intent..."
                      ></textarea>
                    </form>
                  </div>
                </div>
              </div>

              {/* Tab 3 */}

              <div
                className={`tab-pane ${
                  activeTab === "tab-3" ? "active show" : ""
                }`}
                role="tabpanel"
                id="tab-3"
              >
                <div className="card">
                  <div className="card-body">
                    <h1>Employment history</h1>

                    <div className="table-responsive">
                      <table className="table">
                        <thead>
                          <tr>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {/* Row 1 */}
                          <tr>
                            <td className="d-flex">
                              <div className="hstack flex-grow-1 flex-fill justify-content-between">
                                <a href="#">
                                  <span>Company A</span>
                                </a>
                                <span style={{ fontSize: "10px" }}>
                                  Start 25/10
                                </span>
                                <span style={{ fontSize: "10px" }}>
                                  Currently working here
                                </span>
                                <span style={{ fontSize: "10px" }}>
                                  Position
                                </span>
                                <span style={{ fontSize: "10px" }}>
                                  Contact name
                                </span>
                                <span style={{ fontSize: "10px" }}>
                                  contact@email.com
                                </span>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  height="1em"
                                  viewBox="0 0 24 24"
                                  width="1em"
                                  fill="currentColor"
                                >
                                  <path d="M0 0h24v24H0z" fill="none"></path>
                                  <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path>
                                </svg>
                              </div>
                            </td>
                          </tr>

                          {/* Row 2 */}
                          <tr>
                            <td className="d-flex">
                              <div className="hstack flex-grow-1 flex-fill justify-content-between">
                                <a href="#">
                                  <span>Company B</span>
                                </a>
                                <span style={{ fontSize: "10px" }}>
                                  Start 31/12
                                </span>
                                <span style={{ fontSize: "10px" }}>
                                  End 31/12
                                </span>
                                <span style={{ fontSize: "10px" }}>
                                  Position
                                </span>
                                <span style={{ fontSize: "10px" }}>
                                  Contact name
                                </span>
                                <span style={{ fontSize: "10px" }}>
                                  contact@email.com
                                </span>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  height="1em"
                                  viewBox="0 0 24 24"
                                  width="1em"
                                  fill="currentColor"
                                >
                                  <path d="M0 0h24v24H0z" fill="none"></path>
                                  <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path>
                                </svg>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="vstack d-flex justify-content-center align-items-start">
                      <button className="btn btn-primary btn-sm" type="submit">
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tab 4 */}
              <div
                className={`tab-pane ${
                  activeTab === "tab-4" ? "active show" : ""
                }`}
                role="tabpanel"
                id="tab-4"
              >
                <div className="card">
                  <div className="card-body">
                    <h1>Loan requirements</h1>
                    <div className="vstack gap-2">
                      {/* Row 1 */}
                      <div className="row">
                        {/* Loan amounts */}
                        <div className="col">
                          <div className="card">
                            <div className="card-header">
                              <h5 className="mb-0">Loan amounts</h5>
                            </div>
                            <div className="card-body">
                              <div className="vstack gap-1">
                                <form>
                                  <div className="vstack gap-1">
                                    <input
                                      className="form-control"
                                      type="text"
                                      placeholder="Estimated loan amount"
                                    />
                                    <input
                                      className="form-control"
                                      type="text"
                                      placeholder="Deposit contribution"
                                    />
                                    <input
                                      className="form-control"
                                      type="text"
                                      placeholder="LVR %"
                                    />
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Mortgage addresses */}
                        <div className="col">
                          <div className="card">
                            <div className="card-header">
                              <h5 className="mb-0">Mortgage addresses</h5>
                            </div>
                            <div className="card-body">
                              <div className="table-responsive">
                                <table className="table">
                                  <thead>
                                    <tr>
                                      <th></th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td>
                                        <div className="hstack flex-grow-1 flex-fill justify-content-between">
                                          <a href="#">
                                            <span>
                                              44 Mt Pleasant Rd, Chermside 4221
                                            </span>
                                          </a>
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <div className="hstack flex-grow-1 flex-fill justify-content-between">
                                          <a href="#">
                                            <span>
                                              11 Fox Street, West End 4101
                                            </span>
                                            <span className="badge bg-primary ms-2">
                                              4
                                            </span>
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="1em"
                                              height="1em"
                                              fill="currentColor"
                                              viewBox="0 0 16 16"
                                              className="bi bi-shield-lock-fill fs-5 ms-2"
                                            >
                                              <path
                                                fillRule="evenodd"
                                                d="M8 0c-.69 0-1.843.265-2.928.56-1.11.3-2.229.655-2.887.87a1.54 1.54 0 0 0-1.044 1.262c-.596 4.477.787 7.795 2.465 9.99a11.777 11.777 0 0 0 2.517 2.453c.386.273.744.482 1.048.625.28.132.581.24.829.24s.548-.108.829-.24a7.159 7.159 0 0 0 1.048-.625 11.775 11.775 0 0 0 2.517-2.453c1.678-2.195 3.061-5.513 2.465-9.99a1.541 1.541 0 0 0-1.044-1.263 62.467 62.467 0 0 0-2.887-.87C9.843.266 8.69 0 8 0m0 5a1.5 1.5 0 0 1 .5 2.915l.385 1.99a.5.5 0 0 1-.491.595h-.788a.5.5 0 0 1-.49-.595l.384-1.99A1.5 1.5 0 0 1 8 5"
                                              />
                                            </svg>
                                          </a>
                                        </div>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                              <div className="hstack d-flex justify-content-center">
                                <a href="#">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    enableBackground="new 0 0 24 24"
                                    height="1em"
                                    viewBox="0 0 24 24"
                                    width="1em"
                                    fill="currentColor"
                                    className="fs-2"
                                  >
                                    <g>
                                      <rect
                                        fill="none"
                                        height="24"
                                        width="24"
                                      />
                                    </g>
                                    <g>
                                      <g>
                                        <g>
                                          <path d="M18,11c0.7,0,1.37,0.1,2,0.29V9l-8-6L4,9v12h7.68C11.25,20.09,11,19.08,11,18C11,14.13,14.13,11,18,11z" />
                                        </g>
                                        <g>
                                          <path d="M18,13c-2.76,0-5,2.24-5,5s2.24,5,5,5s5-2.24,5-5S20.76,13,18,13z M21,18.5h-2.5V21h-1v-2.5H15v-1h2.5V15h1v2.5H21V18.5z" />
                                        </g>
                                      </g>
                                    </g>
                                  </svg>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Mortgage type */}
                        <div className="col">
                          <div className="card">
                            <div className="card-header">
                              <h5 className="mb-0">Mortgage type</h5>
                            </div>
                            <div className="card-body">
                              <div className="vstack gap-1">
                                <form>
                                  <div className="vstack gap-1">
                                    <div className="hstack gap-1">
                                      <div className="form-check form-check-inline">
                                        <input
                                          className="form-check-input"
                                          type="radio"
                                          id="formCheck-1"
                                          defaultChecked
                                        />
                                        <label
                                          className="form-check-label"
                                          htmlFor="formCheck-1"
                                        >
                                          First mortgage
                                        </label>
                                      </div>
                                      <div className="form-check form-check-inline">
                                        <input
                                          className="form-check-input"
                                          type="radio"
                                          id="formCheck-2"
                                        />
                                        <label
                                          className="form-check-label"
                                          htmlFor="formCheck-2"
                                        >
                                          Refinance
                                        </label>
                                      </div>
                                    </div>
                                    <input
                                      className="form-control"
                                      type="text"
                                      placeholder="Current lender"
                                    />
                                    <input
                                      className="form-control"
                                      type="text"
                                      placeholder="Total current home loan(s) $"
                                    />
                                    <input
                                      className="form-control"
                                      type="text"
                                      placeholder="Current monthly repayment $"
                                    />
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Row 2 */}
                      <div className="row">
                        {/* Rate preference */}
                        <div className="col">
                          <div className="card">
                            <div className="card-header">
                              <h5 className="mb-0">Rate preference</h5>
                            </div>
                            <div className="card-body">
                              <div className="vstack gap-1">
                                <form>
                                  <div className="vstack gap-1">
                                    <div className="form-check form-check-inline">
                                      <input
                                        className="form-check-input"
                                        type="radio"
                                        id="formCheck-5"
                                        defaultChecked
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="formCheck-5"
                                      >
                                        Fixed
                                      </label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                      <input
                                        className="form-check-input"
                                        type="radio"
                                        id="formCheck-6"
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="formCheck-6"
                                      >
                                        Variable
                                      </label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                      <input
                                        className="form-check-input"
                                        type="radio"
                                        id="formCheck-11"
                                        defaultChecked
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="formCheck-11"
                                      >
                                        Split
                                      </label>
                                    </div>
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Loan purpose */}
                        <div className="col">
                          <div className="card">
                            <div className="card-header">
                              <h5 className="mb-0">Loan purpose</h5>
                            </div>
                            <div className="card-body">
                              <form>
                                <div className="vstack gap-1">
                                  <div className="form-check form-check-inline">
                                    <input
                                      className="form-check-input"
                                      type="radio"
                                      id="formCheck-3"
                                      defaultChecked
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor="formCheck-3"
                                    >
                                      Residential
                                    </label>
                                  </div>
                                  <div className="form-check form-check-inline">
                                    <input
                                      className="form-check-input"
                                      type="radio"
                                      id="formCheck-4"
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor="formCheck-4"
                                    >
                                      Investment
                                    </label>
                                  </div>
                                  <div className="form-check form-check-inline">
                                    <input
                                      className="form-check-input"
                                      type="radio"
                                      id="formCheck-7"
                                      defaultChecked
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor="formCheck-7"
                                    >
                                      Both
                                    </label>
                                  </div>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>

                        {/* Loan processing */}
                        <div className="col">
                          <div className="card">
                            <div className="card-header">
                              <h5 className="mb-0">Loan processing</h5>
                            </div>
                            <div className="card-body">
                              <div className="vstack gap-1">
                                <form>
                                  <div className="vstack gap-1">
                                    <div className="form-check form-check-inline">
                                      <input
                                        className="form-check-input"
                                        type="radio"
                                        id="formCheck-8"
                                        defaultChecked
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="formCheck-8"
                                      >
                                        Normal
                                      </label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                      <input
                                        className="form-check-input"
                                        type="radio"
                                        id="formCheck-12"
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="formCheck-12"
                                      >
                                        Expedited
                                      </label>
                                    </div>
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Repayment term */}
                        <div className="col">
                          <div className="card">
                            <div className="card-header">
                              <h5 className="mb-0">Repayment term</h5>
                            </div>
                            <div className="card-body">
                              <div className="vstack gap-1">
                                <form>
                                  <div className="hstack gap-1">
                                    <div className="vstack gap-1">
                                      <div className="form-check form-check-inline">
                                        <input
                                          className="form-check-input"
                                          type="radio"
                                          id="formCheck-20"
                                        />
                                        <label
                                          className="form-check-label"
                                          htmlFor="formCheck-20"
                                        >
                                          Annual
                                        </label>
                                      </div>
                                      <div className="form-check form-check-inline">
                                        <input
                                          className="form-check-input"
                                          type="radio"
                                          id="formCheck-16"
                                          defaultChecked
                                        />
                                        <label
                                          className="form-check-label"
                                          htmlFor="formCheck-16"
                                        >
                                          Fortnightly
                                        </label>
                                      </div>
                                      <div className="form-check form-check-inline">
                                        <input
                                          className="form-check-input"
                                          type="radio"
                                          id="formCheck-14"
                                          defaultChecked
                                        />
                                        <label
                                          className="form-check-label"
                                          htmlFor="formCheck-14"
                                        >
                                          Monthly
                                        </label>
                                      </div>
                                      <div className="form-check form-check-inline">
                                        <input
                                          className="form-check-input"
                                          type="radio"
                                          id="formCheck-15"
                                        />
                                        <label
                                          className="form-check-label"
                                          htmlFor="formCheck-15"
                                        >
                                          Weekly
                                        </label>
                                      </div>
                                    </div>
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Preferred loan type */}
                        <div className="col">
                          <div className="card">
                            <div className="card-header">
                              <h5 className="mb-0">Preferred loan type</h5>
                            </div>
                            <div className="card-body">
                              <div className="vstack gap-1">
                                <form>
                                  <div className="hstack gap-1">
                                    <div className="vstack gap-1">
                                      <div className="form-check form-check-inline">
                                        <input
                                          className="form-check-input"
                                          type="radio"
                                          id="formCheck-17"
                                          defaultChecked
                                        />
                                        <label
                                          className="form-check-label"
                                          htmlFor="formCheck-17"
                                        >
                                          Least interest rate
                                        </label>
                                      </div>
                                      <div className="form-check form-check-inline">
                                        <input
                                          className="form-check-input"
                                          type="radio"
                                          id="formCheck-18"
                                        />
                                        <label
                                          className="form-check-label"
                                          htmlFor="formCheck-18"
                                        >
                                          Lower repayments
                                        </label>
                                      </div>
                                      <div className="form-check form-check-inline">
                                        <input
                                          className="form-check-input"
                                          type="radio"
                                          id="formCheck-19"
                                        />
                                        <label
                                          className="form-check-label"
                                          htmlFor="formCheck-19"
                                        >
                                          Longer fixed term
                                        </label>
                                      </div>
                                      <div className="form-check form-check-inline">
                                        <input
                                          className="form-check-input"
                                          type="radio"
                                          id="formCheck-25"
                                        />
                                        <label
                                          className="form-check-label"
                                          htmlFor="formCheck-25"
                                        >
                                          Shorter loan duration
                                        </label>
                                      </div>
                                    </div>
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tab 5  */}
              <div
                className={`tab-pane ${
                  activeTab === "tab-5" ? "active show" : ""
                }`}
                role="tabpanel"
                id="tab-5"
              >
                <div className="card">
                  <div className="card-body">
                    <h1>Co-Borrower</h1>
                    <div className="vstack gap-1">
                      <form>
                        <div className="hstack gap-1">
                          <div className="vstack gap-1">
                            {/* Title Selection */}
                            <div className="card">
                              <div className="card-body">
                                <div className="hstack gap-1 d-flex justify-content-center">
                                  <div className="form-check form-check-inline">
                                    <input
                                      className="form-check-input"
                                      type="radio"
                                      id="formCheck-13"
                                      defaultChecked
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor="formCheck-13"
                                    >
                                      Mr
                                    </label>
                                  </div>
                                  <div className="form-check form-check-inline">
                                    <input
                                      className="form-check-input"
                                      type="radio"
                                      id="formCheck-23"
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor="formCheck-23"
                                    >
                                      Ms
                                    </label>
                                  </div>
                                  <div className="form-check form-check-inline">
                                    <input
                                      className="form-check-input"
                                      type="radio"
                                      id="formCheck-24"
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor="formCheck-24"
                                    >
                                      Mrs
                                    </label>
                                  </div>
                                </div>

                                {/* First and Last Name */}
                                <div className="vstack gap-1">
                                  <div className="row">
                                    <div className="col-3">
                                      <label
                                        className="col-form-label"
                                        htmlFor="first_name-1"
                                      >
                                        <strong>First Name</strong>
                                      </label>
                                    </div>
                                    <div className="col">
                                      <input
                                        className="form-control"
                                        type="text"
                                        id="first_name-1"
                                        placeholder="John"
                                        name="first_name"
                                      />
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-3">
                                      <label
                                        className="col-form-label"
                                        htmlFor="last_name-1"
                                      >
                                        <strong>Last Name</strong>
                                      </label>
                                    </div>
                                    <div className="col">
                                      <input
                                        className="form-control"
                                        type="text"
                                        id="last_name-1"
                                        placeholder="Doe"
                                        name="last_name"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Email & Mobile */}
                            <div className="card">
                              <div className="card-body">
                                <div className="vstack gap-1">
                                  <div className="row">
                                    <div className="col-3">
                                      <label
                                        className="col-form-label"
                                        htmlFor="email-1"
                                      >
                                        <strong>Email Address</strong>
                                      </label>
                                    </div>
                                    <div className="col">
                                      <input
                                        className="form-control"
                                        type="email"
                                        id="email-1"
                                        placeholder="user@example.com"
                                        name="email"
                                      />
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-3">
                                      <label
                                        className="col-form-label"
                                        htmlFor="mobile-1"
                                      >
                                        <strong>Mobile</strong>
                                      </label>
                                    </div>
                                    <div className="col">
                                      <input
                                        className="form-control"
                                        type="text"
                                        id="mobile-1"
                                        placeholder="041111111"
                                        name="mobile"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Gross Annual Income */}
                            <div className="card">
                              <div className="card-body">
                                <div className="vstack">
                                  <div className="row">
                                    <div className="col-3">
                                      <div className="mb-3">
                                        <label
                                          className="form-label"
                                          htmlFor="cash_savings-12"
                                        >
                                          <strong>Gross annual income</strong>
                                        </label>
                                      </div>
                                    </div>
                                    <div className="col">
                                      <div className="mb-3">
                                        <input
                                          className="form-control"
                                          type="text"
                                          id="cash_savings-12"
                                          placeholder="$"
                                          name="cash_savings"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/* End of Fields */}
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tabs 6*/}
              <div
                className={`tab-pane ${
                  activeTab === "tab-6" ? "active show" : ""
                }`}
                role="tabpanel"
                id="tab-6"
              >
                <div className="card">
                  <div className="card-body">
                    <h1>Assets</h1>
                    <form>
                      <div className="vstack gap-1">
                        {/* Cash savings */}
                        <div className="vstack">
                          <div className="row">
                            <div className="col-3">
                              <div className="mb-3">
                                <label
                                  className="form-label"
                                  htmlFor="cash_savings-4"
                                >
                                  <strong>Cash savings</strong>
                                </label>
                              </div>
                            </div>
                            <div className="col">
                              <div className="mb-3">
                                <input
                                  className="form-control"
                                  type="text"
                                  id="cash_savings-4"
                                  placeholder="$"
                                  name="cash_savings"
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Vehicles */}
                        <div className="vstack">
                          <div className="row">
                            <div className="col-3">
                              <div className="mb-3">
                                <label
                                  className="form-label"
                                  htmlFor="cash_savings-5"
                                >
                                  <strong>Vehicles</strong>
                                </label>
                              </div>
                            </div>
                            <div className="col">
                              <div className="mb-3">
                                <input
                                  className="form-control"
                                  type="text"
                                  id="cash_savings-5"
                                  placeholder="$"
                                  name="vehicles"
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Investments */}
                        <div className="vstack">
                          <div className="row">
                            <div className="col-3">
                              <div className="mb-3">
                                <label
                                  className="form-label"
                                  htmlFor="cash_savings-6"
                                >
                                  <strong>Investments</strong>
                                </label>
                              </div>
                            </div>
                            <div className="col">
                              <div className="mb-3">
                                <input
                                  className="form-control"
                                  type="text"
                                  id="cash_savings-6"
                                  placeholder="$"
                                  name="investments"
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Other */}
                        <div className="vstack">
                          <div className="row">
                            <div className="col-3">
                              <div className="mb-3">
                                <label
                                  className="form-label"
                                  htmlFor="cash_savings-7"
                                >
                                  <strong>Other</strong>
                                </label>
                              </div>
                            </div>
                            <div className="col">
                              <div className="mb-3">
                                <input
                                  className="form-control"
                                  type="text"
                                  id="cash_savings-7"
                                  placeholder="$"
                                  name="other_assets"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              {/* Table 07 */}

              {[7].map((num) => (
                <div
                  key={num}
                  className={`tab-pane ${
                    activeTab === `tab-${num}` ? "active show" : ""
                  }`}
                  role="tabpanel"
                  id={`tab-${num}`}
                >
                  <div className="card">
                    <div className="card-body">
                      {num === 7 ? (
                        <>
                          <h1>Liabilities</h1>
                          <form>
                            <div className="vstack gap-1">
                           
                              <div className="vstack">
                                <div className="row">
                                  <div className="col-3">
                                    <div className="mb-3">
                                      <label
                                        className="form-label"
                                        htmlFor="other_loans"
                                      >
                                        <strong>Other loans</strong>
                                      </label>
                                    </div>
                                  </div>
                                  <div className="col">
                                    <div className="mb-3">
                                      <input
                                        className="form-control"
                                        type="text"
                                        id="other_loans"
                                        placeholder="$"
                                        name="other_loans"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>

                          
                              <div className="vstack">
                                <div className="row">
                                  <div className="col-3">
                                    <div className="mb-3">
                                      <label
                                        className="form-label"
                                        htmlFor="credit_cards"
                                      >
                                        <strong>Credit cards</strong>
                                      </label>
                                    </div>
                                  </div>
                                  <div className="col">
                                    <div className="mb-3">
                                      <input
                                        className="form-control"
                                        type="text"
                                        id="credit_cards"
                                        placeholder="$"
                                        name="credit_cards"
                                      />
                                    </div>
                                  </div>
                                </div>

                                {/* Credit Cards Table */}
                                <div className="card">
                                  <div className="card-header">
                                    <div className="hstack d-flex justify-content-between align-items-start">
                                      <h5 className="mb-0">Credit cards</h5>
                                      <button
                                        className="btn btn-primary btn-sm"
                                        type="button"
                                      >
                                        +
                                      </button>
                                    </div>
                                  </div>
                                  <div className="card-body">
                                    <div className="table-responsive">
                                      <table className="table">
                                        <thead>
                                          <tr>
                                            <th></th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          <tr>
                                            <td className="d-flex">
                                              <div className="hstack flex-grow-1 flex-fill justify-content-between">
                                                <a href="#">
                                                  <span>Mastercard</span>
                                                </a>
                                                <span
                                                  style={{ fontSize: "10px" }}
                                                >
                                                  $2000
                                                </span>
                                                <svg
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  height="1em"
                                                  viewBox="0 0 24 24"
                                                  width="1em"
                                                  fill="currentColor"
                                                >
                                                  <path
                                                    d="M0 0h24v24H0z"
                                                    fill="none"
                                                  ></path>
                                                  <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path>
                                                </svg>
                                              </div>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td className="d-flex">
                                              <div className="hstack flex-grow-1 flex-fill justify-content-between">
                                                <a href="#">
                                                  <span>VISA</span>
                                                </a>
                                                <span
                                                  style={{ fontSize: "10px" }}
                                                >
                                                  $3000
                                                </span>
                                                <svg
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  height="1em"
                                                  viewBox="0 0 24 24"
                                                  width="1em"
                                                  fill="currentColor"
                                                >
                                                  <path
                                                    d="M0 0h24v24H0z"
                                                    fill="none"
                                                  ></path>
                                                  <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path>
                                                </svg>
                                              </div>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </form>
                        </>
                      ) : (
                        <>
                          <h1>Tab {num} Content</h1>
                          <p>Content for tab {num} goes here.</p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* Table 08 */}

              {[8].map((num) => (
                <div
                  key={num}
                  className={`tab-pane ${
                    activeTab === `tab-${num}` ? "active show" : ""
                  }`}
                  role="tabpanel"
                  id={`tab-${num}`}
                >
                  <div className="card">
                    <div className="card-body">
                      {num === 8 && (
                        <>
                          <h1>Spending</h1>
                          <form>
                            <div className="row">
                              {/* Weekly */}
                              <div className="col-3">
                                <div className="card">
                                  <div className="card-header">
                                    <h5 className="mb-0">Weekly</h5>
                                  </div>
                                  <div className="card-body">
                                    <div className="vstack gap-1">
                                      {[
                                        "Rent",
                                        "Groceries",
                                        "Lifestyle",
                                        "Commute",
                                      ].map((label, i) => (
                                        <div className="vstack" key={i}>
                                          <div className="row">
                                            <div className="col-4">
                                              <div className="mb-3">
                                                <label className="form-label">
                                                  <strong>{label}</strong>
                                                </label>
                                              </div>
                                            </div>
                                            <div className="col">
                                              <div className="mb-3">
                                                <input
                                                  className="form-control"
                                                  type="text"
                                                  placeholder="$"
                                                  name="cash_savings"
                                                />
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Monthly */}
                              <div className="col">
                                <div className="card">
                                  <div className="card-header">
                                    <h5 className="mb-0">Monthly</h5>
                                  </div>
                                  <div className="card-body">
                                    <div className="hstack gap-2">
                                      <div className="vstack gap-1">
                                        {[
                                          "Power",
                                          "Water",
                                          "Phone",
                                          "Internet",
                                          "Cable / streaming",
                                        ].map((label, i) => (
                                          <div className="vstack" key={i}>
                                            <div className="row">
                                              <div className="col-4">
                                                <div className="mb-3">
                                                  <label className="form-label">
                                                    <strong>{label}</strong>
                                                  </label>
                                                </div>
                                              </div>
                                              <div className="col">
                                                <div className="mb-3">
                                                  <input
                                                    className="form-control"
                                                    type="text"
                                                    placeholder="$"
                                                    name="cash_savings"
                                                  />
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                      <div className="vstack gap-1">
                                        {[
                                          "Life insurance",
                                          "Health insurance",
                                          "Vehicle insurance",
                                          "Contents insurance",
                                        ].map((label, i) => (
                                          <div className="vstack" key={i}>
                                            <div className="row">
                                              <div className="col-4">
                                                <div className="mb-3">
                                                  <label className="form-label">
                                                    <strong>{label}</strong>
                                                  </label>
                                                </div>
                                              </div>
                                              <div className="col">
                                                <div className="mb-3">
                                                  <input
                                                    className="form-control"
                                                    type="text"
                                                    placeholder="$"
                                                    name="cash_savings"
                                                  />
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Annual */}
                              <div className="col-3">
                                <div className="card">
                                  <div className="card-header">
                                    <h5 className="mb-0">Annual</h5>
                                  </div>
                                  <div className="card-body">
                                    <div className="vstack gap-1">
                                      {[
                                        "Holiday budget",
                                        "Dental expenses",
                                        "Other expenses",
                                      ].map((label, i) => (
                                        <div className="vstack" key={i}>
                                          <div className="row">
                                            <div className="col-4">
                                              <div className="mb-3">
                                                <label className="form-label">
                                                  <strong>{label}</strong>
                                                </label>
                                              </div>
                                            </div>
                                            <div className="col">
                                              <div className="mb-3">
                                                <input
                                                  className="form-control"
                                                  type="text"
                                                  placeholder="$"
                                                  name="cash_savings"
                                                />
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </form>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
