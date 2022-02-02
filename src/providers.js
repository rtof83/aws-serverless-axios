import React from "react";
import App from "./App";
import Provider from "./providers/provider";

const Providers = () => {
  return (
    <main>
      <Provider>
        <App />
      </Provider>
    </main>
  );
};

export default Providers;