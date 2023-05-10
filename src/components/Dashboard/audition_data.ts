export interface Casting {
  name: string;
}

export interface Audition {
  id: number;
  userId: number;
  date: number;
  casting: Casting[];
  project: string;
  company: string;
  notes: string;
  type: string;
  callBackDate?: number;
  status: string;
  archived: boolean;
}

export const AUDITIONS: Audition[] = [
    {
      id: 1,
      userId: 1,
      date: new Date("01/01/23").getTime(),
      project: "Star Wars 10",
      casting: [],
      company: "Disney",
      notes: "really apprehensive about this one",
      type: "Cinema",
      status: "Audition",
      archived: false,
    },
    {
      id: 2,
      userId: 1,
      date: new Date("02/02/23").getTime(),
      casting: [],
      project: "Bounce",
      company: "Denardi Studios",
      notes: "Hilarious startup sitcom",
      type: "Television",
      status: "Callback",
      archived: false,
    },
    {
      id: 3,
      userId: 1,
      date: new Date("03/03/23").getTime(),
      project: "Foo",
      company: "Bar",
      casting: [],
      notes: "no idea",
      type: "Unknown",
      status: "Audition",
      archived: false,
    },
 {
      id: 4,
      userId: 1,
      date: new Date("03/02/23").getTime(),
      casting: [],
      project: "Mission Impossible 101",
      company: "Tommy Cruise",
      notes: "holy shit, another one?",
      type: "Cinema",
      status: "Callback",
      archived: false,
    },
 ].sort((a,b) => b.date - a.date);

