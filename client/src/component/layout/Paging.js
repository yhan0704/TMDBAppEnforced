import * as React from "react";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function Paging(props) {
  const [page, setPage] = React.useState(props.number);
  const handleChange = (event, value) => {
    props.setNumber(value);
  };
  return (
    <>
      <div className="pagingBox">
        <Stack spacing={2}>
          <Pagination
            count={props.totalPage}
            page={props.number}
            onChange={handleChange}
          />
        </Stack>
      </div>
    </>
  );
}
