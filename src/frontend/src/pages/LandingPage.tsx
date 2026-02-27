import { motion } from "motion/react";
import { useNavigate } from "@tanstack/react-router";
import {
  Heart,
  Phone,
  Shield,
  Users,
  Stethoscope,
  ArrowRight,
  CheckCircle,
  HeartPulse,
  HandHelping,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import StaffCard from "../components/StaffCard";
import { DOCTORS, NURSES, SUPPORT } from "../data/staffData";



const SERVICES = [
  {
    icon: Stethoscope,
    title: "General OPD",
    desc: "Comprehensive outpatient consultations for all general health concerns",
  },
  {
    icon: Heart,
    title: "Cardiac Care",
    desc: "Advanced cardiac diagnostics and preventive cardiology services",
  },
  {
    icon: Shield,
    title: "Preventive Health",
    desc: "Full body health check-ups and vaccination programs",
  },
  {
    icon: Users,
    title: "Family Medicine",
    desc: "Complete healthcare for every member of your family",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-background font-body">
      <Header />

      {/* Hero */}
      <section className="gradient-hero relative overflow-hidden">
        <div className="pattern-dots absolute inset-0 opacity-30" />
        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6"
            >
              <Heart className="w-4 h-4 text-green-300 fill-green-300" />
              <span className="text-white/90 text-sm font-medium">
                Your Health, Our Priority
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display text-4xl md:text-6xl font-bold text-white mb-4 leading-tight"
            >
              Sanjivni Hospital
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white/80 text-lg md:text-xl mb-8 leading-relaxed"
            >
              Book your OPD appointment online — fast, easy, and secure.
              <br className="hidden md:block" />
              Our expert doctors are ready to care for you.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                size="lg"
                onClick={() => void navigate({ to: "/opd-form" })}
                className="bg-white text-medical-green hover:bg-white/90 font-semibold shadow-medical-lg gap-2 text-base px-8"
              >
                Book OPD Appointment
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => void navigate({ to: "/login" })}
                className="border-white/40 text-white hover:bg-white/10 backdrop-blur-sm font-semibold gap-2 text-base"
              >
                Patient Login
              </Button>
            </motion.div>

            {/* Support badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-green-300" />
              <span className="text-white/70 text-sm">
                Patient Support:{" "}
                <a
                  href="tel:8757188299"
                  className="text-white font-semibold hover:text-green-300 transition-colors"
                >
                  8757188299
                </a>
              </span>
            </motion.div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation">
            <path
              d="M0 60L60 50C120 40 240 20 360 15C480 10 600 20 720 27.5C840 35 960 40 1080 37.5C1200 35 1320 25 1380 20L1440 15V60H0Z"
              fill="oklch(0.98 0.005 145)"
            />
          </svg>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              { value: "10,000+", label: "Patients Served" },
              { value: "50+", label: "Specialist Doctors" },
              { value: "15+", label: "Years of Service" },
              { value: "24×7", label: "Emergency Care" },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                className="text-center py-2"
              >
                <p className="font-display text-2xl md:text-3xl font-bold text-medical-green">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="text-medical-green font-semibold text-sm uppercase tracking-widest mb-2">
              Our Services
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              Comprehensive Healthcare
            </h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
              From routine check-ups to specialized care, we offer a full range
              of OPD services.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {SERVICES.map((service) => (
              <motion.div key={service.title} variants={itemVariants}>
                <Card className="h-full gradient-card border-border hover:shadow-medical-lg transition-all duration-300 group cursor-default">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-medical-green-pale flex items-center justify-center mb-4 group-hover:bg-medical-green group-hover:scale-110 transition-all duration-300">
                      <service.icon className="w-6 h-6 text-medical-green group-hover:text-white transition-colors duration-300" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">
                      {service.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {service.desc}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* OPD Team — all categories */}
      <section className="py-16 bg-medical-surface">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="text-medical-green font-semibold text-sm uppercase tracking-widest mb-2">
              Our OPD Team
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              Meet the Faces Behind Your Care
            </h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
              Specialist doctors, compassionate nurses, and helpful support
              staff — all working together for your wellbeing.
            </p>
          </motion.div>

          {/* Doctors */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-xl bg-medical-green-pale flex items-center justify-center shrink-0">
                <Stethoscope className="w-4 h-4 text-medical-green" />
              </div>
              <h3 className="font-display text-lg font-bold text-medical-green">
                Specialist Doctors
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {DOCTORS.map((doc, i) => (
                <StaffCard key={doc.id} member={doc} index={i} compact />
              ))}
            </div>
          </div>

          {/* Nurses + Support in two cols */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Nursing */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 rounded-xl bg-purple-50 flex items-center justify-center shrink-0">
                  <HeartPulse className="w-4 h-4 text-purple-600" />
                </div>
                <h3 className="font-display text-lg font-bold text-purple-600">
                  Nursing Staff
                </h3>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {NURSES.map((n, i) => (
                  <StaffCard key={n.id} member={n} index={i} compact />
                ))}
              </div>
            </div>

            {/* Support */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
                  <HandHelping className="w-4 h-4 text-amber-600" />
                </div>
                <h3 className="font-display text-lg font-bold text-amber-600">
                  Support Staff
                </h3>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {SUPPORT.map((s, i) => (
                  <StaffCard key={s.id} member={s} index={i} compact />
                ))}
              </div>
            </div>
          </div>

          {/* View All CTA */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-10 text-center"
          >
            <Button
              variant="outline"
              onClick={() => void navigate({ to: "/staff" })}
              className="border-medical-green text-medical-green hover:bg-medical-green-pale font-semibold gap-2"
            >
              <Users className="w-4 h-4" />
              View Full Staff Directory
              <ArrowRight className="w-4 h-4" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="text-medical-green font-semibold text-sm uppercase tracking-widest mb-2">
              Simple Process
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              Book in 3 Easy Steps
            </h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto"
          >
            {[
              {
                step: "01",
                title: "Create Account",
                desc: "Register with your name and email to get started",
              },
              {
                step: "02",
                title: "Fill OPD Form",
                desc: "Enter patient details, choose doctor and appointment date",
              },
              {
                step: "03",
                title: "Pay & Confirm",
                desc: "Pay OPD fee via QR code and get your appointment confirmed",
              },
            ].map((item) => (
              <motion.div
                key={item.step}
                variants={itemVariants}
                className="text-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-medical-green flex items-center justify-center mx-auto mb-4 shadow-medical">
                  <span className="text-white font-display font-bold text-lg">
                    {item.step}
                  </span>
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 gradient-hero relative overflow-hidden">
        <div className="pattern-dots absolute inset-0 opacity-20" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Book Your Appointment?
            </h2>
            <p className="text-white/80 mb-8 text-lg">
              Quick, easy online booking — no waiting in queues.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => void navigate({ to: "/opd-form" })}
                className="bg-white text-medical-green hover:bg-white/90 font-semibold gap-2 text-base px-8 shadow-medical-lg"
              >
                Book OPD Now
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4 text-white/70 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-300" />
                Online Appointment
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-300" />
                UPI Payment
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-300" />
                Instant Confirmation
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
