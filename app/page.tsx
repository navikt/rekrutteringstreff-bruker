import InfoSide from '@/app/components/info/InfoSide';
import { sidetittel } from '@/app/util/sidetittel';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: sidetittel('Om rekrutteringstreff'),
};

export default function Home() {
  return <InfoSide />;
}
