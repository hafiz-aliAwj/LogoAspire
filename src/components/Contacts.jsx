import React, { useState, useEffect, useMemo } from "react";
import { useTable, useSortBy, useFilters, useGlobalFilter } from "react-table";
import { motion, AnimatePresence } from "framer-motion";
import { CSVLink } from "react-csv";
import { format } from "date-fns";
import { FaSort, FaSortUp, FaSortDown, FaDownload, FaSearch } from "react-icons/fa";

const getAllContacts = async () => {
  try {
    const res = await fetch("/api/contact/getAll");
    const data = await res.json();
    console.log(data);
    return data.data.map((contact) => ({
      id: contact._id, // Use MongoDB _id
      email: contact.email,
      status: contact.contacted ? "contacted" : "pending",
      timestamp: contact.date,
    }));
  } catch (error) {
    console.error("Failed to fetch contacts", error);
    return [];
  }
};

const ContactManagement = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      setLoading(true);
      const contacts = await getAllContacts();
      setData(contacts);
      setLoading(false);
    };

    fetchContacts();
  }, []);

  const filteredData = useMemo(() => {
    switch (activeTab) {
      case "contacted":
        return data.filter((item) => item.status === "contacted");
      case "remaining":
        return data.filter((item) => item.status === "pending");
      default:
        return data;
    }
  }, [data, activeTab]);

  const toggleStatus = async (id) => {
    try {
      const response = await fetch(`/api/contact/update`, { method: "POST" , body: JSON.stringify({ id })});

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      setData((prevData) =>
        prevData.map((item) =>
          item.id === id
            ? { ...item, status: item.status === "contacted" ? "pending" : "contacted" }
            : item
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update contact status. Please try again.");
    }
  };

  const columns = useMemo(
    () => [
      {
        Header: "#",
        accessor: "id",
        Cell: ({ row }) => <span className="font-medium text-gray-900">{row.index + 1}</span>,
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ value }) => (
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              value === "contacted"
                ? "bg-green-100 text-green-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </span>
        ),
      },
      {
        Header: "Timestamp",
        accessor: "timestamp",
        Cell: ({ value }) => format(new Date(value), "PPpp"),
      },
      {
        Header: "Actions",
        Cell: ({ row }) => (
          <button
            onClick={() => toggleStatus(row.original.id)}
            className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-blue-600 rounded-md transition-colors duration-200"
          >
            Toggle Status
          </button>
        ),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data: filteredData,
    },
    useFilters,
    useGlobalFilter,
    useSortBy
  );

  return (
    <div className="block p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-card rounded-lg shadow-lg p-6">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-foreground mb-4 sm:mb-0">Contact Management</h1>
            <div className="flex space-x-4">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-accent" />
                <input
                  type="text"
                  placeholder="Search contacts..."
                  onChange={(e) => setGlobalFilter(e.target.value)}
                  className="pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-primary"
                />
              </div>
              <CSVLink
                data={filteredData}
                filename={`contacts-${activeTab}.csv`}
                className="flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
              >
                <FaDownload className="mr-2" />
                Export CSV
              </CSVLink>
            </div>
          </div>

          <div className="flex space-x-2 mb-6">
            {["all", "contacted", "remaining"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-md transition-all duration-200 ${
                  activeTab === tab
                    ? "bg-primary text-white"
                    : "bg-secondary text-foreground hover:bg-gray-200"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-16 bg-secondary animate-pulse rounded-md" />
                ))}
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <table {...getTableProps()} className="w-full border-collapse table-auto">
                  <thead>
                    {headerGroups.map((headerGroup) => (
                      <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                          <th
                            {...column.getHeaderProps(column.getSortByToggleProps())}
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            <div className="flex items-center space-x-1">
                              <span>{column.render("Header")}</span>
                              <span>
                                {column.isSorted ? (column.isSortedDesc ? <FaSortDown /> : <FaSortUp />) : <FaSort />}
                              </span>
                            </div>
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody {...getTableBodyProps()}>
                    {rows.map((row) => {
                      prepareRow(row);
                      return (
                        <tr {...row.getRowProps()} className="hover:bg-gray-50 transition-colors duration-200">
                          {row.cells.map((cell) => (
                            <td {...cell.getCellProps()} className="px-6 py-4 whitespace-nowrap text-sm">
                              {cell.render("Cell")}
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ContactManagement;
