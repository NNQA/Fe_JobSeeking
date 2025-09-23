import { type ClassValue, clsx } from "clsx"
import { ReadonlyURLSearchParams } from "next/navigation";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function checkInstanceResponsce(input: String) {
  switch (input) {
    case "/system/checkcode": {
      return 1;
    }
  }
  return 0;
}

export function getErrorMessage(errors: Record<string, string[]>): string {
  if (!errors || typeof errors !== "object") return "Something is error.";

  return errors.form?.[0] || Object.values(errors)[0]?.[0] || "Something is error.";
}

export const buildPreservedFilters = (getParams: ReadonlyURLSearchParams, updates: Record<string, any>) => {
  const preservedFilters: Record<string, any> = {};

  // Always preserve all existing parameters
  const paramKeys = [
    'q', 'categoryIds', 'jobLevels', 'skillIds', 'budgetMethod',
    'minBudget', 'maxBudget', 'minHourlyRate', 'maxHourlyRate',
    'clientId', 'sortBy', 'sortDirection', 'page', 'size'
  ];

  paramKeys.forEach(key => {
    const value = getParams.get(key);
    if (value) {
      // Handle array parameters
      if (['categoryIds', 'jobLevels', 'skillIds'].includes(key)) {
        preservedFilters[key] = value.split(',').filter(Boolean);
      } else {
        preservedFilters[key] = value;
      }
    }
  });

  // Apply updates
  Object.entries(updates).forEach(([key, value]) => {
    if (Array.isArray(value) && value.length === 0) {
      delete preservedFilters[key]; // Remove empty arrays
    } else if (value !== "" && value !== null && value !== undefined) {
      preservedFilters[key] = value;
    } else {
      delete preservedFilters[key]; // Remove empty values
    }
  });

  return preservedFilters;
};

export function buildSearchParams(filters: Record<string, any>): URLSearchParams {
  const params = new URLSearchParams();

  if (filters.q) {
    params.set("q", String(filters.q));
  }

  if (filters.categoryIds && filters.categoryIds.length > 0) {
    params.set(
      "categoryIds",
      Array.isArray(filters.categoryIds)
        ? filters.categoryIds.join(",")
        : String(filters.categoryIds)
    );
  }

  if (filters.skillIds && filters.skillIds.length > 0) {
    params.set(
      "skillIds",
      Array.isArray(filters.skillIds)
        ? filters.skillIds.join(",")
        : String(filters.skillIds)
    );
  }

  if (filters.jobLevels && filters.jobLevels.length > 0) {
    params.set(
      "jobLevels",
      Array.isArray(filters.jobLevels)
        ? filters.jobLevels.join(",")
        : String(filters.jobLevels)
    );
  }

  if (filters.t) {
    params.set("t",
      Array.isArray(filters.t)
        ? filters.t.join(",")
        : String(filters.t)
    );
  }
  if (filters.amount) params.set("amount", String(filters.amount));
  if (filters.hourly_rate) params.set("hourly_rate", String(filters.hourly_rate));

  if (filters.clientId) params.set("clientId", String(filters.clientId));

  if (filters.sortBy) params.set("sortBy", String(filters.sortBy));
  if (filters.sortDirection) params.set("sortDirection", String(filters.sortDirection));

  if (filters.page !== undefined && filters.page !== null) {
    params.set("page", String(filters.page));
  }
  if (filters.size !== undefined && filters.size !== null) params.set("size", String(filters.size));

  return params;
}

export enum JobType {
  Art,
  Bussiness,
  Communications,
  Education,
  Hospitality,
  "Information technology",
  "Sales and Marketing",
}
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null


  return (...args: Parameters<T>) => {

    if (timeout) {
      clearTimeout(timeout)
    }


    timeout = setTimeout(() => {
      func(...args)
    }, wait)
  }
}