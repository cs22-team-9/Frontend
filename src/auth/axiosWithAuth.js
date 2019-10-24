import axios from "axios";
const axiosWithAuth = () => {
  const token = localStorage.getItem("token");
  console.log("token", token);
  return axios.create({
    headers: {
      Authorization: "Token " + token
    }
  });
};
export default axiosWithAuth;

// import axios from "axios";

// export const axiosWithAuth = () => {
//   const token = localStorage.getItem("token");

//   return axios.create({
//     headers: {
//       Authorization: "Token " + token
//     }

//   //   const newToken = axios.create({
//   //   headers: {
//   //     Authorization: "Token " + token
//   //   }
//   // });

//   // return axios.create({
//   //   headers: {'Authorization': 'Token ' +token},
//   // });
// }
