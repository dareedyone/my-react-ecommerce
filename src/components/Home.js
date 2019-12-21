import React, { Component } from "react";
import { connect } from "react-redux";
import Navbar from "./Navbar";
import Display from "./Display";
import Categories from "./Categories";
import { getItem } from "../actions";

class Home extends Component {
  constructor(props) {
    super(props);
    let a;
    if (this.props.location.state !== undefined) {
      a = this.props.location.state.id;
    } else {
      a = [];
    }

    this.state = {
      cartnumber: 0,
      cartitems: a
    };
  }

  handleCart = item => {
    let cartitems = this.state.cartitems;
    cartitems.push(item);
    this.setState({
      cartitems
    });
  };

  componentDidMount() {
    this.props.getItem();
  }
  render() {
    if (this.props.items.length) {
      return (
        <div>
          <Navbar cartitems={this.state.cartitems} />
          <Display />
          <Categories
            categories={this.props.items}
            handleCart={this.handleCart}
          />
        </div>
      );
    } else {
      return <h1>Loading...</h1>;
    }
  }
}
function mapStateToProps(state) {
  return {
    items: state.items
  };
}

// function mapDispatchToProps(dispatch) {
//   return {
//     getItem: dispatch(getItem());
//   };
// }

export default connect(mapStateToProps, { getItem: getItem })(Home);
