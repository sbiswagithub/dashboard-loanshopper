"use client";
import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  fetchLeads,
  setFilters,
  setPerPage,
  setCurrentPage,
} from "@/store/slices/leadsSlice";

import initialLeadsData from "../../data/leads.json";

const Leads = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { filteredLeads, filters } = useSelector((state) => state.leads);

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min");
    dispatch(fetchLeads(initialLeadsData));
  }, [dispatch]);

  const handleSearchChange = (e) => {
    dispatch(setFilters({ search: e.target.value }));
  };

  const handleAddressChange = (e) => {
    dispatch(setFilters({ address: e.target.value }));
  };

  const handleStatusChange = (status) => {
    const updatedStatus = filters.status.includes(status)
      ? filters.status.filter((s) => s !== status)
      : [...filters.status, status];
    dispatch(setFilters({ status: updatedStatus }));
  };

  const handlePerPageChange = (e) => {
    dispatch(setPerPage(Number(e.target.value)));
  };

  const handleEditLead = (lead) => {
    const encodedLeadData = encodeURIComponent(JSON.stringify(lead));
    router.push(`/lead?leadData=${encodedLeadData}`);
  };

  const totalPages = Math.ceil(filteredLeads.length / filters.perPage);
  const paginatedLeads = filteredLeads.slice(
    (filters.currentPage - 1) * filters.perPage,
    filters.currentPage * filters.perPage
  );

  return (
    <div className="container-fluid mt-3">
      <div className="card shadow">
        <div className="card-header py-3">
          <p className="text-primary m-0 fw-bold">Leads</p>
        </div>
        <div className="card-body">
          <div className="accordion" id="filtersAccordion">
            <div className="accordion-item">
              <h2 className="accordion-header" id="filtersHeading">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseFilters"
                  aria-expanded="false"
                  aria-controls="collapseFilters"
                >
                  Filters
                </button>
              </h2>
              <div
                id="collapseFilters"
                className="accordion-collapse collapse"
                aria-labelledby="filtersHeading"
                data-bs-parent="#filtersAccordion"
              >
                <div className="accordion-body">
                  <div className="row">
                    <div className="col-md-8">
                      <div className="mb-3">
                        <input
                          type="search"
                          className="form-control form-control-lg"
                          placeholder="Search by name or phone"
                          onChange={handleSearchChange}
                        />
                      </div>
                      <div className="mb-3">
                        <input
                          type="search"
                          className="form-control form-control-lg"
                          placeholder="Search by property address"
                          onChange={handleAddressChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <label className="form-label fw-bold">Status</label>
                      {[
                        "New",
                        "Pre qualified",
                        "Signed",
                        "Under negotiation",
                        "Closed",
                      ].map((status, index) => (
                        <div className="form-check" key={index}>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id={`status${index}`}
                            checked={filters.status.includes(status)}
                            onChange={() => handleStatusChange(status)}
                          />
                          <label
                            className="form-check-label"
                            htmlFor={`status${index}`}
                          >
                            {status}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="table-responsive mt-3">
            <table className="table table-striped table-sm">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Documents</th>
                  <th>Messages</th>
                  <th>
                    Start date
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                      className="bi bi-caret-up-fill ms-1"
                    >
                      <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                    </svg>
                  </th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {paginatedLeads.map((lead) => (
                  <tr key={lead.id || lead.firstName + lead.lastName}>
                    <td>
                      {lead.firstName} {lead.lastName}
                    </td>
                    <td>{lead.documents?.length || 0}</td>
                    <td>{lead.messages?.length || 0}</td>
                    <td>{lead.startDate}</td>
                    <td className="d-flex justify-content-between align-items-center">
                      <span>{lead.status}</span>
                      <button
                        className="btn btn-sm btn-outline-primary ms-2"
                        onClick={() => handleEditLead(lead)}
                      >
                        <i className="bi bi-pencil-square"></i> Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-2">
            <Link href="/lead" className="text-decoration-none">
              <i className="bi bi-plus-square custom-plus-icon text-primary"></i>
            </Link>
          </div>

          <div className="row mt-3">
            <div className="col-md-6 text-nowrap">
              <label className="form-label">
                Show&nbsp;
                <select
                  className="form-select form-select-sm d-inline-block w-auto"
                  value={filters.perPage}
                  onChange={handlePerPageChange}
                >
                  {[5, 10, 20, 30, 50].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="col-md-6 d-flex justify-content-end align-items-center">
              <p className="mb-0 me-3">
                Showing{" "}
                {Math.min(
                  (filters.currentPage - 1) * filters.perPage + 1,
                  filteredLeads.length
                )}{" "}
                to{" "}
                {Math.min(
                  filters.currentPage * filters.perPage,
                  filteredLeads.length
                )}{" "}
                of {filteredLeads.length}
              </p>
              <ul className="pagination mb-0">
                <li
                  className={`page-item ${
                    filters.currentPage === 1 ? "disabled" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() =>
                      dispatch(setCurrentPage(filters.currentPage - 1))
                    }
                  >
                    «
                  </button>
                </li>

                {Array.from({ length: totalPages }).map((_, i) => (
                  <li
                    key={i}
                    className={`page-item ${
                      filters.currentPage === i + 1 ? "active" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => dispatch(setCurrentPage(i + 1))}
                    >
                      {i + 1}
                    </button>
                  </li>
                ))}

                <li
                  className={`page-item ${
                    filters.currentPage === totalPages ? "disabled" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() =>
                      dispatch(setCurrentPage(filters.currentPage + 1))
                    }
                  >
                    »
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leads;
