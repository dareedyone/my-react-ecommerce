import React, { Component } from "react";
import axios from "axios";
class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      catname: []
    };

    this.myref = React.createRef();
  }

  handleSubmit = event => {
    event.preventDefault();
    // console.log(this.myref.current);
    let a = new FormData(this.myref.current);

    axios({
      url:
        "http://localhost:80/react_ecommerce/src/components/assets/includes/product.php",
      method: "post",
      headers: {
        "Content-type": "multipart/form-data"
      },
      data: a
    })
      .then(res => {
        let alert = document.getElementById("myAlert");
        // console.log(res.data);
        alert.innerHTML = res.data;
        if (res.data.trim().match("successfully")) {
          alert.classList.remove("d-none", "alert-danger");
          alert.classList.add("d-block", "alert-success");
          document.getElementById("pname").value = "";
          document.getElementById("pprice").value = "";
          document.getElementById("pquantity").value = "";
          document.getElementById("ppicture").value = "";
        } else {
          alert.innerHTML = res.data;
          alert.classList.remove("d-none", "alert-success");
          alert.classList.add("d-block", "alert-danger");
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  componentDidMount() {
    const axios = require("axios");
    axios
      .get("http://localhost:80/react_ecommerce/backend/loadcategory.php")
      .then(response => {
        // console.log(response);
        // console.log(response.data);
        this.setState({
          catname: response.data
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    return (
      <React.Fragment>
        <h2>Product</h2>
        <h4 className="mt-4">Add Product Details</h4>
        <div id="myAlert" className="alert m-0 py-0 my-2 d-none w-25"></div>
        <form
          onSubmit={this.handleSubmit}
          className="form-data"
          ref={this.myref}
        >
          <input
            id="pname"
            type="text"
            required
            placeholder="Product name"
            name="pname"
            className="border px-1 border-dark rounded mb-3"
          />{" "}
          <br />
          <input
            id="pprice"
            name="pprice"
            type="text"
            required
            placeholder="Product Price"
            className="border px-1 border-dark rounded mb-3"
          />{" "}
          <br />
          <input
            id="pquantity"
            name="pquantity"
            type="number"
            required
            placeholder="Product Quantity"
            className="border px-1 border-dark rounded mb-3"
          />{" "}
          <br />
          <input
            id="ppicture"
            name="ppicture"
            type="file"
            required
            placeholder="Product picture"
            className="border border-dark rounded mb-3"
          />{" "}
          <br />
          <select required name="catid" id="catid">
            {this.state.catname.map(name => (
              <option key={name.category_name} value={name.cat_id}>
                {name.category_name}
              </option>
            ))}
          </select>
          <input
            id="fsbmit"
            name="fsubmit"
            type="submit"
            value="submit"
            className="btn btn-dark py-1 ml-1"
            required
          />
        </form>
      </React.Fragment>
    );
  }
}

export default Product;
