'use client';

import React, { Suspense } from 'react';
const ActionProgress = React.lazy(() => import('./ActionProgress'));

export function ActionProgressWrapper() {
    return (
        <Suspense fallback={<div className="h-10">Loading...</div>}>
            <ActionProgress />
        </Suspense>
    );
}