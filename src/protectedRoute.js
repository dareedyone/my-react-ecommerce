// import React from "react";
// import { Route, Redirect } from "react-router-dom";
// import { connect } from "react-redux";

// // import App from "./App";

// // export const ProtectedRoute = ({
// //   component: Component,
// //   isAuthenticated,
// //   ...rest
// // }) => {
// //   console.log(isAuthenticated);
// //   return (
// //     <Route
// //       {...rest}
// //       render={props => {
// //         if (isAuthenticated) {
// //           return <Component {...props} />;
// //         } else {
// //           return (
// //             <Redirect
// //               to={{
// //                 pathname: "/login",
// //                 state: {
// //                   from: props.location
// //                 }
// //               }}
// //             />
// //           );
// //         }
// //       }}
// //     />
// //   );
// // };
// function mapStateToProps(state) {
//   return {
//     isAuthenticated: state.isAuthenticated
//   };
// }

// const ProtectedRoute = props => {
//   console.log(props);
//   const routeComponent = props => {
//     props.isAuthenticated ? (
//       <Component {...props} />
//     ) : (
//       <Redirect
//         to={{
//           pathname: "/login",
//           state: {
//             from: props.location
//           }
//         }}
//       />
//     );
//   };

//   return <Route path={path} {...rest} render={routeComponent} />;
// };

// export default connect(mapStateToProps, null)(ProtectedRoute);
