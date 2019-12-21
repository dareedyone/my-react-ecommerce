import React, { Component } from "react";
import Navbar from "./Navbar";
class Cart extends Component {
  constructor(props) {
    super(props);
    let a;
    if (this.props.location.state !== undefined) {
      a = this.props.location.state.id;
    } else {
      a = [];
    }

    this.state = {
      goods: a
    };
  }
  // state = {
  //   goods: this.props.location.state.id
  // };

  handleRemove = key => {
    const removedItems = this.state.goods.filter((item, i) => {
      return key !== i;
    });
    this.setState({
      goods: removedItems
    });
  };
  render() {
    return (
      <div>
        <Navbar cartitems={this.state.goods} />
        <div className="d-flex justify-content-around mb-2 mt-5">
          <h6>Your cart</h6>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Item name</th>
              <th scope="col">Image</th>
              <th scope="col">Remove</th>
            </tr>
          </thead>
          <tbody>
            {this.state.goods.map((item, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{item.itemName}</td>
                <td>
                  <img
                    className="w-50 h-25"
                    alt="item"
                    src={require(`./assets/pictures/${item.pics}`)}
                  ></img>
                </td>
                <td>
                  <button
                    onClick={() => this.handleRemove(index)}
                    className="btn btn-danger"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Cart;
