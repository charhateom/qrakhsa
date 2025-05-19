// types.tsx
export interface Contact {
    name: string;
    relationship: string;
    phone: string;
}

export interface Location {
    lat: number;
    lng: number;
}

export interface Employee {
    id: string;
    name: string;
    bloodType: string;
    department: string;
    emergencyContacts: Contact[];
    medicalConditions: string[];
    location: Location;
}

export interface Alert {
    id: string;
    employeeId: string;
    timestamp: Date;
    status: 'active' | 'resolved';
    location: Location;
}