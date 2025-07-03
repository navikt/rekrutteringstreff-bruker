'use client';

import { Loader } from '@navikt/ds-react';
import * as React from 'react';
import { SWRResponse } from 'swr';

type SWRHookResponse<T> = SWRResponse<T, Error> | undefined;

export interface ISWRLasterProps<T extends any[]> {
  visLoaderUnderValidering?: boolean;
  skjulFeilmelding?: boolean;
  hooks: { [K in keyof T]: SWRHookResponse<T[K]> };
  skeleton?: React.ReactNode;
  egenFeilmelding?: (error: Error) => React.ReactNode;
  children: (...data: T) => React.ReactNode;
}

const SWRLaster = <T extends any[]>({
  hooks,
  skeleton,
  children,
  skjulFeilmelding = false,
  egenFeilmelding,
  visLoaderUnderValidering = false,
}: ISWRLasterProps<T>): React.ReactElement | null | undefined => {
  if (hooks.some((hook) => !hook)) {
    return <>{skeleton ? skeleton : <Loader />}</>;
  }

  if (
    hooks.some(
      (hook) =>
        hook?.isLoading || (visLoaderUnderValidering && hook?.isValidating),
    )
  ) {
    return <>{skeleton ? skeleton : <Loader />}</>;
  }

  const error = hooks.find((hook) => hook?.error)?.error;
  if (error && egenFeilmelding) {
    return <>{egenFeilmelding(error)}</>;
  }

  console.log("error", error);
  if (error instanceof Response && error.status === 401) {
    const loginUrl = process.env.LOGIN_URL;
    console.log("loginUrl", loginUrl);
    window.location.href = `${loginUrl}?redirect=${
        window.location.pathname
  }`;

  if (error && !skjulFeilmelding) {
    console.warn(error);
    return <div> Feil ved henting av data </div>;
  }

  if (hooks.every((hook) => hook?.data)) {
    const data = hooks.map((hook) => hook?.data) as T;
    return <>{children(...data)}</>;
  }

  return null;
};

export default SWRLaster;
