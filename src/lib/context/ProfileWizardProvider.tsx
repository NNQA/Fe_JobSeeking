"use client"
import { createContext, useContext, useState, ReactNode, useCallback } from "react";
import { useRouter } from "next/navigation";
import { ProfileFormData, StepInfo } from "./context.type/profilecontext.type";
import { JobCategory } from "../models/Categories";


interface ProfileWizardContextValue {
    currentStep: number;
    formData: ProfileFormData;
    // updateFormData: <K extends keyof ProfileFormData>(
    //     stepKey: K,
    //     data: ProfileFormData[K]
    // ) => void;
    nextStep: () => void;
    prevStep: () => void;
    // gotoStep: (step: number) => void;
    // saveProgress: () => Promise<void>;
    // submitStep: () => Promise<void>;
    loading: boolean;
    error: string | null;
    totalSteps: number;
    isStepComplete: (step: number) => boolean;
}


interface ProfileWizardProviderProps {
    children: ReactNode;
    initialData?: Partial<ProfileFormData>;
    userId?: string;
}
const STEPS: StepInfo[] = [
    {
        key: "category",
        route: "/create-profile/categories",
        label: "Categories",
        validate: (data: JobCategory) => {
            if (!data.category) return "Please select a category";
            if (data.fields.length < 1 || data.fields.length > 3)
                return "Please select 1 to 3 specialties";
            return null;
        },
    },
    {
        key: "skills",
        route: "/create-profile/skills",
        label: "Skills",
        validate: (data: string[]) => {
            if (data.length === 0) return "At least one skill is required.";
            if (data.length > 15) return "You can select a maximum of 15 skills.";
            return null;
        },
    },
    // {
    //     key: "projects",
    //     route: "/create-profile/projects",
    //     label: "Projects",
    //     validate: (data: ProjectData[]) => {
    //         if (data.length === 0) return "Please add at least one project";
    //         return null;
    //     },
    // },
]

export const ProfileWizardContext = createContext<ProfileWizardContextValue | undefined>(undefined);

export function ProfileWizardProvider({ children, initialData }: ProfileWizardProviderProps) {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
    const [formData, setFormData] = useState<ProfileFormData>({
        category: {
            category: "",
            fields: [],
        },
        skills: [],
        projects: [],
        experience: [],
        education: [],
        summary: "",
        ...initialData,
    });

    const prevStep = useCallback(() => {
        const prevStepNumber = currentStep - 1;
        if (prevStepNumber >= 1) {
            setCurrentStep(prevStepNumber);
            router.push(STEPS[prevStepNumber - 1].route);
        }
    }, [currentStep, router]);

    // const submitStep = useCallback(async () => {
    //     setLoading(true);
    //     setError(null);

    //     const validationError = stepConfig.validate(formData);
    //     if (validationError) throw new Error(validationError);
    //     const payload = stepConfig.getPayload(formData);

    //   // Send POST request to the backend
    //   const response = await fetch(stepConfig.apiEndpoint, {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(payload),
    //   });


    // })    

    const nextStep = useCallback(() => {
        //     if (!validateCurrentStep()) return;

        setError(null);

        setCompletedSteps(prev => {
            const newSet = new Set(prev);
            newSet.add(currentStep);
            return newSet;
        });

        const nextStepNumber = currentStep + 1;
        if (nextStepNumber <= STEPS.length) {
            setCurrentStep(nextStepNumber);
            router.push(STEPS[nextStepNumber - 1].route);
        }
    }, [currentStep, router]);




    const isStepComplete = useCallback((step: number) => {
        return completedSteps.has(step);
    }, [completedSteps]);

    return <ProfileWizardContext.Provider
        value={{
            currentStep,
            formData,
            // updateFormData,
            nextStep,
            prevStep,
            // goToStep,
            // saveProgress,
            // submitProfile,
            loading,
            error,
            totalSteps: STEPS.length,
            isStepComplete,

        }}
    >
        {children}
    </ProfileWizardContext.Provider>
}

export const useProfileWizard = (): ProfileWizardContextValue => {
    const context = useContext(ProfileWizardContext);
    if (context === undefined) {
        throw new Error("useProfileWizard must be used within a ProfileWizardProvider");
    }
    return context;
};
