import Image from "next/image";
import styles from "./page.module.css";
import { Event } from "@/app/(public)/page";
import Carousel from "@/components/Carousel";
import EventsDivision from "@/components/EventsDivision";

export interface EventGroup {
  year: number;
  events: Event[];
}

const { BACKEND_ADDRESS } = process.env;

export default async function Events() {
  const response = await fetch(`${BACKEND_ADDRESS}/events/grouped`, {
    next: { tags: ["events"] },
  });
  const events = await response.json();

  //   console.log("events: ", events.eventsGrouped[1].events);

  return (
    <main>
      {events.result && <EventsDivision events={events} />}
      {!events.result && <p>{events.error}</p>}
    </main>
  );
}
