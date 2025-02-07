import React, { useState } from "react";
import OverviewCard from "./OverviewCard";
import { Header } from '../components';

function App() {
  const [overviews, setOverviews] = useState([
    { title: "TOTAL AMOUNT SENT TO APPLICANT", totalAmount: 10650000 }, 
    { title: "TOTAL AMOUNT OF APPLICANT", totalApplications: 2860 },
    { title: "TOTAL CENTERS", totalApplications: 105 },
    { title: "VERIFIED APPLICATIONS", totalApplications: 2107, percentage: 78 },
    { title: "PENDING APPLICATION", totalApplications: 564, percentage: 53 },
    { title: "REJECTED APPLICATION", totalApplications: 189, percentage: 28 },
  ]);

  return (
    <div>
      <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl max-w-7xl p-6 space-y-8">
        <Header className="text-xl font-semibold" category="" title="Overview" />
        <div className="grid grid-cols-1 mt-6 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {overviews.map((overview, index) => (
            <div key={index} className="flex flex-col items-center">
              <OverviewCard
                title={overview.title}
                totalApplications={overview.totalApplications}
                totalAmount={index === 0 ? `${overview.totalAmount.toLocaleString()}` : undefined} // Format first card with ₦
                percentage={index >= 3 ? overview.percentage : undefined} // Exclude percentage for first 3 cards
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
