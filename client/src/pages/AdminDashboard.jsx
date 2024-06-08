import { useEffect, useState } from "react";

import "./AdminDashboard.css";

import { data, sampleTableData } from "../assets/data";
import * as d3 from "d3";

import {
  createLineChart,
  createCountryPieChart,
  createRegionPieChart,
  createGroupedBarChart,
} from "../assets/AllCharts";

import Table from "../components/Table";
import Calendar from "../components/calender/Calender";
import KanbanBoard from "../components/KanbanBoard/KanbanBoard";
const AdminDashboard = () => {
  // count unique values to display in header section
  const [lightTheme, setLightTheme] = useState(true);
  const toggleTheme = () => {
    setLightTheme(!lightTheme);
    console.log(lightTheme);
  };
  const countUniqueValues = (key) => {
    return [...new Set(data.map((item) => item[key]).filter(Boolean))].length;
  };

  const uniqueTopicsCount = countUniqueValues("topic");
  const uniqueSectorsCount = countUniqueValues("sector");
  const uniqueCountriesCount = countUniqueValues("country");
  const uniqueRegionsCount = countUniqueValues("region");

  const createCharts = (data) => {
    const yearFilteredData = data.filter((d) => d.start_year && d.relevance);
    d3.select("#yearRelevance").selectAll("*").remove();
    createLineChart(
      yearFilteredData,
      "#yearRelevance",
      "start_year",
      "relevance",
      "Year",
      "Relevance"
    );

    createCountryPieChart(data, "#country-pie-chart", 400, 400);
    createRegionPieChart(data, "#region-pie-chart", 400, 400);

    d3.select("#groupedBarChart").selectAll("*").remove();
    createGroupedBarChart(
      data,
      "#groupedBarChart",
      "sector",
      "intensity",
      "likelihood",
      "Sector",
      "Value"
    );
  };

  useEffect(() => {
    createCharts(data);
  }, []);

  useEffect(() => {
    // SIDEBAR TOGGLE
    let sidebarOpen = false;
    const sidebar = document.getElementById("sidebar");

    const openSidebar = () => {
      if (!sidebarOpen) {
        sidebar.classList.add("sidebar-responsive");
        sidebarOpen = true;
      }
    };

    const closeSidebar = () => {
      if (sidebarOpen) {
        sidebar.classList.remove("sidebar-responsive");
        sidebarOpen = false;
      }
    };

    window.openSidebar = openSidebar;
    window.closeSidebar = closeSidebar;
  }, []);
  // l
  return (
    <div>
      <div className="grid-container">
        {/* <!-- Header --> */}
        <header className={"header"}>
          <div className="menu-icon" onClick={() => window.openSidebar()}>
            <span className="sidebarTab">
              <i class="fa-solid fa-bars"></i>
            </span>
          </div>
          <div className="header-left">
            <span className="sidebarTab">
              <input type="text" placeholder="Search" name="" id="" />
            </span>
          </div>
          <div className="header-right">
            <span className="sidebarTab">
              {lightTheme === true ? (
                <i class="fa-regular fa-moon" onClick={toggleTheme}></i>
              ) : (
                <i class="fa-solid fa-sun" onClick={toggleTheme}></i>
              )}
            </span>
            <span className="sidebarTab">
              <i class="fa-regular fa-bell"></i>
            </span>
            <span className="sidebarTab">
              <i class="fa-regular fa-envelope"></i>
            </span>
            <span className="sidebarTab">
              <i class="fa-regular fa-user"></i>
            </span>
          </div>
        </header>
        {/* <!-- End Header --> */}

        {/* <!-- Sidebar --> */}
        <aside id="sidebar">
          <div className="sidebar-title">
            <div className="sidebar-brand">
              <span className="sidebarTab">Ritik Singh</span>
            </div>
            <span className="sidebarTab" onClick={() => window.closeSidebar()}>
              <i class="fa-solid fa-xmark"></i>
            </span>
          </div>

          <ul className="sidebar-list">
            <li className="sidebar-list-item">
              <a href="#">
                <span className="sidebarTab">Home</span>
              </a>
            </li>
            <li className="sidebar-list-item">
              <a href="#" target="_blank">
                <span className="sidebarTab">About</span>
              </a>
            </li>
            <li className="sidebar-list-item">
              <a href="#" target="_blank">
                <span className="sidebarTab">Services</span>
              </a>
            </li>
            <li className="sidebar-list-item">
              <a href="#" target="_blank">
                <span className="sidebarTab">Cart</span>
              </a>
            </li>
            <li className="sidebar-list-item">
              <a href="#" target="_blank">
                <span className="sidebarTab">Products</span>
              </a>
            </li>
            <li className="sidebar-list-item">
              <a href="#" target="_blank">
                <span className="sidebarTab">Reports</span>
              </a>
            </li>
            <li className="sidebar-list-item">
              <a href="#" target="_blank">
                <span className="sidebarTab">Settings</span>
              </a>
            </li>
          </ul>
        </aside>
        {/* <!-- End Sidebar --> */}

        {/* <!-- Main --> */}
        <main
          className={
            lightTheme === true
              ? "main-container  light-theme"
              : "main-container dark-theme"
          }
        >
          <div className="main-title">
            <p className="font-weight-bold">Data Visualization Dashboard</p>
          </div>

          <div className="main-cards">
            <div className="card">
              <div className="card-inner">
                <p className="text-primary">TOPICS</p>
              </div>
              <span className="text-primary font-weight-bold">
                {uniqueTopicsCount}
              </span>
            </div>

            <div className="card">
              <div className="card-inner">
                <p className="text-primary">SECTORS</p>
              </div>
              <span className="text-primary font-weight-bold">
                {uniqueSectorsCount}
              </span>
            </div>

            <div className="card">
              <div className="card-inner">
                <p className="text-primary">REGIONS</p>
              </div>
              <span className="text-primary font-weight-bold">
                {uniqueRegionsCount}
              </span>
            </div>

            <div className="card">
              <div className="card-inner">
                <p className="text-primary">COUNTRIES</p>
              </div>
              <span className="text-primary font-weight-bold">
                {uniqueCountriesCount}
              </span>
            </div>
          </div>

          {/* filter options */}

          <div className="charts">
            <div>
              <div className="pieCharts">
                <div className="charts-card">
                  <p className="chart-title">Regions</p>
                  <div id="region-pie-chart"></div>
                </div>
                <div className="charts-card">
                  <p className="chart-title">Countries</p>
                  <div id="country-pie-chart"></div>
                </div>
              </div>
            </div>
            <div className="charts-card">
              <p className="chart-title">Sector Vs Relevance</p>
              <div id="groupedBarChart"></div>
            </div>
            <div className="charts-card">
              <p className="chart-title">Year Vs Relevance </p>
              <div id="yearRelevance"></div>
            </div>

            <div className="charts-card">
              <p className="chart-title">Calendar </p>
              <Calendar />
            </div>
            <div className="charts-card">
              <p className="chart-title">Kanban Board </p>
              <KanbanBoard />
            </div>
            <div className="charts-card">
              <Table data={sampleTableData}></Table>
            </div>
          </div>
        </main>
        {/* <!-- End Main --> */}
      </div>
    </div>
  );
};

export default AdminDashboard;
