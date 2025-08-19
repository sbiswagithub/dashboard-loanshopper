"use client";
import React, { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { addLead, updateLead } from "@/store/slices/leadsSlice";

const Lead = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [editingLeadId, setEditingLeadId] = useState(null);
  const [activeStatus, setActiveStatus] = useState("New");
  const [propertyFiles, setPropertyFiles] = useState([]);
  const [communicationFiles, setCommunicationFiles] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [activeTab, setActiveTab] = useState("tab-1");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    address: "",
    streetAddress: "",
    city: "",
    state: "",
    postcode: "",
    country: "Australia",
  });

  const fileInputRef = useRef(null);
  const communicationFileInputRef = useRef(null);

  useEffect(() => {
    const leadDataParam = searchParams.get("leadData");
    if (leadDataParam) {
      try {
        const lead = JSON.parse(decodeURIComponent(leadDataParam));
        setEditingLeadId(lead.id);
        setFormData({
          firstName: lead.firstName || "",
          lastName: lead.lastName || "",
          email: lead.email || "",
          mobile: lead.mobile || "",
          address: lead.address || "",
          streetAddress: lead.streetAddress || "",
          city: lead.city || "",
          state: lead.state || "",
          postcode: lead.postcode || "",
          country: lead.country || "Australia",
        });
        setActiveStatus(lead.status || "New");

        if (lead.documents && Array.isArray(lead.documents)) {
          setPropertyFiles(
            lead.documents.map((doc) => ({
              name: doc.name,
              date: doc.date,
              file: null,
            }))
          );
        }
        if (lead.communications && Array.isArray(lead.communications)) {
          setCommunicationFiles(
            lead.communications.map((comm) => ({
              name: comm.name,
              date: comm.date,
              file: null,
            }))
          );
        }
        if (lead.messages && Array.isArray(lead.messages)) {
          setMessages(lead.messages);
        }
      } catch (error) {
        console.error("Error parsing lead data:", error);
        router.replace("/lead");
      }
    } else {
      setEditingLeadId(null);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        address: "",
        streetAddress: "",
        city: "",
        state: "",
        postcode: "",
        country: "Australia",
      });
      setActiveStatus("New");
      setPropertyFiles([]);
      setCommunicationFiles([]);
      setMessages([]);
      setCurrentMessage("");
    }
  }, [searchParams, router]);

  const statuses = [
    "New",
    "Finance needed",
    "Finance available",
    "Under negotiation",
    "Under contract",
    "Closed",
  ];

  const getButtonStyle = (label) => {
    const isActive = label === activeStatus;
    return {
      backgroundColor: isActive ? "#4e73df" : "#ffffff",
      borderColor: "#4e73df",
      color: isActive ? "#ffffff" : "#6c757d",
      fontWeight: isActive ? "bold" : "normal",
    };
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCommunicationFileDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    setCommunicationFiles((prev) => [
      ...prev,
      ...droppedFiles.map((file) => ({
        name: file.name,
        date: new Date().toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
        }),
        file: file,
      })),
    ]);
    if (communicationFileInputRef.current) {
      communicationFileInputRef.current.value = "";
    }
  };

  const handleCommunicationFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setCommunicationFiles((prev) => [
      ...prev,
      ...selectedFiles.map((file) => ({
        name: file.name,
        date: new Date().toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
        }),
        file: file,
      })),
    ]);
    if (communicationFileInputRef.current) {
      communicationFileInputRef.current.value = "";
    }
  };

  const handleDeleteCommunicationFile = (indexToDelete) => {
    setCommunicationFiles((prev) =>
      prev.filter((_, index) => index !== indexToDelete)
    );
  };

  const handlePropertyFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const today = new Date();
      const formattedDate = `${String(today.getDate()).padStart(
        2,
        "0"
      )}/${String(today.getMonth() + 1).padStart(2, "0")}`;
      setPropertyFiles((prev) => [
        ...prev,
        { name: file.name, date: formattedDate, file: file },
      ]);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDeletePropertyFile = (indexToDelete) => {
    setPropertyFiles((prev) =>
      prev.filter((_, index) => index !== indexToDelete)
    );
  };

  const handleSendMessage = () => {
    if (currentMessage.trim()) {
      const newMessage = {
        text: currentMessage.trim(),
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, newMessage]);
      setCurrentMessage("");
    }
  };

  const handleSaveLead = () => {
    const leadToSave = {
      id: editingLeadId,
      ...formData,
      status: activeStatus,
      documents: propertyFiles.map((f) => ({ name: f.name, date: f.date })),
      communications: communicationFiles.map((f) => ({
        name: f.name,
        date: f.date,
      })),
      messages: messages,
    };

    if (editingLeadId) {
      dispatch(updateLead(leadToSave));
    } else {
      dispatch(addLead(leadToSave));
    }
    router.push("/leads");
  };

  return (
    <div className="container-fluid">
      <div className="vstack flex-grow-1 mb-2">
        <div className="btn-group" role="group">
          {statuses.map((label) => (
            <button
              key={label}
              className="btn"
              style={getButtonStyle(label)}
              type="button"
              onClick={() => setActiveStatus(label)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="row">
        <div className="col-4">
          <div className="mb-3">
            <ul className="nav nav-tabs" role="tablist">
              <li className="nav-item" role="presentation">
                <a
                  className={`nav-link ${activeTab === "tab-1" ? "active" : ""
                    }`}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab("tab-1");
                  }}
                  href="#tab-1"
                  role="tab"
                >
                  <p className="text-primary m-0 fw-bold">Profile</p>
                </a>
              </li>
              <li className="nav-item" role="presentation">
                <a
                  className={`nav-link ${activeTab === "tab-2" ? "active" : ""
                    }`}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab("tab-2");
                  }}
                  href="#tab-2"
                  role="tab"
                >
                  <p className="text-primary m-0 fw-bold">Contact Settings</p>
                </a>
              </li>
            </ul>

            <div className="tab-content">
              <div
                className={`tab-pane fade ${activeTab === "tab-1" ? "show active" : ""
                  }`}
                id="tab-1"
                role="tabpanel"
              >
                <div className="card shadow mb-3">
                  <div className="card-body">
                    <form>
                      <div className="vstack">
                        <div className="mb-3">
                          <label className="form-label" htmlFor="firstName">
                            <strong>First Name</strong>
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            id="firstName"
                            name="firstName"
                            placeholder="John"
                            value={formData.firstName}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label" htmlFor="lastName">
                            <strong>Last Name</strong>
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            id="lastName"
                            name="lastName"
                            placeholder="Doe"
                            value={formData.lastName}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label" htmlFor="email">
                            <strong>Email Address</strong>
                          </label>
                          <input
                            className="form-control"
                            type="email"
                            id="email"
                            name="email"
                            placeholder="user@example.com"
                            value={formData.email}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label" htmlFor="mobile">
                            <strong>Mobile</strong>
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            id="mobile"
                            name="mobile"
                            placeholder="041111111"
                            value={formData.mobile}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              <div
                className={`tab-pane fade ${activeTab === "tab-2" ? "show active" : ""
                  }`}
                id="tab-2"
                role="tabpanel"
              >
                <div className="card shadow">
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
                          name="address"
                          placeholder="Start typing address"
                          value={formData.address}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="row">
                        <div className="col">
                          <div className="mb-3">
                            <label
                              className="form-label"
                              htmlFor="streetAddress"
                            >
                              <strong>Street address</strong>
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              id="streetAddress"
                              name="streetAddress"
                              placeholder="Unit or Block # and Street name"
                              value={formData.streetAddress}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col">
                          <div className="mb-3">
                            <label className="form-label" htmlFor="city">
                              <strong>Town or City</strong>
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              id="city"
                              name="city"
                              value={formData.city}
                              onChange={handleInputChange}
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
                                className="btn dropdown-toggle"
                                style={{
                                  backgroundColor: "#4e73df",
                                  color: "white",
                                  borderColor: "#4e73df",
                                }}
                                data-bs-toggle="dropdown"
                                type="button"
                              >
                                {formData.state || "Select state"}
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
                                    onClick={(e) => {
                                      e.preventDefault();
                                      setFormData((prev) => ({
                                        ...prev,
                                        state: state,
                                      }));
                                    }}
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
                            <label className="form-label" htmlFor="postcode">
                              <strong>Post Code</strong>
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              id="postcode"
                              name="postcode"
                              value={formData.postcode}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="col">
                          <div className="mb-3">
                            <label className="form-label" htmlFor="country">
                              <strong>Country</strong>
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              id="country"
                              name="country"
                              placeholder="Australia"
                              value={formData.country}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button
            className="btn btn-sm"
            style={{
              backgroundColor: "#4e73df",
              color: "white",
              borderColor: "#4e73df",
            }}
            type="button"
            onClick={handleSaveLead}
          >
            Save
          </button>
        </div>

        <div className="col">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Communication</h5>
            </div>
            <div className="card-body">
              <div className="hstack gap-1 flex-fill justify-content-between mb-4">
                <div className="vstack">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="formCheck-1"
                      name="comm"
                    />
                    <label className="form-check-label" htmlFor="formCheck-1">
                      Introduction
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="formCheck-2"
                      name="comm"
                    />
                    <label className="form-check-label" htmlFor="formCheck-2">
                      Property proposal
                    </label>
                  </div>
                </div>
                <div className="vstack">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="formCheck-3"
                      name="comm"
                    />
                    <label className="form-check-label" htmlFor="formCheck-3">
                      Invoice
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="formCheck-4"
                      name="comm"
                    />
                    <label className="form-check-label" htmlFor="formCheck-4">
                      Other
                    </label>
                  </div>
                </div>
              </div>

              {communicationFiles.length > 0 && (
                <div className="mb-3">
                  <h6>Uploaded Communication Files:</h6>
                  <ul className="list-group">
                    {communicationFiles.map((file, index) => (
                      <li
                        key={index}
                        className="list-group-item d-flex justify-content-between align-items-center"
                      >
                        {file.name}
                        <i
                          className="bi bi-trash-fill text-danger"
                          style={{ cursor: "pointer" }}
                          onClick={() => handleDeleteCommunicationFile(index)}
                        ></i>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div
                className="border border-primary rounded mb-3 p-3 text-center"
                style={{
                  borderStyle: "dashed",
                  backgroundColor: "#f8f9fc",
                  cursor: "pointer",
                }}
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleCommunicationFileDrop}
                onClick={() => communicationFileInputRef.current.click()}
              >
                <p className="m-0">
                  Drag and drop files here, or click to upload
                </p>
                <input
                  type="file"
                  multiple
                  ref={communicationFileInputRef}
                  style={{ display: "none" }}
                  onChange={handleCommunicationFileChange}
                />
              </div>
            </div>
            <div className="vstack d-flex justify-content-center align-items-center mb-3">
              <button
                className="btn btn-sm"
                style={{
                  backgroundColor: "#4e73df",
                  color: "white",
                  borderColor: "#4e73df",
                }}
                type="submit"
              >
                Start
              </button>
            </div>
          </div>

          <div className="card mt-3">
            <div className="card-header">
              <h5 className="mb-0">Properties</h5>
            </div>
            <div className="card-body">
              {propertyFiles.length === 0 ? (
                <p className="text-muted text-center">
                  No properties added yet.
                </p>
              ) : (
                propertyFiles.map((file, index) => (
                  <div
                    key={index}
                    className="d-flex justify-content-between align-items-center mb-2"
                  >
                    <a href="#" className="text-decoration-underline">
                      {file.name}
                    </a>
                    <span>{file.date}</span>
                    <i
                      className="bi bi-trash-fill text-danger"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleDeletePropertyFile(index)}
                    ></i>
                  </div>
                ))
              )}

              <div className="hstack d-flex justify-content-center mt-3">
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handlePropertyFileChange}
                />
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    fileInputRef.current.click();
                  }}
                >
                  <i className="bi bi-house-add fs-2"></i>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 fw-bold" style={{ color: "#4e73df" }}>
                Messages
              </h6>
            </div>
            <ul className="list-group list-group-flush">
              {messages.length > 0 ? (
                messages.map((message, index) => (
                  <li key={index} className="list-group-item">
                    <small className="text-muted float-end">
                      {new Date(message.timestamp).toLocaleString()}
                    </small>
                    <p className="mb-1">{message.text}</p>
                  </li>
                ))
              ) : (
                <li className="list-group-item text-muted">No messages yet.</li>
              )}
              <li className="list-group-item">
                <div className="vstack mb-2">
                  <textarea
                    className="form-control"
                    rows="2"
                    placeholder="Type your message here..."
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                  ></textarea>
                </div>
                <button
                  className="btn"
                  style={{
                    backgroundColor: "#4e73df",
                    color: "white",
                    borderColor: "#4e73df",
                  }}
                  type="button"
                  onClick={handleSendMessage}
                >
                  Send
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lead;
