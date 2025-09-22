
import { useState } from 'react';
import { ExpandedSections } from '../../app/[locale]/search/type/FilterType';
import { truncate } from 'fs';

export const useFilterState = () => {
    const [expandedSections, setExpandedSections] = useState<ExpandedSections>({
        category: true,
        experience: true,
        jobType: true,
        proposals: true,
        clientInfo: true,
    });

    const toggleSection = (section: keyof ExpandedSections) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    return {
        expandedSections,
        toggleSection
    };
};