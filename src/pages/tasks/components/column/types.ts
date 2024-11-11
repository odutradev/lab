import React from "react";

export interface ColumnProps {
    children: React.ReactNode;
    hasTasks: boolean;
    status: string;
};