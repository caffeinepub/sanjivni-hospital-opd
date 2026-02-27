export type StaffCategory = "doctor" | "nurse" | "support";

export interface StaffMember {
  id: string;
  name: string;
  category: StaffCategory;
  designation: string;
  qualification?: string;
  specialization?: string;
  opdTimings?: string;
  department: string;
  contact?: string;
  initials: string;
  avatarColor: string; // tailwind bg token suffix used for avatar
}

export const STAFF: StaffMember[] = [
  // ── Doctors ───────────────────────────────────────────────
  {
    id: "dr-ramesh-sharma",
    name: "Dr. Ramesh Sharma",
    category: "doctor",
    designation: "Senior Physician",
    qualification: "MBBS, MD",
    specialization: "General Medicine",
    opdTimings: "9:00 AM – 2:00 PM",
    department: "OPD – General Medicine",
    initials: "RS",
    avatarColor: "green",
  },
  {
    id: "dr-priya-patel",
    name: "Dr. Priya Patel",
    category: "doctor",
    designation: "Consultant Gynecologist",
    qualification: "MBBS, MS",
    specialization: "Gynecology & Obstetrics",
    opdTimings: "10:00 AM – 1:00 PM",
    department: "OPD – Gynecology",
    initials: "PP",
    avatarColor: "pink",
  },
  {
    id: "dr-anil-singh",
    name: "Dr. Anil Singh",
    category: "doctor",
    designation: "Senior Cardiologist",
    qualification: "MBBS, MD",
    specialization: "Cardiology",
    opdTimings: "11:00 AM – 3:00 PM",
    department: "OPD – Cardiology",
    initials: "AS",
    avatarColor: "red",
  },
  {
    id: "dr-neha-gupta",
    name: "Dr. Neha Gupta",
    category: "doctor",
    designation: "Pediatrician",
    qualification: "MBBS, DCH",
    specialization: "Pediatrics & Child Care",
    opdTimings: "9:00 AM – 12:00 PM",
    department: "OPD – Pediatrics",
    initials: "NG",
    avatarColor: "blue",
  },
  {
    id: "dr-suresh-verma",
    name: "Dr. Suresh Verma",
    category: "doctor",
    designation: "Orthopedic Surgeon",
    qualification: "MBBS, MS",
    specialization: "Orthopedics & Trauma",
    opdTimings: "2:00 PM – 6:00 PM",
    department: "OPD – Orthopedics",
    initials: "SV",
    avatarColor: "teal",
  },

  // ── Nursing Staff ─────────────────────────────────────────
  {
    id: "nurse-sunita-yadav",
    name: "Sunita Yadav",
    category: "nurse",
    designation: "Head Nurse",
    qualification: "B.Sc Nursing",
    specialization: "OPD Ward Supervision",
    department: "OPD Ward",
    initials: "SY",
    avatarColor: "purple",
  },
  {
    id: "nurse-kavita-mishra",
    name: "Kavita Mishra",
    category: "nurse",
    designation: "Staff Nurse",
    qualification: "GNM",
    specialization: "Patient Registration & Triage",
    department: "OPD Registration Desk",
    initials: "KM",
    avatarColor: "indigo",
  },
  {
    id: "nurse-anjali-tiwari",
    name: "Anjali Tiwari",
    category: "nurse",
    designation: "Staff Nurse",
    qualification: "B.Sc Nursing",
    specialization: "Dressing & Injection Room",
    department: "OPD Procedure Room",
    initials: "AT",
    avatarColor: "violet",
  },

  // ── Support Staff ─────────────────────────────────────────
  {
    id: "rakesh-kumar",
    name: "Rakesh Kumar",
    category: "support",
    designation: "OPD Receptionist",
    specialization: "Front Desk & Scheduling",
    department: "OPD Front Desk",
    initials: "RK",
    avatarColor: "amber",
  },
  {
    id: "meena-devi",
    name: "Meena Devi",
    category: "support",
    designation: "Patient Help Desk",
    specialization: "Patient Guidance & Queries",
    department: "OPD Help Desk",
    contact: "8757188299",
    initials: "MD",
    avatarColor: "orange",
  },
];

export const DOCTORS = STAFF.filter((s) => s.category === "doctor");
export const NURSES = STAFF.filter((s) => s.category === "nurse");
export const SUPPORT = STAFF.filter((s) => s.category === "support");
