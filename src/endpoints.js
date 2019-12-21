import axios from "axios";

const ENDPOINT = {
  register: (firstname, lastname, email, password1, password2, response) => {
    axios({
      method: "post",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      url: "http://localhost:80/react_ecommerce/backend/register.php",
      data: {
        firstname,
        lastname,
        email,
        password1,
        password2
      }
    })
      .then(res => {
        response(res);
        console.log(res);
      })
      .catch(err => console.log(err));
  },

  getItem: response => {
    axios
      .get(`http://localhost:80/react_ecommerce/backend/loadproduct.php`)
      .then(res => {
        response(res);
        // console.log(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  },

  verifyToken: response => {
    if (localStorage.access_key) {
      let access_key = localStorage.getItem("access_key");
      let options = {
        method: "POST",
        url: "http://localhost:80/react_ecommerce/backend/verification.php",
        data: "",
        headers: {
          Authorization: `Bearer ${access_key}`
        },
        json: true
      };
      axios(options).then(res => {
        console.log(res.data);
        response(res);
      });
    }
  }
};
export default ENDPOINT;
