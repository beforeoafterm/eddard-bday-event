import { getAttendee, updateAttendee } from '@/lib/directus'
import { ItemInput } from '@directus/sdk'
import { NextApiRequest, NextApiResponse } from 'next'
import { Attendee } from 'types/Attendees.types'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { attendeeId } = req.query
  
  if (req.method === 'GET') {
    const attendee = await getAttendee(attendeeId as string)
    return res.status(200).json(attendee)
  }
  
  if (req.method === 'PATCH') {
    const body = req.body as ItemInput<Attendee>
    const updatedAttendee = await updateAttendee(
      attendeeId as string,
      body
    )
    return res.status(200).json(updatedAttendee)
  }
}