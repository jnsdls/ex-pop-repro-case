import {
  ThirdwebProvider,
  ConnectWallet,
  metamaskWallet,
} from "@thirdweb-dev/react";

function App() {
  return (
    <ThirdwebProvider
      supportedWallets={[metamaskWallet()]}
      authConfig={{
        domain: "http://localhost:5173",
        authUrl: "http://localhost:8089/auth",
      }}
      clientId="24b63e5203cff330c6b8cfb5aa4d55a7"
    >
      <>
        <ConnectWallet />
        <button
          onClick={() => {
            fetch("http://localhost:8089/test", {
              method: "GET",
              // crucially set the credentials to include so that the auth cookie is sent with this request!
              credentials: "include",
            })
              .then((res) => res.json())
              .then((data) => {
                console.log("data", data);
              });
          }}
        >
          call "/test" endpoint
        </button>
      </>
    </ThirdwebProvider>
  );
}

export default App;
