import React, { useState } from "react";
import { FaSearch, FaFilter } from "react-icons/fa";

const ListOfCenters = () => {
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const centersData = [
    { id: "#12594", name: "Co-Creation Hub, Lagos", applicants: 346, newApplicants: 33 },
    { id: "#12594", name: "IT Hub Central, Kano", applicants: 230, newApplicants: 78 },
    { id: "#12594", name: "Colab Innovation Hub, Kaduna", applicants: 320, newApplicants: 105 },
    { id: "#12594", name: "IDEA Hub, Abuja", applicants: 102, newApplicants: 32 },
    { id: "#12594", name: "Spark Incubator, Port Harcourt", applicants: 204, newApplicants: 56 },
    { id: "#12594", name: "Decagon, Lagos", applicants: 789, newApplicants: 112 },
  ];

  // Filter and sort centers based on search query
  const filteredCenters = centersData
    .filter((center) => center.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => (sortOrder === "asc" ? a.applicants - b.applicants : b.applicants - a.applicants));

  return (
    <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl shadow-md">
      {/* Title */}
      <div className="text-xl font-semibold mb-2">List of Centers</div>

      {/* Search & Filter */}
      <div className="flex justify-between mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search centers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-lg bg-gray-100 dark:text-gray-200 dark:border-none dark:bg-main-dark-bg py-2 px-4 pl-10 w-[400px] focus:outline-none"
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
        <button onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")} className="bg-gray-100 dark:text-gray-200 dark:bg-main-dark-bg px-4 py-2 rounded-lg flex items-center">
          <FaFilter className="mr-2" /> filter
        </button>
      </div>

      {/* Table */}
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2 uppercase">ID</th>
            <th className="text-left py-2 uppercase">Center Name</th>
            <th className="text-left py-2 uppercase">Total no of Applicants</th>
          </tr>
        </thead>
        <tbody>
          {filteredCenters.map((center) => (
            <tr key={center.id} className="border-b">
              <td className="py-4">{center.id}</td>
              <td className="py-4">{center.name}</td>
              <td className="py-4 font-semibold flex items-center">
                {center.applicants}
                <span className="ml-2 bg-green-300 text-green-900 text-[11px] font-semibold px-2 py-1 rounded-full">
                  {center.newApplicants} new
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListOfCenters;
