'use client';

import React, { Suspense } from 'react';
const ActionProgress = React.lazy(() => import('./ActionProgress'));

const steps = [
    "categories",
    "skills",
    "project",
    "summary",
    "asd",
    "o12",
    "asdu",
    "aklsjd",
    "alisdj",
    "asdjio"
];
export function ActionProgressWrapper() {
    return (
        <Suspense fallback={<div className="h-10">Loading...</div>}>
            <ActionProgress steps={steps} />
        </Suspense>
    );
}