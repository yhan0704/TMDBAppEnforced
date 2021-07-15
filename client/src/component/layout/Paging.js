import React from "react";
import CustomPagination from "@material-ui/lab/Pagination";

export default function Paging(props) {
  return (
    <div className="pagingBox">
      <CustomPagination
        count={props.totalPage}
        color="primary"
        onChange={(e) => {
          props.setNumber(Number(e.target.textContent));
        }}
        hideNextButton
        hidePrevButton
      />
    </div>
  );
}
