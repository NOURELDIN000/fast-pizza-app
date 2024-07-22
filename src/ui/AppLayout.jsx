import { Outlet, useNavigation } from "react-router-dom";
import Loader from "./Loader";
import Header from "./Header";
import CartOverview from "../features/cart/CartOverview";

export default function AppLayout() {
  const navigate = useNavigation();
  const isLoading = navigate.state === "loading";

  return (
    <div
      className="layout grid h-screen grid-rows-[auto_1fr_auto]"
      style={{ fontFamily: "Roboto Mono" }}
    >
      {isLoading && <Loader />}
      <Header />
      <div className="overflow-y-scroll">
        <main className="">
          <Outlet />
        </main>
      </div>
      <CartOverview />
    </div>
  );
}
