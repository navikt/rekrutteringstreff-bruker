import InfoSide from "@/app/components/info/InfoSide";
import {isLocal} from "@/app/util";
import LoginHandler from "@/app/components/LoginHandler";

export default function Home() {
  return (
      <>
        {!isLocal && <LoginHandler />}
        <InfoSide />
      </>
  );
}
