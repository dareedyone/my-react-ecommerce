import React, { Component } from "react";
import Item from "./Item";
class Categories extends Component {
  render() {
    return (
      <React.Fragment>
        <h3 className="text-center">Categories</h3>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              {/* {console.log(this.props.categories)} */}
              {this.props.categories.map((category, index) => (
                <div key={index}>
                  <h3>{category.cat_name}</h3>
                  <div className="row">
                    {category.items.map((c, i) => (
                      <Item
                        key={i}
                        details={c}
                        handleCart={this.props.handleCart}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Categories;
