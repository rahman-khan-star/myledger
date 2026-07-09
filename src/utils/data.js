export const mockParties = [
  { id:1, name:'Rajesh Industries', type:'business', phone:'+91 98765 43210', balance:45000, status:'active' },
  { id:2, name:'Priya Sharma', type:'individual', phone:'+91 87654 32109', balance:-12500, status:'active' },
  { id:3, name:'Global Traders', type:'business', phone:'+91 76543 21098', balance:78500, status:'active' },
  { id:4, name:'Amit Patel', type:'individual', phone:'+91 65432 10987', balance:0, status:'inactive' },
  { id:5, name:'Mahesh Exports', type:'business', phone:'+91 54321 09876', balance:-32000, status:'active' },
  { id:6, name:'Sneha Reddy', type:'individual', phone:'+91 43210 98765', balance:15750, status:'active' },
];

export const mockEntries = [
  { id:1, date:'2026-07-08', partyId:1, partyName:'Rajesh Industries', type:'income', amount:25000, description:'Payment for July invoice', paymentMethod:'bank', addedBy:'Admin User' },
  { id:2, date:'2026-07-08', partyId:2, partyName:'Priya Sharma', type:'expense', amount:5000, description:'Consulting fee', paymentMethod:'cash', addedBy:'Admin User' },
  { id:3, date:'2026-07-07', partyId:3, partyName:'Global Traders', type:'loan_given', amount:50000, description:'Working capital loan', paymentMethod:'bank', addedBy:'Admin User' },
  { id:4, date:'2026-07-07', partyId:4, partyName:'Amit Patel', type:'loan_repayment', amount:10000, description:'Partial repayment of loan', paymentMethod:'online', addedBy:'Admin User' },
  { id:5, date:'2026-07-06', partyId:5, partyName:'Mahesh Exports', type:'income', amount:35000, description:'Export order payment', paymentMethod:'bank', addedBy:'Admin User' },
  { id:6, date:'2026-07-06', partyId:6, partyName:'Sneha Reddy', type:'expense', amount:8000, description:'Marketing expense', paymentMethod:'online', addedBy:'Admin User' },
  { id:7, date:'2026-07-05', partyId:1, partyName:'Rajesh Industries', type:'loan_repayment', amount:15000, description:'Loan repayment received', paymentMethod:'bank', addedBy:'Admin User' },
  { id:8, date:'2026-07-05', partyId:3, partyName:'Global Traders', type:'income', amount:42000, description:'Bulk order payment', paymentMethod:'bank', addedBy:'Admin User' },
];

export const mockUser = { id:1, name:'Admin User', email:'admin@myledger.com', role:'Admin', phone:'+91 99999 88888' };

export const weeklyData = [
  { day:'Mon', income:45000, expense:12000 },
  { day:'Tue', income:32000, expense:8500 },
  { day:'Wed', income:58000, expense:15000 },
  { day:'Thu', income:25000, expense:22000 },
  { day:'Fri', income:67000, expense:18000 },
  { day:'Sat', income:42000, expense:9500 },
  { day:'Sun', income:0, expense:0 },
];