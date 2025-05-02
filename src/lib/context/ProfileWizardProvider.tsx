"use client"
import { createContext, useContext, useState, ReactNode, useCallback } from "react";
import { useRouter } from "next/navigation";
import { ProfileFormData, StepConfig } from "./context.type/profilecontext.type";
import { JobCategory } from "../models/Categories";


interface ProfileWizardContextValue {
    currentStep: number;
    formData: ProfileFormData;
    updateFormData: <K extends keyof ProfileFormData>(
        stepKey: K,
        data: ProfileFormData[K]
    ) => void;
    submitStep: () => Promise<void>;
    goBack: () => void;
    loading: boolean;
    error: string | null;
    totalSteps: number;
}


interface ProfileWizardProviderProps {
    children: ReactNode;
    initialData?: Partial<ProfileFormData>;
    userId?: string;
}
const stepsConfig: StepConfig[] = [
    {
        step: 1,
        route: "/create-profile/categories",
        apiEndpoint: "/api/user-profile/categories",
        validate: (data) => {
            const { category, fields } = data.category;
            if (!category) return "Please select a category";
            if (fields.length < 1 || fields.length > 3)
                return "Please select 1 to 3 fields";
            return null;
        },
        getPayload: (data) => ({
            category: data.category.category,
            fields: data.category.fields,
        }),
    },
    {
        step: 2,
        route: "/create-profile/skills",
        apiEndpoint: "/api/user-profile/skills",
        validate: (data) => {
            const { skills } = data;
            if (skills.length === 0) return "At least one skill is required.";
            if (skills.length > 15) return "You can select a maximum of 15 skills.";
            return null;
        },
        getPayload: (data) => ({
            userId: 1,
            skills: data.skills,
        }),
    },
]
const STORAGE_KEY = "profile_wizard_draft";

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

    const updateFormData = useCallback(<K extends keyof ProfileFormData>(
        stepKey: K,
        data: ProfileFormData[K]
    ) => {
        setFormData((prev) => ({
            ...prev,
            [stepKey]: data,
        }));
    }, []);

    const submitStep = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const stepConfig = stepsConfig.find((s) => s.step === currentStep);
            if (!stepConfig) throw new Error("Invalid step");

            //   // Validate the form data
            //   const validationError = stepConfig.validate(formData);
            //   if (validationError) throw new Error(validationError);

            //   // Prepare the payload
            //   const payload = stepConfig.getPayload(formData);

            //   // Send POST request to the backend
            //   const response = await fetch(stepConfig.apiEndpoint, {
            //     method: "POST",
            //     headers: { "Content-Type": "application/json" },
            //     body: JSON.stringify(payload),
            //   });

            //   if (!response.ok) {
            //     const errorData = await response.json();
            //     throw new Error(errorData.message || "Failed to save data");
            //   }

            // Navigate to the next step
            const nextStep = currentStep + 1;
            const nextStepConfig = stepsConfig.find((s) => s.step === nextStep);
            if (nextStepConfig) {
                setCurrentStep(nextStep);
                router.push(nextStepConfig.route);
            } else {
                router.push("/profile");
            }
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unknown error occurred");
            }
        } finally {
            setLoading(false);
        }
    }, [currentStep, formData, router]);

    const goBack = useCallback(() => {
        const prevStep = currentStep - 1;
        const prevStepConfig = stepsConfig.find((s) => s.step === prevStep);
        if (prevStepConfig) {
            setCurrentStep(prevStep);
            router.push(prevStepConfig.route);
        }
    }, [currentStep, router]);
    return <ProfileWizardContext.Provider
        value={{
            currentStep,
            formData,
            goBack,
            submitStep,
            updateFormData,
            loading,
            error,
            totalSteps: currentStep,
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
