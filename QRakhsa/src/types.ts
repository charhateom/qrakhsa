export interface Employee {
  id: string;
  name: string;
  bloodType: string;
  emergencyContacts: EmergencyContact[];
  medicalConditions: string[];
  department: string;
  location?: {
    lat: number;
    lng: number;
  };
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
}

export interface Alert {
  id: string;
  employeeId: string;
  timestamp: Date;
  status: 'active' | 'resolved';
  location?: {
    lat: number;
    lng: number;
  };
}