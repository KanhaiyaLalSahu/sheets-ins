// import type { Column, Task } from "../types";

// export const tasks: Task[] = [
//   {
//     id: 1,
//     jobRequest: "Launch social media campaign for pro...",
//     submitted: "15-11-2024",
//     status: "In-progress",
//     submitter: "Aisha Patel",
//     url: "www.aishapatel...",
//     assigned: "Sophie Choudhury",
//     priority: "Medium",
//     dueDate: "20-11-2024",
//     estValue: "6,200,000"
//   },
//   {
//     id: 2,
//     jobRequest: "Update press kit for company redesign",
//     submitted: "28-10-2024",
//     status: "Need to start",
//     submitter: "Irfan Khan",
//     url: "www.irfankhan...",
//     assigned: "Tejas Pandey",
//     priority: "High",
//     dueDate: "30-10-2024",
//     estValue: "3,500,000"
//   },
//   {
//     id: 3,
//     jobRequest: "Finalize user testing feedback for app...",
//     submitted: "05-12-2024",
//     status: "In-progress",
//     submitter: "Mark Johnson",
//     url: "www.markjohns...",
//     assigned: "Rachel Lee",
//     priority: "Medium",
//     dueDate: "10-12-2024",
//     estValue: "4,200,000"
//   },
//   {
//     id: 4,
//     jobRequest: "Design new features for the website",
//     submitted: "12-01-2025",
//     status: "Complete",
//     submitter: "Emily Green",
//     url: "www.emilygreen...",
//     assigned: "Tom Wright",
//     priority: "Low",
//     dueDate: "15-01-2025",
//     estValue: "5,900,000"
//   },
//   {
//     id: 5,
//     jobRequest: "Prepare financial report for Q4",
//     submitted: "25-01-2025",
//     status: "Blocked",
//     submitter: "Jessica Brown",
//     url: "www.jessicabro...",
//     assigned: "Kevin Smith",
//     priority: "Low",
//     dueDate: "30-01-2025",
//     estValue: "2,800,000"
//   },
// ];

// export const columns: Column[] = [
//   { id: "jobRequest", header: "Job Request", accessor: "jobRequest", width: 220, visible: true },
//   { id: "submitted", header: "Submitted", accessor: "submitted", width: 120, visible: true },
//   { id: "status", header: "Status", accessor: "status", width: 140, visible: true },
//   { id: "submitter", header: "Submitter", accessor: "submitter", width: 140, visible: true },
//   { id: "url", header: "URL", accessor: "url", width: 180, visible: true },
//   { id: "assigned", header: "Assigned", accessor: "assigned", width: 140, visible: true },
//   { id: "priority", header: "Priority", accessor: "priority", width: 100, visible: true },
//   { id: "dueDate", header: "Due Date", accessor: "dueDate", width: 120, visible: true },
//   { id: "estValue", header: "Est. Value", accessor: "estValue", width: 120, visible: true },
// ];

// export const columnGroups = [
//   {
//     id: "overview",
//     label: "Q3 Financial Overview",
//     color: "#FEEBC8",
//     columnIds: ["jobRequest", "submitted", "status", "submitter", "url"],
//   },
//   {
//     id: "assignment",
//     label: "Assignment",
//     color: "#E9D8FD",
//     columnIds: ["assigned"],
//   },
//   {
//     id: "details",
//     label: "Details",
//     color: "#FED7D7",
//     columnIds: ["priority", "dueDate", "estValue"],
//   },
// ];