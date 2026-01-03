"use client";

import { useState } from "react";
import { addMonths, subMonths, format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from "date-fns";

import { PageHeader } from "@/components/PageHeader";
import { ExportButton } from "@/components/ExportButton";
import { AttendanceCalendar } from "@/components/prayerChain/AttendanceCalendar";
import { MonthNavigator } from "@/components/prayerChain/MonthNavigator";
import { AttendanceStats } from "@/components/prayerChain/AttendanceStats";
import { RecentAttendance } from "@/components/prayerChain/RecentAttendance";

import { mockPrayerGroups } from "@/data/mockData";

export default function PrayerGroupsPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const userAttendance = mockPrayerGroups.filter(
    (p) => p.userId === "1"
  );

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // ---- Stats calculation (business logic stays here)
  const presentDays = userAttendance.filter(
    (a) =>
      a.status === "present" &&
      new Date(a.date).getMonth() === currentMonth.getMonth()
  ).length;

  const absentDays = userAttendance.filter(
    (a) =>
      a.status === "absent" &&
      new Date(a.date).getMonth() === currentMonth.getMonth()
  ).length;

  const excusedDays = userAttendance.filter(
    (a) =>
      a.status === "excused" &&
      new Date(a.date).getMonth() === currentMonth.getMonth()
  ).length;

  const attendanceRate =
    presentDays + absentDays > 0
      ? Math.round((presentDays / (presentDays + absentDays)) * 100)
      : 0;

  const exportData = daysInMonth.map((day) => {
    const record = userAttendance.find((a) =>
      isSameDay(new Date(a.date), day)
    );

    return {
      date: format(day, "yyyy-MM-dd"),
      day: format(day, "EEEE"),
      status: record?.status || "no-record",
      notes: record?.notes || "",
    };
  });

  return (
    <div className="space-y-8 rounded-xl bg-background p-4 md:p-8">
      <PageHeader
        title="Prayer Groups"
        description="Track your daily prayer group attendance"
      />

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <MonthNavigator
          currentMonth={currentMonth}
          onPrev={() => setCurrentMonth(subMonths(currentMonth, 1))}
          onNext={() => setCurrentMonth(addMonths(currentMonth, 1))}
        />

        <ExportButton
          data={exportData}
          filename={`prayer_attendance_${format(currentMonth, "yyyy-MM")}`}
          headers={["Date", "Day", "Status", "Notes"]}
        />
      </div>

      <AttendanceStats
        present={presentDays}
        absent={absentDays}
        excused={excusedDays}
        rate={attendanceRate}
      />

      <AttendanceCalendar
        attendance={userAttendance}
        month={currentMonth}
      />

      <RecentAttendance attendance={userAttendance} />
    </div>
  );
}
