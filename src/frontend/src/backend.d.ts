import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface OPDRecord {
    age: bigint;
    appointmentDate: string;
    address: string;
    gender: Gender;
    patientName: string;
    doctorName: string;
}
export interface PatientProfile {
    name: string;
    email: string;
}
export enum Gender {
    other = "other",
    female = "female",
    male = "male"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getAllOPDRecords(): Promise<Array<OPDRecord>>;
    getAllPatientProfiles(): Promise<Array<PatientProfile>>;
    getCallerPatientProfile(): Promise<PatientProfile | null>;
    getCallerUserProfile(): Promise<PatientProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getPatientOPDRecords(patient: Principal): Promise<Array<OPDRecord>>;
    getPatientProfile(patient: Principal): Promise<PatientProfile | null>;
    getUserProfile(user: Principal): Promise<PatientProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    registerPatient(name: string, email: string): Promise<void>;
    saveCallerUserProfile(profile: PatientProfile): Promise<void>;
    submitOPDForm(patientName: string, age: bigint, address: string, gender: Gender, appointmentDate: string, doctorName: string): Promise<void>;
}
