import { Card, CardContent, Typography } from '@mui/material';

function GameCard({ game }) {
    return (
        <Card sx={{ maxWidth: 345, margin: "1rem" }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {game.title}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default GameCard;