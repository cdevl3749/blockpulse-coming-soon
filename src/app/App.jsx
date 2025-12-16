import { Outlet } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import TrustBar from "../components/trust/TrustBar";

export default function AppLayout() {
  return (
    <>
      <Header />
      <TrustBar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
