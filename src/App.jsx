import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Content from "./components/Content";

const App = () => {
  // State to control the Ask Question modal
  const [showModal, setShowModal] = useState(false);
  return (
    <div>
      {/* Pass handler to Navbar so it can open the modal */}
      <Navbar onAskQuestion={() => setShowModal(true)} />

      {/* Pass state + setter to Content so it can display/hide the modal */}
      <Content showModal={showModal} setShowModal={setShowModal} />
    </div>
  );
};

export default App;
