import { NextRequest } from "next/server";
import { proxyWithOBO } from "../../oboProxy";
import { RekrutteringstreffMinSide } from "../../api-routes";

export async function GET(req: NextRequest) {
  return proxyWithOBO(RekrutteringstreffMinSide, req);
}

// export async function POST(req: NextRequest) {
//   return proxyWithOBO(KandidatAPI, req);
// }

// export async function PUT(req: NextRequest) {
//   return proxyWithOBO(KandidatAPI, req);
// }

