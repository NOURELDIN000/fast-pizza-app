// @ts-nocheck
import Username from "../features/user/Username";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const [query, setQuery] = useState();
  const navigate = useNavigate();
  function submit(e) {
    e.preventDefault();
    if (!query) return;
    navigate(`/order/${query}`);

    setQuery("");
  }
  return (
    <div className="bg-yellow-400 border-b border-stone-200   ">
      <div className=" container flex items-center justify-between p-4">

      <Link className="uppercase tracking-[3px] text-md sm:text-lg" to={"/"}>
        Fast Pizza {" "}
      </Link>
      <form onSubmit={submit} className=" outline-none border-none">
        <input
          className= 'w-28  rounded-full border border-yellow-300 bg-yellow-100 px-4 py-2 text-sm transition-all duration-300 placeholder:text-stone-400 focus:outline-none  focus:ring focus:ring-yellow-500 focus:ring-opacity-50 md:focus:w-72  sm:w-64 '
          
          placeholder="search order #"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>
      
      <Username/>
      
      </div>
    </div>
  );
}


// "rounded-full px-4 py-2 text-sm bg-yellow-100 placeholder:text-sm focus:outline-none focus:ring focus:ring-yellow-200
//          w-36  sm:w-64 sm:focus:w-72 "