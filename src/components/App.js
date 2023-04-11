import axios from "axios";
import React from "react";
import PropTypes from "prop-types";
import VehicleCard from "./VehicleCard";
import ProductCard from "./ProductCard";
const baseURL = "http://localhost:8080/api/v1";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      showError: false,
      showProductCard: false,
      loginCheck: false,
      vehicles: [],
      products: [],
      username: "",
      password: "",
      userType: "",
      personId: 0,
    };
  }

  handleChangeUsername = (event) => {
    this.setState({ username: event.target.value });
  };

  handleChangePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  login = async () => {
    const { username, password } = this.state;
    const url = `${baseURL}/login`;

    try {
      const response = await axios.post(url, {
        userName: username,
        password: password,
      });

      this.setState({
        loginCheck: response?.data?.loginCheck,
        personId: response?.data?.personId,
        userType: response?.data?.userType,
        showError: !response?.data?.loginCheck,
      });
    } catch (error) {
      console.error(error);
    }
  };

  getVehiclesByPersonId = async () => {
    const { personId } = this.state;
    const url = `${baseURL}/vehicles?personId=${personId}`;

    try {
      const response = await axios.get(url);
      this.setState({ vehicles: response?.data });
    } catch (error) {
      console.error(error);
    }
  };

  getAllVehicles = async () => {
    const url = `${baseURL}/allVehicles`;

    try {
      const response = await axios.get(url);
      this.setState({ vehicles: response?.data, showProductCard: false });
    } catch (error) {
      console.error(error);
    }
  };

  getProducts = async () => {
    const url = `${baseURL}/allAdditionalProducts`;

    try {
      const response = await axios.get(url);
      this.setState({ products: response?.data, showProductCard: true });
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const {
      loginCheck,
      showError,
      userType,
      vehicles,
      products,
      showProductCard,
    } = this.state;

    return (
      <div className="container">
        {loginCheck ? (
          userType === "admin" ? (
            <div className="d-grid gap-2" style={{ marginTop: "3rem" }}>
              <button
                className="btn btn-primary"
                type="submit"
                onClick={this.getAllVehicles}
              >
                Show Vehicles
              </button>
              <button
                className="btn btn-primary"
                type="submit"
                onClick={this.getProducts}
              >
                Show Additional Products
              </button>
              <button
                className="btn btn-primary"
                type="submit"
                onClick={() =>
                  this.setState({
                    loginCheck: false,
                    vehicles: [],
                    products: [],
                    username: "",
                    password: "",
                    userType: "",
                    personId: 0,
                  })
                }
              >
                Logout
              </button>
              {showProductCard ? (
                <ProductCard products={products} />
              ) : (
                <VehicleCard vehicles={vehicles} />
              )}
            </div>
          ) : (
            <div className="d-grid gap-2" style={{ marginTop: "3rem" }}>
              <button
                className="btn btn-primary"
                type="submit"
                onClick={this.getVehiclesByPersonId}
              >
                Show Vehicles
              </button>
              <button
                className="btn btn-primary"
                type="submit"
                onClick={() =>
                  this.setState({
                    loginCheck: false,
                    vehicles: [],
                    username: "",
                    password: "",
                    userType: "",
                    personId: 0,
                  })
                }
              >
                Logout
              </button>
              <VehicleCard vehicles={vehicles} />
            </div>
          )
        ) : (
          <div
            className="card text-center mb-3"
            style={{
              width: "24rem",
              height: "18rem",
              marginLeft: "28rem",
              marginTop: "20rem",
              background: "turquoise",
            }}
          >
            {showError ? (
              <div className="alert alert-danger" role="alert">
                username or password is wrong.
              </div>
            ) : null}
            <div className="card-body">
              <h5 className="card-title">Login</h5>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  placeholder="Username"
                  value={this.state.username}
                  onChange={this.handleChangeUsername}
                />
                <label htmlFor="username">Username</label>
              </div>
              <div className="form-floating">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.handleChangePassword}
                />
                <label htmlFor="password">Password</label>
              </div>
              <div className="d-grid gap-2" style={{ marginTop: "3rem" }}>
                <button
                  className="btn btn-primary"
                  type="submit"
                  onClick={this.login}
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

App.propTypes = {
  vehicles: PropTypes.array,
  products: PropTypes.array,
  showError: PropTypes.bool,
  loginCheck: PropTypes.bool,
  showProductCard: PropTypes.bool,
  username: PropTypes.string,
  password: PropTypes.string,
  userType: PropTypes.string,
  personId: PropTypes.number,
};

export default App;
