import * as React from 'react';
import {ChevronDownCircleIcon, XMarkOctagonIcon} from "@navikt/aksel-icons";
import {Tag} from "@navikt/ds-react";

export interface PåmeldtChipsProps {
    erPåmeldt: boolean;
}

const PåmeldtChips: React.FC<PåmeldtChipsProps> = ({erPåmeldt}) => {
    let variant: "success" | "error" = "success";
    let tekst = "Jeg blir med";
    let icon:  React.ReactNode = <ChevronDownCircleIcon aria-hidden fontSize="1.5rem" />;

    if (!erPåmeldt) {
        variant = "error";
        tekst = "Jeg blir ikke med";
        icon = <XMarkOctagonIcon aria-hidden fontSize="1.5rem" />;
    }

  return (
        <Tag variant={variant}
             icon={icon}
             className='rounded-4xl border-none py-2 px-4'
        >
            <span className="ml-1 font-semibold text-base">{tekst}</span>
        </Tag>
  );
};

export default PåmeldtChips;
