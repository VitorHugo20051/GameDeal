import {} from "react";
import { useRouter } from "next/router";
import Game from "../../components/Game";
import { addToWatchlist } from "@/lib/api";

export default function GamePage() {
  const router = useRouter();
  const { id, title, slug } = router.query;

  return (<div>
      <Game gameId={id} />
      <button onClick={() => router.back()}>Back</button>
      <button onClick={() => addToWatchlist({ itad_id: id, title, slug })}>Add to Watchlist</button>
    </div>
  );
}