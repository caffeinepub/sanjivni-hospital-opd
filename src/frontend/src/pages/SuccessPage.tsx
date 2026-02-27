import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "@tanstack/react-router";
import {
  CheckCircle,
  Calendar,
  User,
  Stethoscope,
  MapPin,
  Home,
  PlusCircle,
  Printer,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

interface AppointmentData {
  patientName: string;
  age: string;
  address: string;
  gender: string;
  appointmentDate: string;
  doctorName: string;
  confirmationNumber: string;
}

export default function SuccessPage() {
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState<AppointmentData | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("appointmentData");
    if (stored) {
      try {
        setAppointment(JSON.parse(stored) as AppointmentData);
      } catch {
        // ignore parse errors
      }
    }
  }, []);

  const formattedDate = appointment?.appointmentDate
    ? new Date(appointment.appointmentDate).toLocaleDateString("en-IN", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "—";

  return (
    <div className="min-h-screen flex flex-col bg-background font-body">
      <Header />

      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-lg">
          {/* Success icon with animation */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.1,
            }}
            className="flex justify-center mb-6"
          >
            <div className="w-20 h-20 rounded-full bg-medical-green-pale flex items-center justify-center shadow-medical-lg">
              <CheckCircle className="w-10 h-10 text-medical-green" strokeWidth={2} />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-center mb-8"
          >
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
              Appointment Confirmed!
            </h1>
            <p className="text-muted-foreground text-lg">
              Your OPD appointment has been successfully booked.
            </p>
          </motion.div>

          {/* Appointment Card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Card className="shadow-medical-lg border-border overflow-hidden mb-6">
              {/* Card Header */}
              <div className="bg-medical-green px-6 py-4 flex items-center justify-between">
                <div>
                  <p className="text-white/70 text-xs font-medium uppercase tracking-wider">
                    Confirmation Number
                  </p>
                  <p className="text-white font-display font-bold text-xl">
                    {appointment?.confirmationNumber ?? "SNH000000"}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-white/70 text-xs">Sanjivni Hospital</p>
                  <p className="text-white text-sm font-semibold">OPD Services</p>
                </div>
              </div>

              <CardContent className="p-6 space-y-4">
                {appointment ? (
                  <>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-medical-green-pale flex items-center justify-center shrink-0 mt-0.5">
                        <User className="w-4 h-4 text-medical-green" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Patient Name
                        </p>
                        <p className="font-semibold text-foreground">
                          {appointment.patientName}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Age: {appointment.age} &bull;{" "}
                          {appointment.gender.charAt(0).toUpperCase() +
                            appointment.gender.slice(1)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-medical-green-pale flex items-center justify-center shrink-0 mt-0.5">
                        <Stethoscope className="w-4 h-4 text-medical-green" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Consulting Doctor
                        </p>
                        <p className="font-semibold text-foreground">
                          {appointment.doctorName}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-medical-green-pale flex items-center justify-center shrink-0 mt-0.5">
                        <Calendar className="w-4 h-4 text-medical-green" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Appointment Date
                        </p>
                        <p className="font-semibold text-foreground">
                          {formattedDate}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-medical-green-pale flex items-center justify-center shrink-0 mt-0.5">
                        <MapPin className="w-4 h-4 text-medical-green" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Address</p>
                        <p className="font-medium text-foreground text-sm">
                          {appointment.address}
                        </p>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-4 text-muted-foreground">
                    <p>Appointment details will appear here.</p>
                  </div>
                )}

                {/* Payment status */}
                <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-xl flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 shrink-0" />
                  <span className="text-green-700 text-sm font-medium">
                    OPD Fee Payment Received
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <Button
              onClick={() => void navigate({ to: "/dashboard" })}
              className="flex-1 h-11 bg-medical-green hover:bg-medical-green/90 text-white font-semibold gap-2"
            >
              <Home className="w-4 h-4" />
              Go to Dashboard
            </Button>
            <Button
              onClick={() => void navigate({ to: "/opd-form" })}
              variant="outline"
              className="flex-1 h-11 border-medical-green text-medical-green hover:bg-medical-green-pale font-semibold gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              Book Another
            </Button>
            <Button
              onClick={() => window.print()}
              variant="ghost"
              className="h-11 px-4 text-muted-foreground gap-2"
              title="Print confirmation"
            >
              <Printer className="w-4 h-4" />
            </Button>
          </motion.div>

          {/* Important note */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl"
          >
            <p className="text-amber-800 text-sm font-semibold mb-1">
              Important Reminder
            </p>
            <ul className="text-amber-700 text-xs space-y-1 list-disc list-inside">
              <li>Please arrive 15 minutes before your appointment time</li>
              <li>Bring a valid photo ID and this confirmation number</li>
              <li>Carry any previous medical records if available</li>
            </ul>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
