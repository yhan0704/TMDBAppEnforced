import React, { useState } from "react";
import Genre from "./Genre";

export default function Mystery() {
  const [state] = useState(9648);
  return (
    <div>
      <Genre genreId={state} />
    </div>
  );
}
