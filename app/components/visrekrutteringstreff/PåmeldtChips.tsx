import * as React from 'react';
import {ChevronDownCircleIcon, XMarkOctagonIcon} from "@navikt/aksel-icons";
import {Tag} from "@navikt/ds-react";

export interface PåmeldtChipsProps {
    erPåmeldt: boolean;
}

const PåmeldtChips: React.FC<PåmeldtChipsProps> = ({erPåmeldt}) => {
    let variant: "success" | "error" = "success";
    let textColor: "text-green-700" | "text-red-700" = "text-green-700";
    let tekst = "Jeg blir med";
    let icon:  React.ReactNode = <ChevronDownCircleIcon title={tekst} fontSize="1.5rem" />;

    if (!erPåmeldt) {
        variant = "error";
        textColor = "text-red-700";
        tekst = "Jeg blir ikke med";
        icon = <XMarkOctagonIcon title={tekst} fontSize="1.5rem" />;
    }

  return (
        <Tag variant={variant}
             icon={icon}
             className={`rounded-4xl border-none py-2 px-4 ${textColor}`}
        >
            <span className="ml-1 font-semibold text-base">{tekst}</span>
        </Tag>
  );
};

export default PåmeldtChips;
