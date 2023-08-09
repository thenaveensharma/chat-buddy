import React from "react";
import { Input } from "@chakra-ui/react";
import "./CustomInput.css";
const CustomInput = (props) => {
  return <Input className="custom_input" {...props}></Input>;
};

export default CustomInput;
