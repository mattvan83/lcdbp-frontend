import Image from "next/image";
import styles from "./page.module.css";
import { Event } from "@/app/page";
import Carousel from "@/components/Carousel";
import EventsDivision from "@/components/EventsDivision";

export interface EventGroup {
  year: number;
  events: Event[];
}

const BACKEND_ADDRESS = process.env.BACKEND_ADDRESS;

export default async function Events() {
  const response = await fetch(`${BACKEND_ADDRESS}/events/grouped`);
  const events = await response.json();

  //   console.log("events: ", events.eventsGrouped[1].events);

  return (
    <main>
      {events.result && <EventsDivision events={events} />}
      {!events.result && <p>{events.error}</p>}
    </main>
  );
}
