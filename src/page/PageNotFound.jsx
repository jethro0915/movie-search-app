import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const PageNotFound = () => {
  return (
    <div className="flex flex-col gap-2 p-4">
      <Helmet>
        <title>404 page not found</title>
      </Helmet>
      <h1 className="text-3xl font-semibold">
        Sorry, the page you are looking for is not found
      </h1>
      <Link
        to="/"
        className="bg-red-600 text-slate-50 hover:bg-red-400 px-4 py-2 rounded-lg mt-5 w-fit"
      >
        Return to Home
      </Link>
    </div>
  );
};

export default PageNotFound;
