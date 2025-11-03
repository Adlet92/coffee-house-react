import React from "react";
import { ClipLoader } from "react-spinners";

type LoaderProps = {
  text?: string;
  fullPage?: boolean;
};

const Loader: React.FC<LoaderProps> = ({ text = "Loading...", fullPage }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: fullPage ? "80vh" : "auto",
      gap: "12px",
    }}
  >
    <ClipLoader color="#6F4E37" size={50} />
    <span>{text}</span>
  </div>
);

export default Loader;
