import React from 'react'
import { 
  Container, Card, CardActions, CardContent, CardMedia, Button, Typography
} from '@mui/material';

export async function getData(id) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
  const res = await fetch(
    `${API_URL}/api/attractions/${id}/`, 
    { cache: 'no-store' }
  )
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

export default async function page({ params }) {
  const id = params.id
  const data = await getData(id)
  console.log(data.length)
  return (
    <Container maxWidth="md" sx={{ mt: 2 }}>
      { data.length > 0 &&
        <Card>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {data[0].name}
            </Typography>
          </CardContent>
          <CardMedia
            sx={{ height: 400 }}
            image={data[0].coverimage}
            title={data[0].name}
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'pre-wrap' }}>
              {data[0].detail}
            </Typography>
          </CardContent>
        </Card>
      }
    </Container>
  )
}

