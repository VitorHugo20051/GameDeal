import { Card, CardContent, Typography } from '@mui/material';
import Link from 'next/link';

function GameCard({ game }) {
    return (
        <Card sx={{ maxWidth: 345, margin: "1rem" }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    <Link href={`/game/${game.id}`} passHref>
                        {game.title}
                    </Link>
                </Typography>
            </CardContent>
        </Card>
    );
}

export default GameCard;