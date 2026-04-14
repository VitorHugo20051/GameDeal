import {} from "react";
import { useRouter } from "next/router";
import Game from "../../components/Game";

export default function GamePage() {
  const router = useRouter();
  const { id } = router.query;

  return <Game gameId={id} />;
}