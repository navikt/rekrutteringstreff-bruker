'use client';

import { Page } from '@navikt/ds-react';
import { ReactNode } from 'react';

export default function PageWrapper({
  children,
  footer,
}: {
  children: ReactNode;
  footer: ReactNode;
}) {
  return <Page footer={footer}>{children}</Page>;
}
