const axios = require("axios");
// const User = require("../");
const { promisify } = require("util");





exports.getUser = (req, res) => {
  console.log("protected accesed");

  const user = req.user;

  res.json({
    user,
  });
};

exports.getFrontUser = async (token) => {
  console.log("componentmounted", token);
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(
      "https://cors-anywhere.herokuapp.com/https://iguyra.herokuapp.com/api/users/cart",
      config
    );
    return data;
  } catch (err) {
    console.log(err);
  }
}
