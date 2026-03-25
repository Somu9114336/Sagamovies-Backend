import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function MainLayout() {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,_rgba(120,12,12,0.12),_transparent_16%),linear-gradient(180deg,_#090909_0%,_#050505_100%)]">
      <Navbar />
      <main className="mx-auto w-full max-w-[1380px] px-3 py-5 sm:px-4 lg:px-6">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
