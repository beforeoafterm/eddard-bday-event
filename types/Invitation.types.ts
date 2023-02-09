import { ParsedUrlQuery } from "querystring";
import { Attendee } from "./Attendees.types";

export interface InvitationPageProps {
  attendees: Attendee[]

export interface InvitationParams extends ParsedUrlQuery {
  invitationId: string
}