import { motion } from "motion/react";
import { useNavigate } from "@tanstack/react-router";
import {
  Shield,
  Users,
  ClipboardList,
  AlertCircle,
  Loader2,
  ArrowLeft,
  Calendar,
  User,
  Stethoscope,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useAllOPDRecords,
  useAllPatientProfiles,
  useIsCallerAdmin,
} from "../hooks/useQueries";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

export default function AdminPage() {
  const navigate = useNavigate();
  const { data: isAdmin, isLoading: adminLoading } = useIsCallerAdmin();
  const { data: opdRecords, isLoading: opdLoading } = useAllOPDRecords();
  const { data: patients, isLoading: patientsLoading } =
    useAllPatientProfiles();

  if (adminLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-background font-body">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-medical-green" />
            <p className="text-muted-foreground">Checking permissions...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex flex-col bg-background font-body">
        <Header />
        <main className="flex-1 flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 rounded-2xl bg-destructive/10 flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-destructive" />
            </div>
            <h1 className="font-display text-2xl font-bold text-foreground mb-2">
              Access Denied
            </h1>
            <p className="text-muted-foreground mb-6">
              You do not have admin privileges to access this page.
            </p>
            <Button
              onClick={() => void navigate({ to: "/dashboard" })}
              className="bg-medical-green hover:bg-medical-green/90 text-white gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background font-body">
      <Header />

      <main className="flex-1 py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-medical-green flex items-center justify-center shadow-medical">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold text-foreground">
                Admin Panel
              </h1>
              <p className="text-muted-foreground text-sm">
                Manage OPD records and patient profiles
              </p>
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
                label: "Total OPD Records",
                value: opdRecords?.length ?? 0,
                icon: ClipboardList,
                loading: opdLoading,
              },
              {
                label: "Registered Patients",
                value: patients?.length ?? 0,
                icon: Users,
                loading: patientsLoading,
              },
              {
                label: "Today's Appointments",
                value:
                  opdRecords?.filter(
                    (r) =>
                      r.appointmentDate ===
                      new Date().toISOString().split("T")[0],
                  ).length ?? 0,
                icon: Calendar,
                loading: opdLoading,
              },
              {
                label: "Upcoming",
                value:
                  opdRecords?.filter(
                    (r) =>
                      new Date(r.appointmentDate) >=
                      new Date(new Date().toDateString()),
                  ).length ?? 0,
                icon: User,
                loading: opdLoading,
              },
            ].map((stat) => (
              <Card key={stat.label} className="border-border shadow-xs">
                <CardContent className="p-4">
                  <div className="w-8 h-8 rounded-lg bg-medical-green-pale flex items-center justify-center mb-2">
                    <stat.icon className="w-4 h-4 text-medical-green" />
                  </div>
                  {stat.loading ? (
                    <Skeleton className="h-7 w-10 mb-1" />
                  ) : (
                    <p className="text-2xl font-display font-bold text-medical-green">
                      {stat.value}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </motion.div>

          {/* Tables */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Tabs defaultValue="opd">
              <TabsList className="mb-4">
                <TabsTrigger value="opd" className="gap-2">
                  <ClipboardList className="w-4 h-4" />
                  OPD Records
                </TabsTrigger>
                <TabsTrigger value="patients" className="gap-2">
                  <Users className="w-4 h-4" />
                  Patients
                </TabsTrigger>
              </TabsList>

              {/* OPD Records Tab */}
              <TabsContent value="opd">
                <Card className="border-border shadow-xs">
                  <CardHeader className="pb-3">
                    <CardTitle className="font-display text-lg flex items-center gap-2">
                      <ClipboardList className="w-5 h-5 text-medical-green" />
                      All OPD Records
                      {!opdLoading && (
                        <Badge className="bg-medical-green-pale text-medical-green border-0 ml-2">
                          {opdRecords?.length ?? 0}
                        </Badge>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-0 pb-0">
                    {opdLoading ? (
                      <div className="p-6 space-y-3">
                        {[1, 2, 3, 4].map((i) => (
                          <Skeleton key={i} className="h-10 w-full" />
                        ))}
                      </div>
                    ) : !opdRecords || opdRecords.length === 0 ? (
                      <div className="py-12 text-center text-muted-foreground">
                        <ClipboardList className="w-8 h-8 mx-auto mb-3 opacity-40" />
                        <p>No OPD records found</p>
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow className="bg-muted/30">
                              <TableHead className="font-semibold">
                                <User className="w-4 h-4 inline mr-1" />
                                Patient
                              </TableHead>
                              <TableHead className="font-semibold">
                                Age
                              </TableHead>
                              <TableHead className="font-semibold">
                                Gender
                              </TableHead>
                              <TableHead className="font-semibold">
                                <Stethoscope className="w-4 h-4 inline mr-1" />
                                Doctor
                              </TableHead>
                              <TableHead className="font-semibold">
                                <Calendar className="w-4 h-4 inline mr-1" />
                                Date
                              </TableHead>
                              <TableHead className="font-semibold">
                                <MapPin className="w-4 h-4 inline mr-1" />
                                Address
                              </TableHead>
                              <TableHead className="font-semibold">
                                Status
                              </TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {opdRecords.map((record) => {
                              const isUpcoming =
                                new Date(record.appointmentDate) >=
                                new Date(new Date().toDateString());
                              const rowKey = `${record.patientName}-${record.appointmentDate}-${record.doctorName}`;
                              return (
                                <TableRow
                                  key={rowKey}
                                  className="hover:bg-muted/20 transition-colors"
                                >
                                  <TableCell className="font-medium">
                                    {record.patientName}
                                  </TableCell>
                                  <TableCell>
                                    {record.age.toString()}
                                  </TableCell>
                                  <TableCell className="capitalize">
                                    {record.gender}
                                  </TableCell>
                                  <TableCell>{record.doctorName}</TableCell>
                                  <TableCell>
                                    {new Date(
                                      record.appointmentDate,
                                    ).toLocaleDateString("en-IN", {
                                      day: "numeric",
                                      month: "short",
                                      year: "numeric",
                                    })}
                                  </TableCell>
                                  <TableCell className="max-w-[160px] truncate text-muted-foreground text-sm">
                                    {record.address}
                                  </TableCell>
                                  <TableCell>
                                    <Badge
                                      className={
                                        isUpcoming
                                          ? "bg-medical-green-pale text-medical-green border-0"
                                          : "bg-muted text-muted-foreground border-0"
                                      }
                                    >
                                      {isUpcoming ? "Upcoming" : "Done"}
                                    </Badge>
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                          </TableBody>
                        </Table>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Patients Tab */}
              <TabsContent value="patients">
                <Card className="border-border shadow-xs">
                  <CardHeader className="pb-3">
                    <CardTitle className="font-display text-lg flex items-center gap-2">
                      <Users className="w-5 h-5 text-medical-green" />
                      All Registered Patients
                      {!patientsLoading && (
                        <Badge className="bg-medical-green-pale text-medical-green border-0 ml-2">
                          {patients?.length ?? 0}
                        </Badge>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-0 pb-0">
                    {patientsLoading ? (
                      <div className="p-6 space-y-3">
                        {[1, 2, 3].map((i) => (
                          <Skeleton key={i} className="h-10 w-full" />
                        ))}
                      </div>
                    ) : !patients || patients.length === 0 ? (
                      <div className="py-12 text-center text-muted-foreground">
                        <Users className="w-8 h-8 mx-auto mb-3 opacity-40" />
                        <p>No patients registered yet</p>
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow className="bg-muted/30">
                              <TableHead className="font-semibold">
                                #
                              </TableHead>
                              <TableHead className="font-semibold">
                                <User className="w-4 h-4 inline mr-1" />
                                Name
                              </TableHead>
                              <TableHead className="font-semibold">
                                Email
                              </TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {patients.map((patient, patientIdx) => (
                              <TableRow
                                key={`${patient.name}-${patient.email}`}
                                className="hover:bg-muted/20 transition-colors"
                              >
                                <TableCell className="text-muted-foreground text-sm">
                                  {patientIdx + 1}
                                </TableCell>
                                <TableCell className="font-medium">
                                  {patient.name}
                                </TableCell>
                                <TableCell className="text-muted-foreground">
                                  {patient.email}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
