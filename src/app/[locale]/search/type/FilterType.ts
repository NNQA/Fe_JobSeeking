export interface ExpandedSections {
    category: boolean;
    experience: boolean;
    jobType: boolean;
    proposals: boolean;
    clientInfo: boolean;
}

export interface FilterProps {
    expandedSections: ExpandedSections;
    toggleSection: (section: keyof ExpandedSections) => void;
}

export interface PriceRange {
    min: number | null;
    max: number | null;
}

export interface AllFilterStates {
    q: string | null;
    categoryIds: string[] | null,
    jobLevels: string[] | null,
    t: string[] | null,
    amount: string | null,
    hourly_rate: string | null,
    // clientId: parseAsString,
}
export type FilterAction =
    | { type: 'SET_QUERY'; payload: string | null }
    | { type: "TOGGLE_CATEGORIES", payload: string }
    | { type: "TOGGLE_JOBLEVELS", payload: string }
    | { type: "TOGGLE_T", payload: string }
    | { type: "TOGGLE_AMOUNT", payload: string | null }
    | { type: "TOGGLE_HOURLY_RATE", payload: string | null }
    | { type: 'CLEAR_ALL_FILTERS' };
