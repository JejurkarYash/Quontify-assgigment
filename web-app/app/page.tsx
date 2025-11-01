import SideBar from "@/components/SideBar";
import WatchList from "@/components/WatchList";
import Image from "next/image";

export default function Home() {
  return (
    <div className=" min-h-screen items-center flex flex-row   bg-zinc-50 font-sans dark:bg-black">

      <SideBar />
      <WatchList />

    </div>
  );
}
