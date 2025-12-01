export type Role = 'government' | 'citizen' | 'institution' | 'college' | 'other';

export interface UserSession {
  role: Role;
  name: string;
  details?: string;
  avatar: string;
}

export interface Activity {
  id: string;
  user: string;
  type: string;
  category: string;
  ep: number;
  co2: number;
  status: 'Approved' | 'Pending' | 'Flagged';
  date: string;
  lat?: number;
  lon?: number;
}
