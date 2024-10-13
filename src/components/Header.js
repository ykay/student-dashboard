import { FaUser } from "react-icons/fa";

export default function Header() {
  const currentDate = new Date()
    .toLocaleString("default", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
    .toUpperCase();

  return (
    <div>
      <div className="flex pt-3 px-3 tracking-widest">
        <h1 className="inline-block bg-gradient-to-r text-secondary bg-clip-text text-3xl">
          STUDENT DASHBOARD.ai
        </h1>
        <div className="flex-grow" />
        <button className="px-4 py-2 rounded text-primary text-1xl">
          <FaUser />
        </button>
      </div>
      <p className="text-primary text-xs px-3">{currentDate}</p>
    </div>
  );
}