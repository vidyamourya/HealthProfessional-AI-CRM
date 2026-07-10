import { useState } from "react";
import InteractionForm from "../components/InteractionForm";
import ChatBox from "../components/ChatBox";
import HistoryTable from "../components/HistoryTable";
import DashboardCards from "../components/DashboardCards";

function Home() {

  const [aiResponse, setAiResponse] = useState("");

  return (
    <div className="container-fluid py-4">

      <h2 className="text-center fw-bold mb-4">
        AI CRM - HCP Module
      </h2>

      <DashboardCards />

      <div className="row">

        <div className="col-lg-8">
          <InteractionForm setAiResponse={setAiResponse} />
        </div>

        <div className="col-lg-4">
          <ChatBox aiResponse={aiResponse} />
        </div>

      </div>

      <HistoryTable />

    </div>
  );
}

export default Home;