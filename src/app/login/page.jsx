import React from "react";
import { Images } from "@/assets/assets";
const Login = () => {
  return (
    <div className="bg-gradient-primary" style={{ minHeight: "100vh" }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-9 col-lg-12 col-xl-10">
            <div className="card shadow-lg my-5 o-hidden border-0">
              <div className="card-body p-0">
                <div className="row">
                  <div className="col-lg-6 d-none d-lg-flex">
                    <div
                      className="flex-grow-1 bg-login-image"
                      style={{
                        backgroundImage: `url(${Images.Login.src})`, 
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        width: "100%",
                      }}
                    ></div>
                  </div>
                  <div className="col-lg-6">
                    <div className="p-5">
                      <div className="text-center">
                        <h4 className="text-dark mb-4">Welcome Back!</h4>
                      </div>
                      <form className="user">
                        <div className="mb-3">
                          <input
                            className="form-control form-control-user"
                            type="email"
                            id="exampleInputEmail"
                            aria-describedby="emailHelp"
                            placeholder="Enter Email Address..."
                            name="email"
                          />
                        </div>
                        <div className="mb-3">
                          <input
                            className="form-control form-control-user"
                            type="password"
                            id="exampleInputPassword"
                            placeholder="Password"
                            name="password"
                          />
                        </div>
                        <div className="mb-3">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="formCheck-1"
                            />
                            <label
                              className="form-check-label small"
                              htmlFor="formCheck-1"
                            >
                              Remember Me
                            </label>
                          </div>
                        </div>
                        <button
                          className="btn primary d-block w-100 btn-user text-white"
                          type="submit"
                        >
                          Login
                        </button>
                        <hr />
                        <button
                          className="btn secondary  d-block w-100 btn-user text-white"
                          type="button"
                        >
                          <i className="bi bi-linkedin me-2 "></i>
                          Login with LinkedIn
                        </button>
                        <hr />
                      </form>
                      <div className="text-center">
                        <a className="small" href="/forgot-password">
                          Forgot Password?
                        </a>
                      </div>
                      <div className="text-center">
                        <a className="small" href="/register">
                          Create an Account!
                        </a>
                      </div>
                    </div>
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

export default Login;
