'use client';

import * as React from 'react';
import {useUmami} from "@/app/providers/UmamiContext";
import {UmamiEvent} from "@/app/util/umamiEvents";
import {useEffect} from "react";
import HeadingMedBody from "@/app/components/visrekrutteringstreff/HeadingMedBody";

const InfoSide: React.FC = () => {
  const { track } = useUmami();

  useEffect(() => {
    track(UmamiEvent.Forside.vis_forside);
  }, [track]);

  return (
      <HeadingMedBody heading="Rekrutteringstreff">
          Dette er møteplassen der du som jobbsøker kan komme i direkte dialog med arbeidsgivere om konkrete stillinger.<br />
          For å delta må du være registrert som arbeidssøker hos Nav og ha en oppdatert CV.<br />
          <br />
          Ønsker du å delta, må du ta kontakt med veileder ved ditt nærmeste Nav kontor
      </HeadingMedBody>
  );
};

export default InfoSide;
