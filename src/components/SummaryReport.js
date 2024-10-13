'use client';

import React, { useState, useEffect } from 'react';

export default function SummaryReport() {
  const [summaries, setSummaries] = useState(null);

  useEffect(() => {
    // Simulate an API request
    const fetchData = async () => {
      // Replace this with your actual API request
      const response = await fetch('http://127.0.0.1:8000/summary-report');
      const data = await response.json();
      setSummaries(data);
    };

    fetchData();
  }, []);

  if (!summaries) {
    return (
      <div><div className="text-2xl text-primary">Overall Summary</div><div>Retrieving latest summary report...</div></div>
    );
  }

  const { overall_summary, weekly_summaries } = summaries;

  // Sort the weekly summaries by week number in descending order
  const sortedWeeklySummaries = Object.entries(weekly_summaries)
    .sort(([weekA], [weekB]) => parseInt(weekB) - parseInt(weekA));

  return (
    <div className="overflow-y-auto">
      <h2 className='text-2xl text-primary'>Overall Summary</h2>
      <p>{overall_summary}</p>

      {sortedWeeklySummaries.map(([week, summary]) => (
        <div key={week}>
          <h3 className='text-xl text-primary'>Week {week}</h3>
          <p className='text-lg'>{summary}</p>
          <p>Hello! I'm Max Academy AI. How can I help you today? By now, you should have a foundational understanding of Large Language Models (LLMs), including their stateless nature and the importance of efficient web server interactions. As you reflect on the insights shared by Tim regarding performance testing and GPU rental options, consider how these elements might influence your future projects. Are you beginning to see the practical applications of LLM technology in your own work? Make sure to review the concepts of retrieval augmented generation (RAG) and semantic matching, as they will be crucial for your understanding moving forward. As you continue through the bootcamp, think about how you can apply the collaborative learning environment to enhance your grasp of these topics. What questions do you have about the implementation of LLMs in real-world scenarios? Your active participation will be key to your success in this program. Let's get started!</p>
        </div>
      ))}
    </div>
  );
}