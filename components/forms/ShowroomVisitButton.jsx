"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import ShowroomVisitModal from "@/components/forms/ShowroomVisitModal";

/** Drop-in trigger: <ShowroomVisitButton car={car}>Book a Test Drive</ShowroomVisitButton> */
export default function ShowroomVisitButton({
    car,
    defaultType,
    children = "Book a Showroom Visit",
    ...buttonProps
}) {
    const [open, setOpen] = useState(false);
    return (
        <>
            <Button onClick={() => setOpen(true)} aria-haspopup="dialog" {...buttonProps}>
                {children}
            </Button>
            <ShowroomVisitModal
                open={open}
                onClose={() => setOpen(false)}
                car={car}
                defaultType={defaultType}
            />
        </>
    );
}
