// @ts-nocheck
import React from "react";
import { useSelector } from "react-redux";

export default function Username() {
  const username = useSelector((store) => store.user.username);

  if (!username) return null;
  return <div className="max-md:hidden font-bold uppercase">{username}</div>;
}
