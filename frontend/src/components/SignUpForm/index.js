import { Component } from "react";

import "./index.css";

class SignUpForm extends Component {
  state = {
    username: "",
    password: "",
    name: "",
    gender: "",
    showSubmitError: false,
    errorMsg: "",
  };

  onChangeUsername = (event) => {
    this.setState({ username: event.target.value });
  };

  onChangePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  onChangeName = (event) => {
    this.setState({ name: event.target.value });
  };

  onChangeGender = (event) => {
    this.setState({ gender: event.target.value });
  };

  onSubmitFailure = (errorMsg) => {
    console.log(errorMsg);
    this.setState({ showSubmitError: true, errorMsg });
  };

  onClickLoginPage = () => {
    const { history } = this.props;
    history.replace("/login");
  };

  submitForm = async (event) => {
    event.preventDefault();
    const { username, password, name, gender } = this.state;
    const { history } = this.props;
    const userDetails = { username, password, name, gender };

    const url = "http://localhost:3001/register/";
    const options = {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(userDetails),
    };
    const response = await fetch(url, options);
    const data = await response.json();

    if (response.ok === true) {
      history.replace("/login");
    } else {
      this.onSubmitFailure(data.error_msg);
    }
  };

  renderPasswordField = () => {
    const { password } = this.state;
    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="input-field"
          value={password}
          onChange={this.onChangePassword}
          placeholder="Password"
        />
      </>
    );
  };

  renderUsernameField = () => {
    const { username } = this.state;
    return (
      <>
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="input-field"
          value={username}
          onChange={this.onChangeUsername}
          placeholder="Username"
        />
      </>
    );
  };

  renderNameField = () => {
    const { name } = this.state;
    return (
      <>
        <label className="input-label" htmlFor="name">
          NAME
        </label>
        <input
          type="text"
          id="name"
          className="input-field"
          value={name}
          onChange={this.onChangeName}
          placeholder="Name"
        />
      </>
    );
  };

  renderGenderField = () => {
    const { gender } = this.state;
    return (
      <>
        <label className="input-label" htmlFor="gender">
          GENDER
        </label>
        <select
          type="text"
          id="gender"
          className="input-field"
          value={gender}
          onChange={this.onChangeGender}
        >
          <option value="Female">Female</option>
          <option value="Male">Male</option>
        </select>
      </>
    );
  };

  render() {
    const { showSubmitError, errorMsg } = this.state;
    return (
      <div className="login-form-container">
        <h1>Enter your Details</h1>
        <form className="form-container" onSubmit={this.submitForm}>
          <div className="input-container">{this.renderUsernameField()}</div>
          <div className="input-container">{this.renderPasswordField()}</div>
          <div className="input-container">{this.renderNameField()}</div>
          <div className="input-container">{this.renderGenderField()}</div>
          <button type="submit" className="login-button">
            Submit Details
          </button>
          {showSubmitError && <p className="error-message">*{errorMsg}</p>}
        </form>
        <h4 className="login-page-text" onClick={this.onClickLoginPage}>
          LoginPage
        </h4>
      </div>
    );
  }
}

export default SignUpForm;
