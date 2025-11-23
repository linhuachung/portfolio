"use client";

import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FaSync } from "react-icons/fa";
import { PERIOD_OPTIONS } from "../constants/dashboardConfig";

export default function DashboardHeader({ period, onPeriodChange, onRefresh, refreshing }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-white/60">Overview of your portfolio analytics</p>
      </div>
      <div className="flex items-center gap-4">
        <Button
          onClick={onRefresh}
          disabled={refreshing}
          variant="outline"
          className="bg-secondary border-white/20 hover:bg-secondary/80"
        >
          <FaSync className={`mr-2 ${refreshing ? "animate-spin" : ""}`} />
          Refresh
        </Button>
        <Select value={period} onValueChange={onPeriodChange}>
          <SelectTrigger className="w-[180px] bg-secondary border-white/20">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            {PERIOD_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

