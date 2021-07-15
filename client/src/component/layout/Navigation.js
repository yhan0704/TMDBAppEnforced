import React from "react";
import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <div className="navBox">
      <Link to="/">
        <li>Popular</li>
      </Link>

      <Link to="/romance">
        <li>Romance</li>
      </Link>

      <Link to="/action">
        <li>Action</li>
      </Link>

      <Link to="/mystery">
        <li>Mystery</li>
      </Link>

      <Link to="/horror">
        <li>Horror </li>
      </Link>

      <Link to="/comedy">
        <li>Comedy </li>
      </Link>
    </div>
  );
}
