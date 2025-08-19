import React from "react";

const Profile = () => {
  return (
    <div className="container-fluid">
      <h3 className="text-dark mb-4">Profile</h3>
      <div className="row mb-3">
        <div className="col-lg-4">
          <div className="card mb-3">
            <div className="card-body text-center shadow">
              <img
                className="rounded-circle mt-4 mb-3"
                src="/assets/img/dogs/image2.jpeg"
                width="160"
                height="160"
                alt="Profile"
              />
              <div className="mb-3">
                <button className="btn btn-primary btn-sm" type="button">
                  Change Photo
                </button>
              </div>
            </div>
          </div>

          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="text-primary m-0 fw-bold">Projects</h6>
            </div>
            <div className="card-body">
              {[
                { name: "Server migration", percent: 20, class: "bg-danger" },
                { name: "Sales tracking", percent: 40, class: "bg-warning" },
                { name: "Customer Database", percent: 60, class: "bg-primary" },
                { name: "Payout Details", percent: 80, class: "bg-info" },
                { name: "Account setup", percent: 100, class: "bg-success" },
              ].map((proj, idx) => (
                <div key={idx}>
                  <h4 className="small fw-bold">
                    {proj.name}
                    <span className="float-end">
                      {proj.percent === 100 ? "Complete!" : `${proj.percent}%`}
                    </span>
                  </h4>
                  <div className="progress mb-3 progress-sm">
                    <div
                      className={`progress-bar ${proj.class}`}
                      role="progressbar"
                      style={{ width: `${proj.percent}%` }}
                      aria-valuenow={proj.percent}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    >
                      <span className="visually-hidden">{proj.percent}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-lg-8">
          <div className="card shadow mb-3">
            <div className="card-header py-3">
              <p className="text-primary m-0 fw-bold">User Settings</p>
            </div>
            <div className="card-body">
              <form>
                <div className="row">
                  <div className="col">
                    <div className="mb-3">
                      <label className="form-label" htmlFor="username">
                        <strong>Username</strong>
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        id="username"
                        placeholder="user.name"
                        name="username"
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="mb-3">
                      <label className="form-label" htmlFor="email">
                        <strong>Email Address</strong>
                      </label>
                      <input
                        className="form-control"
                        type="email"
                        id="email"
                        placeholder="user@example.com"
                        name="email"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <div className="mb-3">
                      <label className="form-label" htmlFor="first_name">
                        <strong>First Name</strong>
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        id="first_name"
                        placeholder="John"
                        name="first_name"
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="mb-3">
                      <label className="form-label" htmlFor="last_name">
                        <strong>Last Name</strong>
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        id="last_name"
                        placeholder="Doe"
                        name="last_name"
                      />
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <button className="btn btn-primary btn-sm" type="submit">
                    Save Settings
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="card shadow">
            <div className="card-header py-3">
              <p className="text-primary m-0 fw-bold">Contact Settings</p>
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
                    placeholder="Sunset Blvd, 38"
                    name="address"
                  />
                </div>
                <div className="row">
                  <div className="col">
                    <div className="mb-3">
                      <label className="form-label" htmlFor="city">
                        <strong>City</strong>
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        id="city"
                        placeholder="Los Angeles"
                        name="city"
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
                        placeholder="USA"
                        name="country"
                      />
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <button className="btn btn-primary btn-sm" type="submit">
                    Save&nbsp;Settings
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="card shadow mb-5">
        <div className="card-header py-3">
          <p className="text-primary m-0 fw-bold">Forum Settings</p>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <form>
                <div className="mb-3">
                  <label className="form-label" htmlFor="signature">
                    <strong>Signature</strong>
                  </label>
                  <textarea
                    className="form-control"
                    id="signature"
                    rows={4}
                    name="signature"
                  ></textarea>
                </div>
                <div className="mb-3">
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="formCheck-1"
                    />
                    <label className="form-check-label" htmlFor="formCheck-1">
                      <strong>Notify me about new replies</strong>
                    </label>
                  </div>
                </div>
                <div className="mb-3">
                  <button className="btn btn-primary btn-sm" type="submit">
                    Save Settings
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
