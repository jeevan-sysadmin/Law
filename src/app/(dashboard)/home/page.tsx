// MUI Imports
import Card from '@mui/material/Card'

// Component Imports
import CalendarWrapper from '@views/apps/calendar/CalendarWrapper'

// Styled Component Imports
import AppFullCalendar from '@/libs/styles/AppFullCalendar'

import VideoUploadButton from '@/views/video/Video'

async function fetchEvents() {
  try {
    const res = await fetch(`${process.env.API_URL}/apps/calendar-events`)

    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.status} ${res.statusText}`)
    }

    const contentType = res.headers.get('content-type')
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Response is not in JSON format')
    }

    return res.json()
  } catch (error) {
    console.error('Error fetching events:', error)
    throw error
  }
}

const VideoTranscribePage = async () => {
  try {
    // Fetch events but do not assign the result to a variable since it's not used
    await fetchEvents()
  } catch (error) {
    // Handle error (you might want to show an error message to the user)
    console.error('Error in VideoTranscribePage:', error)
  }

  return (
    <Card>
      <VideoUploadButton />
    </Card>
  )
}

export default VideoTranscribePage
