"use client";

import React, { createContext, useContext } from "react";
import { data as defaultData } from "@/data/content";

const DataContext = createContext<any>(defaultData);

export const DataProvider = ({ data, children }: { data: any, children: React.ReactNode }) => {
  return (
    <DataContext.Provider value={data || defaultData}>
      {children}
    </DataContext.Provider>
  );
};

export const useSiteData = () => {
  return useContext(DataContext);
};
