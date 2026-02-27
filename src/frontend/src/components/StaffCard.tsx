import { motion } from "motion/react";
import { Clock, Building2, Phone, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { StaffMember } from "../data/staffData";

// Avatar color map — maps the color key to tailwind classes
const AVATAR_CLASSES: Record<string, { bg: string; text: string }> = {
  green:  { bg: "bg-emerald-100",  text: "text-emerald-700" },
  pink:   { bg: "bg-pink-100",     text: "text-pink-700" },
  red:    { bg: "bg-red-100",      text: "text-red-700" },
  blue:   { bg: "bg-blue-100",     text: "text-blue-700" },
  teal:   { bg: "bg-teal-100",     text: "text-teal-700" },
  purple: { bg: "bg-purple-100",   text: "text-purple-700" },
  indigo: { bg: "bg-indigo-100",   text: "text-indigo-700" },
  violet: { bg: "bg-violet-100",   text: "text-violet-700" },
  amber:  { bg: "bg-amber-100",    text: "text-amber-700" },
  orange: { bg: "bg-orange-100",   text: "text-orange-700" },
};

const CATEGORY_BADGE: Record<string, { label: string; classes: string }> = {
  doctor:  { label: "Doctor",       classes: "bg-medical-green-pale text-medical-green border-0" },
  nurse:   { label: "Nursing Staff", classes: "bg-purple-50 text-purple-700 border-0" },
  support: { label: "Support Staff", classes: "bg-amber-50 text-amber-700 border-0" },
};

interface StaffCardProps {
  member: StaffMember;
  index?: number;
  compact?: boolean;
}

export default function StaffCard({ member, index = 0, compact = false }: StaffCardProps) {
  const avatar = AVATAR_CLASSES[member.avatarColor] ?? AVATAR_CLASSES.green;
  const categoryBadge = CATEGORY_BADGE[member.category];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06, duration: 0.45 }}
    >
      <Card className="h-full border-border shadow-xs hover:shadow-medical transition-all duration-300 group">
        <CardContent className={compact ? "p-4" : "p-5"}>
          {/* Avatar + badge row */}
          <div className="flex items-start justify-between mb-3">
            <div
              className={`rounded-2xl flex items-center justify-center font-display font-bold shrink-0
                ${compact ? "w-12 h-12 text-base" : "w-14 h-14 text-lg"}
                ${avatar.bg} ${avatar.text}
                group-hover:scale-105 transition-transform duration-300`}
            >
              {member.initials}
            </div>
            <Badge className={`text-xs ${categoryBadge.classes} shrink-0 ml-2`}>
              {categoryBadge.label}
            </Badge>
          </div>

          {/* Name & designation */}
          <h3 className={`font-semibold text-foreground leading-tight mb-0.5 ${compact ? "text-sm" : "text-base"}`}>
            {member.name}
          </h3>
          <p className="text-xs text-medical-green font-semibold mb-1">
            {member.designation}
          </p>

          {/* Qualification pill */}
          {member.qualification && (
            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full mb-3">
              <Award className="w-3 h-3" />
              {member.qualification}
            </span>
          )}

          {!compact && (
            <div className="space-y-1.5 mt-2">
              {/* Specialization */}
              {member.specialization && (
                <div className="flex items-start gap-2 text-xs text-muted-foreground">
                  <Building2 className="w-3.5 h-3.5 shrink-0 mt-0.5 text-medical-green/60" />
                  <span>{member.specialization}</span>
                </div>
              )}

              {/* OPD Timings */}
              {member.opdTimings && (
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="w-3.5 h-3.5 shrink-0 text-medical-green/60" />
                  <span className="font-medium text-foreground/80">
                    {member.opdTimings}
                  </span>
                </div>
              )}

              {/* Department */}
              <div className="flex items-start gap-2 text-xs text-muted-foreground">
                <Building2 className="w-3.5 h-3.5 shrink-0 mt-0.5 text-medical-green/60" />
                <span>{member.department}</span>
              </div>

              {/* Contact */}
              {member.contact && (
                <div className="flex items-center gap-2 text-xs">
                  <Phone className="w-3.5 h-3.5 shrink-0 text-medical-green" />
                  <a
                    href={`tel:${member.contact}`}
                    className="text-medical-green font-semibold hover:underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {member.contact}
                  </a>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
