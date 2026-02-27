import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import {
  User,
  MapPin,
  Calendar,
  Stethoscope,
  ChevronRight,
  Loader2,
  QrCode,
  CheckCircle,
  Phone,
  Copy,
  IndianRupee,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Gender } from "../backend.d";
import { useSubmitOPDForm } from "../hooks/useQueries";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const DOCTORS = [
  "Dr. Rajesh Sharma",
  "Dr. Priya Patel",
  "Dr. Amit Singh",
  "Dr. Sunita Gupta",
  "Dr. Vikram Verma",
];

const OPD_FEE = "₹200";
const UPI_NUMBER = "7258871868";

type Step = "form" | "payment";

interface FormData {
  patientName: string;
  age: string;
  address: string;
  gender: Gender;
  appointmentDate: string;
  doctorName: string;
}

export default function OPDFormPage() {
  const navigate = useNavigate();
  const submitMutation = useSubmitOPDForm();
  const [step, setStep] = useState<Step>("form");
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);

  const [form, setForm] = useState<FormData>({
    patientName: "",
    age: "",
    address: "",
    gender: Gender.male,
    appointmentDate: "",
    doctorName: "",
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!form.patientName.trim()) newErrors.patientName = "Name is required";
    if (!form.age || Number(form.age) < 1 || Number(form.age) > 120)
      newErrors.age = "Valid age required (1–120)";
    if (!form.address.trim()) newErrors.address = "Address is required";
    if (!form.appointmentDate)
      newErrors.appointmentDate = "Date is required";
    if (!form.doctorName) newErrors.doctorName = "Please select a doctor";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fix the errors before submitting");
      return;
    }

    try {
      await submitMutation.mutateAsync({
        patientName: form.patientName,
        age: BigInt(form.age),
        address: form.address,
        gender: form.gender,
        appointmentDate: form.appointmentDate,
        doctorName: form.doctorName,
      });
      setSubmittedData(form);
      setStep("payment");
      toast.success("OPD form submitted! Please complete payment.");
    } catch {
      toast.error("Failed to submit form. Please try again.");
    }
  };

  const handlePaymentDone = () => {
    if (submittedData) {
      // Store appointment data for success page
      sessionStorage.setItem(
        "appointmentData",
        JSON.stringify({
          ...submittedData,
          confirmationNumber: `SNH${Date.now().toString().slice(-6)}`,
        }),
      );
    }
    void navigate({ to: "/success" });
  };

  const copyUPI = () => {
    navigator.clipboard
      .writeText(UPI_NUMBER)
      .then(() => toast.success("UPI number copied!"))
      .catch(() => toast.error("Could not copy"));
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="min-h-screen flex flex-col bg-background font-body">
      <Header />

      <main className="flex-1 py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          {/* Page header */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 bg-medical-green-pale rounded-full px-4 py-2 mb-4">
              <Stethoscope className="w-4 h-4 text-medical-green" />
              <span className="text-medical-green font-semibold text-sm">
                OPD Registration
              </span>
            </div>
            <h1 className="font-display text-3xl font-bold text-foreground">
              {step === "form" ? "Book Appointment" : "Pay OPD Fee"}
            </h1>
            <p className="text-muted-foreground mt-2">
              {step === "form"
                ? "Fill in the details below to book your OPD appointment"
                : "Complete your payment to confirm the appointment"}
            </p>
          </motion.div>

          {/* Steps indicator */}
          <div className="flex items-center justify-center mb-8">
            {[
              { label: "Patient Details", value: "form" },
              { label: "Payment", value: "payment" },
            ].map((s, idx) => (
              <div key={s.value} className="flex items-center">
                <div
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                    step === s.value
                      ? "bg-medical-green text-white shadow-medical"
                      : step === "payment" && s.value === "form"
                        ? "bg-medical-green-pale text-medical-green"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  {step === "payment" && s.value === "form" ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <span>{idx + 1}</span>
                  )}
                  {s.label}
                </div>
                {idx < 1 && (
                  <ChevronRight className="w-4 h-4 text-muted-foreground mx-2" />
                )}
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {step === "form" && (
              <motion.div
                key="form"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
              >
                <Card className="shadow-medical-lg border-border">
                  <CardHeader className="pb-4">
                    <CardTitle className="font-display text-xl flex items-center gap-2">
                      <User className="w-5 h-5 text-medical-green" />
                      Patient Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                      {/* Patient Name */}
                      <div className="space-y-2">
                        <Label htmlFor="patient-name">
                          Patient Name <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="patient-name"
                          placeholder="Full name as per ID"
                          autoComplete="name"
                          value={form.patientName}
                          onChange={(e) =>
                            setForm((p) => ({
                              ...p,
                              patientName: e.target.value,
                            }))
                          }
                          className={`h-11 ${errors.patientName ? "border-destructive" : ""}`}
                        />
                        {errors.patientName && (
                          <p className="text-xs text-destructive">
                            {errors.patientName}
                          </p>
                        )}
                      </div>

                      {/* Age & Gender */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="age">
                            Age <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="age"
                            type="number"
                            placeholder="e.g. 32"
                            min={1}
                            max={120}
                            value={form.age}
                            onChange={(e) =>
                              setForm((p) => ({ ...p, age: e.target.value }))
                            }
                            className={`h-11 ${errors.age ? "border-destructive" : ""}`}
                          />
                          {errors.age && (
                            <p className="text-xs text-destructive">{errors.age}</p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label>
                            Gender <span className="text-destructive">*</span>
                          </Label>
                          <RadioGroup
                            value={form.gender}
                            onValueChange={(v) =>
                              setForm((p) => ({ ...p, gender: v as Gender }))
                            }
                            className="flex gap-4 pt-1"
                          >
                            <div className="flex items-center gap-2">
                              <RadioGroupItem value={Gender.male} id="male" />
                              <Label
                                htmlFor="male"
                                className="cursor-pointer font-normal"
                              >
                                Male
                              </Label>
                            </div>
                            <div className="flex items-center gap-2">
                              <RadioGroupItem value={Gender.female} id="female" />
                              <Label
                                htmlFor="female"
                                className="cursor-pointer font-normal"
                              >
                                Female
                              </Label>
                            </div>
                            <div className="flex items-center gap-2">
                              <RadioGroupItem value={Gender.other} id="other" />
                              <Label
                                htmlFor="other"
                                className="cursor-pointer font-normal"
                              >
                                Other
                              </Label>
                            </div>
                          </RadioGroup>
                        </div>
                      </div>

                      {/* Address */}
                      <div className="space-y-2">
                        <Label htmlFor="address">
                          <MapPin className="w-4 h-4 inline mr-1 text-muted-foreground" />
                          Address <span className="text-destructive">*</span>
                        </Label>
                        <Textarea
                          id="address"
                          placeholder="House No., Street, City, State, PIN Code"
                          rows={3}
                          value={form.address}
                          onChange={(e) =>
                            setForm((p) => ({
                              ...p,
                              address: e.target.value,
                            }))
                          }
                          className={`resize-none ${errors.address ? "border-destructive" : ""}`}
                        />
                        {errors.address && (
                          <p className="text-xs text-destructive">
                            {errors.address}
                          </p>
                        )}
                      </div>

                      {/* Appointment Date & Doctor */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="appt-date">
                            <Calendar className="w-4 h-4 inline mr-1 text-muted-foreground" />
                            Appointment Date{" "}
                            <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="appt-date"
                            type="date"
                            min={today}
                            value={form.appointmentDate}
                            onChange={(e) =>
                              setForm((p) => ({
                                ...p,
                                appointmentDate: e.target.value,
                              }))
                            }
                            className={`h-11 ${errors.appointmentDate ? "border-destructive" : ""}`}
                          />
                          {errors.appointmentDate && (
                            <p className="text-xs text-destructive">
                              {errors.appointmentDate}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="doctor">
                            <Stethoscope className="w-4 h-4 inline mr-1 text-muted-foreground" />
                            Select Doctor{" "}
                            <span className="text-destructive">*</span>
                          </Label>
                          <Select
                            value={form.doctorName}
                            onValueChange={(v) =>
                              setForm((p) => ({ ...p, doctorName: v }))
                            }
                          >
                            <SelectTrigger
                              id="doctor"
                              className={`h-11 ${errors.doctorName ? "border-destructive" : ""}`}
                            >
                              <SelectValue placeholder="Choose Doctor" />
                            </SelectTrigger>
                            <SelectContent>
                              {DOCTORS.map((doc) => (
                                <SelectItem key={doc} value={doc}>
                                  {doc}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {errors.doctorName && (
                            <p className="text-xs text-destructive">
                              {errors.doctorName}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* OPD Fee note */}
                      <div className="flex items-center gap-3 p-4 bg-medical-green-pale rounded-xl">
                        <IndianRupee className="w-5 h-5 text-medical-green shrink-0" />
                        <div>
                          <p className="text-sm font-semibold text-medical-green">
                            OPD Consultation Fee: {OPD_FEE}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Payable via UPI after form submission
                          </p>
                        </div>
                      </div>

                      <Button
                        type="submit"
                        className="w-full h-12 bg-medical-green hover:bg-medical-green/90 text-white font-semibold text-base gap-2 shadow-medical"
                        disabled={submitMutation.isPending}
                      >
                        {submitMutation.isPending ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <ChevronRight className="w-5 h-5" />
                        )}
                        {submitMutation.isPending
                          ? "Submitting..."
                          : "Submit & Proceed to Payment"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {step === "payment" && (
              <motion.div
                key="payment"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4 }}
              >
                <Card className="shadow-medical-lg border-border overflow-hidden">
                  <div className="bg-medical-green px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                        <QrCode className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h2 className="font-display text-xl font-bold text-white">
                          Pay OPD Fee
                        </h2>
                        <p className="text-white/80 text-sm">
                          Scan QR or pay to UPI number
                        </p>
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    {/* Summary */}
                    {submittedData && (
                      <div className="mb-6 p-4 bg-muted/50 rounded-xl space-y-2 text-sm">
                        <h3 className="font-semibold text-foreground mb-3">
                          Appointment Summary
                        </h3>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <span className="text-muted-foreground">
                              Patient:
                            </span>{" "}
                            <span className="font-medium">
                              {submittedData.patientName}
                            </span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Age:</span>{" "}
                            <span className="font-medium">{submittedData.age}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">
                              Doctor:
                            </span>{" "}
                            <span className="font-medium">
                              {submittedData.doctorName}
                            </span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Date:</span>{" "}
                            <span className="font-medium">
                              {new Date(
                                submittedData.appointmentDate,
                              ).toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* QR Code */}
                    <div className="flex flex-col items-center mb-6">
                      <div className="bg-white p-3 rounded-2xl shadow-medical-lg border border-border mb-4">
                        <img
                          src="/assets/generated/upi-qr-payment.dim_400x400.png"
                          alt="UPI QR Code for OPD payment"
                          className="w-48 h-48 object-contain"
                        />
                      </div>

                      {/* UPI Number */}
                      <div className="w-full max-w-xs">
                        <p className="text-center text-sm text-muted-foreground mb-2">
                          Or pay directly to UPI number:
                        </p>
                        <div className="flex items-center gap-2 bg-medical-green-pale border border-border rounded-xl px-4 py-3">
                          <Phone className="w-4 h-4 text-medical-green shrink-0" />
                          <span className="font-display text-xl font-bold text-medical-green flex-1 tracking-wide">
                            {UPI_NUMBER}
                          </span>
                          <button
                            type="button"
                            onClick={copyUPI}
                            className="text-muted-foreground hover:text-medical-green transition-colors"
                            aria-label="Copy UPI number"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="mt-3 flex items-center justify-center gap-2 py-2 bg-amber-50 border border-amber-200 rounded-lg">
                          <IndianRupee className="w-4 h-4 text-amber-600" />
                          <span className="text-amber-700 font-semibold text-sm">
                            Amount: {OPD_FEE}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Instructions */}
                    <div className="mb-6 p-4 bg-blue-50 border border-blue-100 rounded-xl">
                      <h4 className="font-semibold text-blue-800 text-sm mb-2">
                        Payment Instructions
                      </h4>
                      <ol className="text-xs text-blue-700 space-y-1 list-decimal list-inside">
                        <li>
                          Open any UPI app (PhonePe, GPay, Paytm, etc.)
                        </li>
                        <li>Scan the QR code or enter UPI number {UPI_NUMBER}</li>
                        <li>Enter amount ₹200 (OPD Consultation Fee)</li>
                        <li>Complete the payment</li>
                        <li>Click "Payment Done" below</li>
                      </ol>
                    </div>

                    <Button
                      onClick={handlePaymentDone}
                      className="w-full h-12 bg-medical-green hover:bg-medical-green/90 text-white font-semibold text-base gap-2 shadow-medical"
                    >
                      <CheckCircle className="w-5 h-5" />
                      Payment Done — Confirm Appointment
                    </Button>

                    <p className="text-xs text-center text-muted-foreground mt-3">
                      Having trouble? Call{" "}
                      <a
                        href="tel:8757188299"
                        className="text-medical-green font-semibold"
                      >
                        8757188299
                      </a>
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <Footer />
    </div>
  );
}
