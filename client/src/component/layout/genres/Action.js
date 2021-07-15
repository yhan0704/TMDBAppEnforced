import React, { useState } from "react";
import Genre from "./Genre";

export default function Action() {
  const [state] = useState(18);
  return (
    <div>
      <Genre genreId={state} />
    </div>
  );
}
