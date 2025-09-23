import { useTransition } from 'react'
import { AllFilterStates, FilterAction } from '../type/FilterType'
import { parseAsArrayOf, parseAsString, useQueryState } from 'nuqs'

function filterReducer(state: AllFilterStates, action: FilterAction): AllFilterStates {

    switch (action.type) {
        case "SET_QUERY": {
            return { ...state, q: action.payload };
        }
        case "TOGGLE_CATEGORIES": {
            const currentIds = state.categoryIds || []
            const newIds = currentIds.includes(action.payload)
                ? currentIds.filter(id => id !== action.payload)
                : [...currentIds, action.payload]

            return { ...state, categoryIds: newIds.length > 0 ? newIds : null }
        }
        case 'TOGGLE_JOBLEVELS': {
            const currentLevels = state.jobLevels || [];
            const newLevels = currentLevels.includes(action.payload)
                ? currentLevels.filter(level => level !== action.payload)
                : [...currentLevels, action.payload];
            return { ...state, jobLevels: newLevels.length > 0 ? newLevels : null };
        }

        case 'TOGGLE_T': {
            const currentMethods = state.t || [];
            const wasPresent = currentMethods.includes(action.payload);
            const newMethods = currentMethods.includes(action.payload)
                ? currentMethods.filter(method => method !== action.payload)
                : [...currentMethods, action.payload]
            const newState = { ...state, t: newMethods.length > 0 ? newMethods : null };

            if (wasPresent) {
                if (action.payload === '0') newState.hourly_rate = null;
                if (action.payload === '1') newState.amount = null;
            }
            return newState;
        }
        case 'TOGGLE_AMOUNT': {
            const amount = state.amount || "";
            const newAmount = action.payload !== null ? action.payload : null;
            return { ...state, amount: newAmount }
        }
        case 'TOGGLE_HOURLY_RATE': {
            const newAmount = action.payload !== null ? action.payload : null;
            return { ...state, hourly_rate: newAmount }
        }
        case 'CLEAR_ALL_FILTERS':
            return {
                q: null,
                categoryIds: null,
                jobLevels: null,
                t: null,
                amount: null,
                hourly_rate: null
            };
        default:
            return state;
    }
}

function useFilters() {
    const [isPending, startTransition] = useTransition();

    const [categoryIds, setCategoryIds] = useQueryState('categoryIds', parseAsArrayOf(parseAsString).withDefault([]).withOptions({ shallow: false }));
    const [jobLevels, setJobLevels] = useQueryState('jobLevels', parseAsArrayOf(parseAsString).withOptions({ shallow: false }));
    const [t, setT] = useQueryState('t', parseAsArrayOf(parseAsString).withOptions({ shallow: false }));

    const [q, setQ] = useQueryState("q", parseAsString.withDefault("").withOptions({
        shallow: false
    }))
    const [fixedPriceRange, setFixedPriceRange] = useQueryState('amount',
        parseAsString.withDefault("").withOptions({
            shallow: false
        })
    )
    const [hourlyRateRange, setHourlyRateRange] = useQueryState('hourly_rate',
        parseAsString.withDefault("").withOptions({
            shallow: false
        })
    )
    const currentState: AllFilterStates = {
        q: q ?? null,
        categoryIds: categoryIds ?? null,
        jobLevels: jobLevels ?? null,
        t: t ?? null,
        amount: fixedPriceRange ?? null,
        hourly_rate: hourlyRateRange ?? null
    };
    const dispatch = (action: FilterAction) => {
        const newState = filterReducer(currentState, action);
        startTransition(() => {
            setQ(newState.q)
            setCategoryIds(newState.categoryIds);
            setJobLevels(newState.jobLevels);
            setT(newState.t);
            setFixedPriceRange(newState.amount);
            setHourlyRateRange(newState.hourly_rate);
        });
    };
    return {
        filter: currentState, dispatch, isPending
    }
}
export default useFilters