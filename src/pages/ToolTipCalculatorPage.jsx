import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ToolTipCalculatorPage() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/tools/bill-splitter", { replace: true });
  }, [navigate]);

  return null;
}