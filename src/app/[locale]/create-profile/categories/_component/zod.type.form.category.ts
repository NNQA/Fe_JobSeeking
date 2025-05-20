

import {z} from 'zod';

export const categorySchema = z.object({    
    category: z.string(),
    fields: z.array(
        z.object({
            name: z.string(),
        })
    ),
}).strict();

export type categoriesSchema = z.infer<typeof categorySchema>;