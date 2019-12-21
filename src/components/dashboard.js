import React, { Component } from "react";
import axios from "axios";
class Dashboard extends Component {
  state = {};

  handleCat = () => {
    let catName = document.getElementById("catName").value;
    let alert = document.getElementById("myAlert");
    // console.log(catName);
    if (catName !== "") {
      axios
        .post(
          "http://localhost:80/react_ecommerce/backend/categories.php",
          { catName },
          {
            headers: {
              "Content-type": "text/plain"
            }
          }
        )
        .then(res => {
          // console.log(res);
          //   console.log(res.data);
          alert.innerHTML = res.data;
          if (res.data.trim().match("successfully")) {
            alert.classList.remove("d-none", "alert-danger");
            alert.classList.add("d-block", "alert-success");
            document.getElementById("catName").value = "";
          } else {
            alert.innerHTML = res.data;
            alert.classList.remove("d-none", "alert-success");
            alert.classList.add("d-block", "alert-danger");
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    } else {
      alert.innerHTML = "Input Empty !";
      alert.classList.remove("d-none", "alert-success");
      alert.classList.add("d-block", "alert-danger");
    }
  };
  render() {
    return (
      <React.Fragment>
        <h2>Categories</h2>
        <h4 className="mt-4">Add Category name</h4>
        <div id="myAlert" className="alert m-0 py-0 my-2 d-none w-50"></div>
        <div className="d-flex">
          <input
            id="catName"
            type="text"
            required
            className="border border-dark rounded px-1"
          />
          <input
            onClick={this.handleCat}
            id="catSubmit"
            type="submit"
            value="submit"
            className="btn btn-dark py-1 ml-1"
            required
          />
        </div>
      </React.Fragment>
    );
  }
}

export default Dashboard;
