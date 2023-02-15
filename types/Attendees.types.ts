export type Attendee = {
  id: string
  status: AttendeeStatus
  date_created: Date
  date_updated: Date
  firstName: string
  lastName: string
  age: AttendeeAge
  canInvite: boolean
  relatedAttendees: Attendee[]
}

export type AttendeeStatus = 'confirmed' | 'invited' | 'declined'

type AttendeeAge = 'child' | 'adult'