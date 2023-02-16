export type Attendee = {
  id: string
  status: AttendeeStatus
  date_created: Date
  date_updated: Date
  firstName: string
  lastName: string
  email: string
  heroName: string
  age: AttendeeAge
  canInvite: boolean
  groupedAttendees: Attendee[]
}

export type AttendeeStatus = 'confirmed' | 'invited' | 'declined'

type AttendeeAge = 'child' | 'adult'