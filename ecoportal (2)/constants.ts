import { Activity } from './types';

export const ACTIVITIES: Activity[] = [
  {id:'#1001', user:'DELL College', type:'Institution', category:'Paper', ep:30, co2:1.2, status:'Approved', date:'12 Nov 2025', lat:19.0760, lon:72.8777},
  {id:'#1002', user:'R. Kumar', type:'Citizen', category:'Plastic', ep:12, co2:0.4, status:'Pending', date:'14 Nov 2025', lat:19.0890, lon:72.8650},
  {id:'#1003', user:'SHREE College', type:'Institution', category:'Reuse', ep:45, co2:2.1, status:'Approved', date:'16 Nov 2025', lat:19.0650, lon:72.8810},
  {id:'#1004', user:'A. Singh', type:'Citizen', category:'Energy Saving', ep:8, co2:0.8, status:'Flagged', date:'17 Nov 2025', lat:28.7041, lon:77.1025},
  {id:'#1005', user:'M. Fernandes', type:'Citizen', category:'Plantation', ep:20, co2:1.0, status:'Approved', date:'18 Nov 2025', lat:12.9716, lon:77.5946},
  {id:'#1006', user:'SHREE College', type:'Institution', category:'Plastic', ep:25, co2:1.1, status:'Pending', date:'19 Nov 2025', lat:19.0400, lon:72.8800},
  {id:'#1007', user:'S. Shah', type:'Citizen', category:'Metal', ep:15, co2:0.6, status:'Approved', date:'20 Nov 2025', lat:19.2000, lon:72.8500}
];

// Seed random data
for(let i=0; i<30; i++) {
  ACTIVITIES.push({
    id: `#R${3000+i}`,
    user: `User ${i}`,
    type: Math.random() > 0.5 ? 'Citizen' : 'Institution',
    category: ['Paper', 'Plastic', 'Metal', 'Reuse'][Math.floor(Math.random()*4)],
    ep: Math.floor(Math.random()*50) + 5,
    co2: Number((Math.random()*2).toFixed(2)),
    status: Math.random() > 0.7 ? 'Pending' : 'Approved',
    date: 'Nov 2025',
    lat: 19.0 + Math.random() * 0.5,
    lon: 72.8 + Math.random() * 0.5
  });
}

export const CATEGORY_COLORS: Record<string, string> = {
  'Paper':'#2e7d32', 'Metal':'#9e9e9e', 'Plastic':'#1976d2', 'Energy Saving':'#fb8c00',
  'Plantation':'#2e7d32','Reuse':'#f9a825','Glass':'#00bfa5','Organic':'#66bb6a','Cloth':'#ffb74d'
};
