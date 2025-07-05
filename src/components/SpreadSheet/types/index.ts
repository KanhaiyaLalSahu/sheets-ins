// src/types/index.ts
export interface Task {
  id: number;
  jobRequest: string;
  submitted: string;
  status: 'In-progress' | 'Need to start' | 'Complete' | 'Blocked';
  submitter: string;
  url: string;
  assigned: string;
  priority: 'High' | 'Medium' | 'Low';
  dueDate: string;
  estValue: string;
}


export interface Column {
  id: string;
  header: string;
  accessor: keyof Task; 
  width: number;
  visible: boolean;
}
