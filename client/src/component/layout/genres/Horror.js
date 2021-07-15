import React, { useState } from "react";
import Genre from "./Genre";

export default function Horror() {
  const [state] = useState(27);
  return (
    <div>
      <Genre genreId={state} />
    </div>
  );
}
