import React from "react";
import { categories } from "../categories";

export interface Tool {
  id: string;
  name: string;
  description: string;
  category: (typeof categories)[0];
  icon: React.ReactNode;
  views: number;
  gradient: string;
  features?: string[];
  codePreview?: React.ReactNode;
}
