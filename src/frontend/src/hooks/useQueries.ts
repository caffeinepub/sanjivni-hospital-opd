import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useActor } from "./useActor";
import type { OPDRecord, PatientProfile } from "../backend.d";
import { Gender, UserRole } from "../backend.d";

export function useCallerPatientProfile() {
  const { actor, isFetching } = useActor();
  return useQuery<PatientProfile | null>({
    queryKey: ["callerPatientProfile"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getCallerPatientProfile();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCallerUserRole() {
  const { actor, isFetching } = useActor();
  return useQuery<UserRole>({
    queryKey: ["callerUserRole"],
    queryFn: async () => {
      if (!actor) return UserRole.guest;
      return actor.getCallerUserRole();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useIsCallerAdmin() {
  const { actor, isFetching } = useActor();
  return useQuery<boolean>({
    queryKey: ["isCallerAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAllOPDRecords() {
  const { actor, isFetching } = useActor();
  return useQuery<OPDRecord[]>({
    queryKey: ["allOPDRecords"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllOPDRecords();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAllPatientProfiles() {
  const { actor, isFetching } = useActor();
  return useQuery<PatientProfile[]>({
    queryKey: ["allPatientProfiles"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllPatientProfiles();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useRegisterPatient() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ name, email }: { name: string; email: string }) => {
      if (!actor) throw new Error("Not connected");
      return actor.registerPatient(name, email);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["callerPatientProfile"] });
    },
  });
}

export function useSubmitOPDForm() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      patientName: string;
      age: bigint;
      address: string;
      gender: Gender;
      appointmentDate: string;
      doctorName: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitOPDForm(
        data.patientName,
        data.age,
        data.address,
        data.gender,
        data.appointmentDate,
        data.doctorName,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allOPDRecords"] });
    },
  });
}
