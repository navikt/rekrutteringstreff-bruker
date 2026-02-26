import { RekrutteringstreffStatus } from '@/app/types';
import { LocalAlert } from '@navikt/ds-react';

export interface RekrutteringstreffStatusBannerProps {
  status: string;
}

export default function RekrutteringstreffStatusBanner({
  status,
}: RekrutteringstreffStatusBannerProps) {
  if (status === RekrutteringstreffStatus.SLETTET) {
    return (
      <div className='flex flex-grow items-center justify-center'>
        <LocalAlert status='error'>
          <LocalAlert.Header>
            <LocalAlert.Title>Rekrutteringstreffet er slettet</LocalAlert.Title>
          </LocalAlert.Header>
          <LocalAlert.Content>
            Rekrutteringstreffet er ikke lengre tilgjengelig da det er slettet.
          </LocalAlert.Content>
        </LocalAlert>
      </div>
    );
  } else if (status === RekrutteringstreffStatus.UTKAST) {
    return (
      <div className='flex flex-grow items-center justify-center'>
        <LocalAlert status='warning'>
          <LocalAlert.Header>
            <LocalAlert.Title>
              Rekrutteringstreffet er ikke publisert
            </LocalAlert.Title>
          </LocalAlert.Header>
          <LocalAlert.Content>
            Rekrutteringstreffet er ikke tilgjengelig enda da det ikke er
            publisert.
          </LocalAlert.Content>
        </LocalAlert>
      </div>
    );
  }
  return null;
}
