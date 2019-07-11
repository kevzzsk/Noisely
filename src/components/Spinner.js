import React from "react";
import { Spinner } from "reactstrap";

export default () => {
  return (
    <div style={{flex:1, marginLeft:'47%', justifyContent:'center',alignItems:'center'}}>
      <Spinner
        color="dark"
        style={{ flex: 1, alignSelf: "center" }}
      />
    </div>
  );
};
