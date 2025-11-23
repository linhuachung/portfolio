"use client";

import { useEffect, useRef, useState } from "react";
import { getDashboardData } from "@/services/dashboard";
import Toast from "@/components/Toast";
import { TOAST_STATUS } from "@/constants/toast";

const AUTO_REFRESH_INTERVAL = 30000;

export function useDashboard(initialPeriod = "month") {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [period, setPeriod] = useState(initialPeriod);
  const [dashboardData, setDashboardData] = useState(null);
  const intervalRef = useRef(null);

  const fetchDashboardData = async (showLoading = true) => {
    try {
      if (showLoading) {
        setLoading(true);
      } else {
        setRefreshing(true);
      }

      const result = await getDashboardData(period);

      if (result.success && result.data) {
        setDashboardData(result.data);
      } else {
        Toast({
          title: result.message || "Failed to load dashboard data",
          type: TOAST_STATUS.error
        });
      }
    } catch (error) {
      Toast({
        title: "An error occurred while loading dashboard data",
        type: TOAST_STATUS.error
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    fetchDashboardData(false);
  };

  const handlePeriodChange = (newPeriod) => {
    setPeriod(newPeriod);
  };

  useEffect(() => {
    fetchDashboardData(true);

    intervalRef.current = setInterval(() => {
      fetchDashboardData(false);
    }, AUTO_REFRESH_INTERVAL);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [period]);

  return {
    loading,
    refreshing,
    period,
    dashboardData,
    handleRefresh,
    handlePeriodChange
  };
}

