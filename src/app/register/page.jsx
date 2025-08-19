"use client";
import React from "react";
import { Images } from "@/assets/assets";

const Register = () => {
  return (
    <div className="bg-gradient-primary" style={{ minHeight: "100vh" }}>
      <div className="container">
        <div className="card shadow-lg my-5 o-hidden border-0">
          <div className="card-body p-0">
            <div className="row">
              <div className="col-lg-5 d-none d-lg-flex">
                <div
                  className="flex-grow-1 bg-register-image"
                  style={{
                    backgroundImage: `url(${Images.Register.src})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    width: "100%",
                  }}
                />
              </div>

              <div className="col-lg-7">
                <div className="p-5">
                  <div className="text-center">
                    <h4 className="text-dark mb-4">Create an Account!</h4>
                  </div>
                  <form className="user">
                    <div className="mb-3 row">
                      <div className="hstack gap-1 d-flex justify-content-center">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            id="formCheck-3"
                            name="title"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="formCheck-3"
                          >
                            Mr
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            id="formCheck-1"
                            name="title"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="formCheck-1"
                          >
                            Mrs
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            id="formCheck-2"
                            name="title"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="formCheck-2"
                          >
                            Ms
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="mb-3 row">
                      <div className="col-sm-6 mb-3 mb-sm-0">
                        <input
                          className="form-control form-control-user"
                          type="text"
                          id="exampleFirstName"
                          placeholder="First Name"
                          name="first_name"
                        />
                      </div>
                      <div className="col-sm-6">
                        <input
                          className="form-control form-control-user"
                          type="text"
                          id="exampleLastName"
                          placeholder="Last Name"
                          name="last_name"
                        />
                      </div>
                    </div>

                    <div className="mb-3">
                      <input
                        className="form-control form-control-user"
                        type="email"
                        id="exampleInputEmail"
                        placeholder="Mobile number"
                        name="mobile"
                      />
                    </div>

                    <div className="mb-3 row">
                      <div className="col-sm-6 mb-3 mb-sm-0">
                        <input
                          className="form-control form-control-user"
                          type="password"
                          id="examplePasswordInput"
                          placeholder="Password"
                          name="password"
                        />
                      </div>
                      <div className="col-sm-6">
                        <input
                          className="form-control form-control-user"
                          type="password"
                          id="exampleRepeatPasswordInput"
                          placeholder="Repeat Password"
                          name="password_repeat"
                        />
                      </div>
                    </div>

                    <button
                      className="btn primary text-white d-block w-100 btn-user"
                      type="submit"
                    >
                      Register Account
                    </button>
                    <hr />

                    <button
                      className="btn  secondary text-white d-block w-100 btn-user"
                      type="button"
                    >
                      <i className="bi bi-linkedin me-2"></i> Register with
                      LinkedIn
                    </button>

                    <hr />
                  </form>

                  <div className="text-center">
                    <a className="small" href="/forgot-password">
                      Forgot Password?
                    </a>
                  </div>
                  <div className="text-center">
                    <a className="small" href="/login">
                      Already have an account? Login!
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
