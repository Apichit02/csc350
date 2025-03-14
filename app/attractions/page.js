import React from 'react'
import { 
  Card, CardActions, CardContent, CardMedia, Button, Typography, Grid 
} from '@mui/material'

export async function getData() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
  const res = await fetch("http://127.0.0.1:3000/api/attractions");
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

export default async function page() {
  const data = await getData()
  return (
    <div>
      <Typography variant='h5'>Attractions</Typography>
      <Grid container spacing={1}>
        {data.map(attraction => (
          <Grid item key={attraction.id} xs={12} md={4}>
            <Card>
              <CardMedia
                sx={{ height: 140 }}
                image={attraction.coverimage}
                title={attraction.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {attraction.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {attraction.detail}
                </Typography>
              </CardContent>
              <CardActions>
                <a href={`/attractions/${attraction.id}`}>
                  <Button size="small">Learn More</Button>
                </a>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

