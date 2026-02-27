import { motion } from "motion/react";
import { useNavigate } from "@tanstack/react-router";
import {
  PlusCircle,
  Calendar,
  Stethoscope,
  User,
  MapPin,
  Loader2,
  ClipboardList,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useCallerPatientProfile,
  useAllOPDRecords,
} from "../hooks/useQueries";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import type { OPDRecord } from "../backend.d";

function AppointmentCard({
  record,
  index,
}: {
  record: OPDRecord;
  index: number;
}) {
  const isUpcoming =
    new Date(record.appointmentDate) >= new Date(new Date().toDateString());

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
    >
      <Card className="border-border shadow-xs hover:shadow-medical transition-all duration-300">
        <CardContent className="p-5">
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-medical-green-pale flex items-center justify-center">
                <ClipboardList className="w-4 h-4 text-medical-green" />
              </div>
              <div>
                <p className="font-semibold text-foreground text-sm">
                  {record.patientName}
                </p>
                <p className="text-xs text-muted-foreground">
                  Age: {record.age.toString()} &bull;{" "}
                  {record.gender.charAt(0).toUpperCase() +
                    record.gender.slice(1)}
                </p>
              </div>
            </div>
            <Badge
              className={
                isUpcoming
                  ? "bg-medical-green-pale text-medical-green border-0"
                  : "bg-muted text-muted-foreground border-0"
              }
            >
              {isUpcoming ? "Upcoming" : "Completed"}
            </Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Stethoscope className="w-3.5 h-3.5 shrink-0 text-medical-green" />
              <span className="truncate">{record.doctorName}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="w-3.5 h-3.5 shrink-0 text-medical-green" />
              <span>
                {new Date(record.appointmentDate).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-3.5 h-3.5 shrink-0 text-medical-green" />
              <span className="truncate text-xs">{record.address}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function SkeletonCard() {
  return (
    <Card className="border-border">
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <Skeleton className="w-8 h-8 rounded-lg" />
            <div>
              <Skeleton className="h-4 w-28 mb-1" />
              <Skeleton className="h-3 w-20" />
            </div>
          </div>
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>
        <div className="grid grid-cols-3 gap-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
      </CardContent>
    </Card>
  );
}

export default function DashboardPage() {
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const { data: profile, isLoading: profileLoading } =
    useCallerPatientProfile();
  const { data: allRecords, isLoading: recordsLoading } = useAllOPDRecords();

  const principalStr = identity?.getPrincipal().toString() ?? "";

  // Show all records for now (backend returns all)
  const myRecords = allRecords ?? [];

  return (
    <div className="min-h-screen flex flex-col bg-background font-body">
      <Header />

      <main className="flex-1 py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Welcome */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-medical-green flex items-center justify-center shadow-medical">
                  <Heart className="w-7 h-7 text-white fill-white" />
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">Welcome back,</p>
                  {profileLoading ? (
                    <Skeleton className="h-7 w-40" />
                  ) : (
                    <h1 className="font-display text-2xl font-bold text-foreground">
                      {profile?.name ?? "Patient"}
                    </h1>
                  )}
                  {principalStr && (
                    <p className="text-xs text-muted-foreground mt-0.5 font-mono truncate max-w-xs">
                      ID: {principalStr.slice(0, 16)}...
                    </p>
                  )}
                </div>
              </div>

              <Button
                onClick={() => void navigate({ to: "/opd-form" })}
                className="bg-medical-green hover:bg-medical-green/90 text-white font-semibold gap-2 shadow-medical self-start sm:self-auto"
              >
                <PlusCircle className="w-4 h-4" />
                Book New Appointment
              </Button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          >
            {[
              {
                label: "Total Appointments",
                value: myRecords.length,
                icon: ClipboardList,
                color: "text-medical-green",
                bg: "bg-medical-green-pale",
              },
              {
                label: "Upcoming",
                value: myRecords.filter(
                  (r) =>
                    new Date(r.appointmentDate) >=
                    new Date(new Date().toDateString()),
                ).length,
                icon: Calendar,
                color: "text-blue-600",
                bg: "bg-blue-50",
              },
              {
                label: "Completed",
                value: myRecords.filter(
                  (r) =>
                    new Date(r.appointmentDate) <
                    new Date(new Date().toDateString()),
                ).length,
                icon: User,
                color: "text-purple-600",
                bg: "bg-purple-50",
              },
              {
                label: "Doctors Visited",
                value: new Set(myRecords.map((r) => r.doctorName)).size,
                icon: Stethoscope,
                color: "text-medical-teal",
                bg: "bg-teal-50",
              },
            ].map((stat) => (
              <Card key={stat.label} className="border-border shadow-xs">
                <CardContent className="p-4">
                  <div
                    className={`w-8 h-8 rounded-lg ${stat.bg} flex items-center justify-center mb-2`}
                  >
                    <stat.icon className={`w-4 h-4 ${stat.color}`} />
                  </div>
                  {recordsLoading ? (
                    <Skeleton className="h-7 w-10 mb-1" />
                  ) : (
                    <p className={`text-2xl font-display font-bold ${stat.color}`}>
                      {stat.value}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </motion.div>

          {/* Appointments List */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="border-border shadow-xs">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="font-display text-xl flex items-center gap-2">
                    <ClipboardList className="w-5 h-5 text-medical-green" />
                    My OPD Appointments
                  </CardTitle>
                  {myRecords.length > 0 && (
                    <Badge className="bg-medical-green-pale text-medical-green border-0">
                      {myRecords.length} Records
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="px-5 pb-5">
                {recordsLoading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <SkeletonCard key={i} />
                    ))}
                  </div>
                ) : myRecords.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-2xl bg-medical-green-pale flex items-center justify-center mx-auto mb-4">
                      <ClipboardList className="w-8 h-8 text-medical-green" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">
                      No Appointments Yet
                    </h3>
                    <p className="text-muted-foreground text-sm mb-6">
                      Book your first OPD appointment to get started.
                    </p>
                    <Button
                      onClick={() => void navigate({ to: "/opd-form" })}
                      className="bg-medical-green hover:bg-medical-green/90 text-white gap-2"
                    >
                      <PlusCircle className="w-4 h-4" />
                      Book First Appointment
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {myRecords.map((record, idx) => (
                      <AppointmentCard
                        key={`${record.patientName}-${record.appointmentDate}-${idx}`}
                        record={record}
                        index={idx}
                      />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
