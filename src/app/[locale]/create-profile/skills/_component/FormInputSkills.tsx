"use client"
import { Tag, TagInput } from 'emblor'
import { useTranslations } from 'next-intl';
import React, { useState } from 'react'

function FormInputSkills() {
    const t = useTranslations();
    const [activeTagIndexCategories, setActiveTagIndexCategories] = useState<
        number | null
    >(null);
    const [categories, setCategories] = useState<Tag[]>([]);
    return (
        <div>
            <TagInput
                // {...field}
                activeTagIndex={activeTagIndexCategories}
                setActiveTagIndex={setActiveTagIndexCategories}
                placeholder={t("category.placeholder")}
                tags={categories}
                draggable={true}
                direction="row"
                inputFieldPosition="bottom"
                inlineTags={false}
                className="sm:min-w-[450px] flex px-4 font-medium ring-0 ring-primary py-5"
                setTags={(newTags) => {
                    setCategories(newTags);
                    // setValue("category", newTags as [Tag, ...Tag[]]);
                }}
            />
        </div>
    )
}

export default FormInputSkills