import React, { useState } from "react";
import Genre from "./Genre";

export default function Comedy() {
  const [state] = useState(35);
  return (
    <div>
      <Genre genreId={state} />
    </div>
  );
}
