import { useContext, useEffect, useState } from "react";
import { PersonContext } from "../App";

const SERVER = import.meta.env.VITE_SERVER;

const SettingsPage = ({ token }) => {
  const [userData, setUserData] = useState([]);
  const userID = useContext(PersonContext);
  console.log(userID);

  //* Fetch Current User Data
  useEffect(() => {
    const urlUser = `${SERVER}users/${token}/`;
    fetch(urlUser, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  }, [token]);

  return (
    <>
      <h1>Settings Page</h1>
    </>
  );
};

export default SettingsPage;
