import { useAddress, useSDK } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import SignIn from "../components/SignIn";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const address = useAddress(); // Get the user's address
  const { data: session } = useSession(); // Get the user's session which contains the user's address
  const sdk = useSDK(); // Get the Thirdweb SDK

  async function requestGrantRole() {
    // First, login and sign a message
    const domain = "example.com"; // This is the domain of your dApp
    const loginPayload = await sdk?.auth.login(domain); // This will open a modal to login and sign a message
    // Then make a request to our API endpoint.
    try {
      const response = await fetch("/api/grant-role", {
        method: "POST",
        body: JSON.stringify({
          loginPayload, // This is the payload you got from the login step
        }),
      });
      const data = await response.json();
      console.log(data);
      alert("Check the console for the response!"); 
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div>
      <div className={styles.container} style={{ marginTop: 0 }}>
        <SignIn />

        {address && session && (
          <div className={styles.collectionContainer}>
            <button className={styles.mainButton} onClick={requestGrantRole}>
              Give me the role!
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
