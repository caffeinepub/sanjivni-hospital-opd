import { useState } from "react";
import { motion } from "motion/react";
import {
  Users,
  Stethoscope,
  HeartPulse,
  HandHelping,
  Phone,
  Clock,
  Search,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import StaffCard from "../components/StaffCard";
import { STAFF, DOCTORS, NURSES, SUPPORT } from "../data/staffData";
import type { StaffCategory } from "../data/staffData";

const TAB_CONFIG: {
  value: StaffCategory | "all";
  label: string;
  icon: React.ElementType;
  count: number;
  color: string;
}[] = [
  { value: "all",     label: "All Staff",      icon: Users,       count: STAFF.length,   color: "text-foreground" },
  { value: "doctor",  label: "Doctors",         icon: Stethoscope, count: DOCTORS.length, color: "text-medical-green" },
  { value: "nurse",   label: "Nursing Staff",   icon: HeartPulse,  count: NURSES.length,  color: "text-purple-600" },
  { value: "support", label: "Support Staff",   icon: HandHelping, count: SUPPORT.length, color: "text-amber-600" },
];

const SECTION_META: Record<StaffCategory, { heading: string; subheading: string; icon: React.ElementType; accent: string }> = {
  doctor: {
    heading: "Our Doctors",
    subheading: "Expert physicians available during OPD hours",
    icon: Stethoscope,
    accent: "text-medical-green",
  },
  nurse: {
    heading: "Nursing Staff",
    subheading: "Dedicated nurses ensuring quality patient care",
    icon: HeartPulse,
    accent: "text-purple-600",
  },
  support: {
    heading: "Support Staff",
    subheading: "Helping patients navigate the OPD experience",
    icon: HandHelping,
    accent: "text-amber-600",
  },
};

export default function StaffPage() {
  const [search, setSearch] = useState("");

  const filteredStaff = (category: StaffCategory | "all") => {
    const base = category === "all" ? STAFF : STAFF.filter((s) => s.category === category);
    if (!search.trim()) return base;
    const q = search.toLowerCase();
    return base.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.designation.toLowerCase().includes(q) ||
        (s.specialization?.toLowerCase().includes(q) ?? false),
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-background font-body">
      <Header />

      <main className="flex-1">
        {/* Page hero */}
        <section className="gradient-hero relative overflow-hidden py-14 md:py-20">
          <div className="pattern-dots absolute inset-0 opacity-25" />
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="max-w-2xl"
            >
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-5">
                <Users className="w-4 h-4 text-green-300" />
                <span className="text-white/90 text-sm font-medium">
                  Sanjivni Hospital
                </span>
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-3 leading-tight">
                Meet Our OPD Team
              </h1>
              <p className="text-white/75 text-lg leading-relaxed mb-6">
                A dedicated team of doctors, nurses, and support staff committed
                to delivering compassionate, quality healthcare every day.
              </p>

              {/* Quick stats */}
              <div className="flex flex-wrap gap-4">
                {[
                  { icon: Stethoscope, label: "5 Specialist Doctors" },
                  { icon: HeartPulse,  label: "3 Nursing Staff" },
                  { icon: HandHelping, label: "2 Support Members" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-2 bg-white/10 border border-white/15 backdrop-blur-sm rounded-full px-3 py-1.5"
                  >
                    <item.icon className="w-3.5 h-3.5 text-green-300" />
                    <span className="text-white/85 text-xs font-medium">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Wave */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation">
              <path
                d="M0 48L60 40C120 32 240 16 360 12C480 8 600 16 720 22C840 28 960 32 1080 30C1200 28 1320 20 1380 16L1440 12V48H0Z"
                fill="oklch(0.98 0.005 145)"
              />
            </svg>
          </div>
        </section>

        {/* Content */}
        <section className="py-12">
          <div className="container mx-auto px-4 max-w-6xl">
            {/* Support callout */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-4 bg-medical-green-pale border border-border rounded-2xl mb-8"
            >
              <div className="w-9 h-9 rounded-xl bg-medical-green flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground text-sm">
                  Need help finding the right doctor or department?
                </p>
                <p className="text-muted-foreground text-xs mt-0.5">
                  Call our Patient Help Desk (Meena Devi) at{" "}
                  <a
                    href="tel:8757188299"
                    className="text-medical-green font-bold hover:underline"
                  >
                    8757188299
                  </a>
                </p>
              </div>
              <div className="flex items-center gap-2 bg-white border border-border rounded-full px-3 py-1.5 shrink-0">
                <Clock className="w-3.5 h-3.5 text-medical-green" />
                <span className="text-xs font-semibold text-foreground">
                  Mon–Sat, 8 AM – 8 PM
                </span>
              </div>
            </motion.div>

            {/* Search */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="relative mb-6 max-w-md"
            >
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by name, role, or specialty…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 h-11"
              />
            </motion.div>

            {/* Tabs */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Tabs defaultValue="all">
                <TabsList className="h-auto flex-wrap gap-1 bg-muted/60 p-1 mb-8">
                  {TAB_CONFIG.map((tab) => (
                    <TabsTrigger
                      key={tab.value}
                      value={tab.value}
                      className="gap-1.5 data-[state=active]:bg-white data-[state=active]:shadow-xs"
                    >
                      <tab.icon className={`w-4 h-4 ${tab.color}`} />
                      <span>{tab.label}</span>
                      <Badge className="ml-0.5 bg-muted text-muted-foreground border-0 text-[10px] px-1.5 py-0 h-4">
                        {filteredStaff(tab.value).length}
                      </Badge>
                    </TabsTrigger>
                  ))}
                </TabsList>

                {/* "All" tab — grouped by section */}
                <TabsContent value="all">
                  {(["doctor", "nurse", "support"] as StaffCategory[]).map((cat) => {
                    const members = filteredStaff(cat);
                    if (members.length === 0) return null;
                    const meta = SECTION_META[cat];
                    return (
                      <div key={cat} className="mb-10">
                        <div className="flex items-center gap-3 mb-5">
                          <div className="w-9 h-9 rounded-xl bg-medical-green-pale flex items-center justify-center shrink-0">
                            <meta.icon className={`w-5 h-5 ${meta.accent}`} />
                          </div>
                          <div>
                            <h2 className={`font-display text-xl font-bold ${meta.accent}`}>
                              {meta.heading}
                            </h2>
                            <p className="text-xs text-muted-foreground">
                              {meta.subheading}
                            </p>
                          </div>
                          <Separator className="flex-1 hidden sm:block ml-4" />
                        </div>
                        <div
                          className={
                            cat === "doctor"
                              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4"
                              : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                          }
                        >
                          {members.map((m, i) => (
                            <StaffCard key={m.id} member={m} index={i} />
                          ))}
                        </div>
                      </div>
                    );
                  })}

                  {filteredStaff("all").length === 0 && (
                    <EmptySearch query={search} />
                  )}
                </TabsContent>

                {/* Individual category tabs */}
                {(["doctor", "nurse", "support"] as StaffCategory[]).map((cat) => {
                  const meta = SECTION_META[cat];
                  const members = filteredStaff(cat);
                  return (
                    <TabsContent key={cat} value={cat}>
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-9 h-9 rounded-xl bg-medical-green-pale flex items-center justify-center shrink-0">
                          <meta.icon className={`w-5 h-5 ${meta.accent}`} />
                        </div>
                        <div>
                          <h2 className={`font-display text-xl font-bold ${meta.accent}`}>
                            {meta.heading}
                          </h2>
                          <p className="text-xs text-muted-foreground">
                            {meta.subheading}
                          </p>
                        </div>
                      </div>

                      {members.length > 0 ? (
                        <div
                          className={
                            cat === "doctor"
                              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4"
                              : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                          }
                        >
                          {members.map((m, i) => (
                            <StaffCard key={m.id} member={m} index={i} />
                          ))}
                        </div>
                      ) : (
                        <EmptySearch query={search} />
                      )}
                    </TabsContent>
                  );
                })}
              </Tabs>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function EmptySearch({ query }: { query: string }) {
  return (
    <div className="text-center py-14">
      <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
        <Search className="w-7 h-7 text-muted-foreground" />
      </div>
      <p className="font-semibold text-foreground mb-1">No staff found</p>
      <p className="text-muted-foreground text-sm">
        No results for "{query}". Try a different name or specialty.
      </p>
    </div>
  );
}
