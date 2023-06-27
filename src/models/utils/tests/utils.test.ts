import { audition_statuses, audition_types } from "@prisma/client";
import {
  formatAudition,
  formatAuditions,
} from "@/models/utils/formatAuditions";

describe("Tests formatting auditions to AuditionData", () => {
  it("Formats one audition", async () => {
    const today = new Date();
    const audition = {
      id: 0,
      createdAt: today,
      userId: 1,
      date: 0,
      project: "Test",
      company: "Test Company",
      callBackDate: null,
      casting: [{ name: "Test testerson", company: "Tester Casting" }],
      notes: "Notes!",
      type: "film" as audition_types,
      status: "scheduled" as audition_statuses,
      archived: false,
      statuses: [
        {
          id: 0,
          statusId: 0,
          auditionId: 0,
          date: 0,
          Status: {
            id: 0,
            type: "scheduled",
          },
        },
      ],
    };

    const expected = {
      id: 0,
      userId: 1,
      createdAt: today,
      date: 0,
      project: "Test",
      company: "Test Company",
      callBackDate: null,
      casting: [{ name: "Test testerson", company: "Tester Casting" }],
      notes: "Notes!",
      type: "film",
      status: "scheduled",
      archived: false,
      statuses: [
        {
          id: 0,
          statusId: 0,
          auditionId: 0,
          date: 0,
          type: "scheduled",
        },
      ],
    };

    expect(formatAudition(audition)).toEqual(expected);
  });
  it("Formats multiple auditions", async () => {
    const today = new Date();
    const auditions = [
      {
        id: 0,
        createdAt: today,
        userId: 1,
        date: 0,
        project: "Test",
        company: "Test Company",
        callBackDate: null,
        casting: [{ name: "Test testerson", company: "Tester Casting" }],
        notes: "Notes!",
        type: "film" as audition_types,
        status: "scheduled" as audition_statuses,
        archived: false,
        statuses: [
          {
            id: 0,
            statusId: 0,
            auditionId: 0,
            date: 0,
            Status: {
              id: 0,
              type: "scheduled",
            },
          },
        ],
      },
      {
        id: 0,
        createdAt: today,
        userId: 1,
        date: 0,
        project: "Test",
        company: "Test Company",
        callBackDate: null,
        casting: [{ name: "Test testerson", company: "Tester Casting" }],
        notes: "Notes!",
        type: "film" as audition_types,
        status: "scheduled" as audition_statuses,
        archived: false,
        statuses: [
          {
            id: 0,
            statusId: 0,
            auditionId: 0,
            date: 0,
            Status: {
              id: 0,
              type: "booked",
            },
          },
        ],
      },
    ];

    const expected = [
      {
        id: 0,
        userId: 1,
        createdAt: today,
        date: 0,
        project: "Test",
        company: "Test Company",
        callBackDate: null,
        casting: [{ name: "Test testerson", company: "Tester Casting" }],
        notes: "Notes!",
        type: "film",
        status: "scheduled",
        archived: false,
        statuses: [
          {
            id: 0,
            statusId: 0,
            auditionId: 0,
            date: 0,
            type: "scheduled",
          },
        ],
      },
      {
        id: 0,
        userId: 1,
        createdAt: today,
        date: 0,
        project: "Test",
        company: "Test Company",
        callBackDate: null,
        casting: [{ name: "Test testerson", company: "Tester Casting" }],
        notes: "Notes!",
        type: "film",
        status: "scheduled",
        archived: false,
        statuses: [
          {
            id: 0,
            statusId: 0,
            auditionId: 0,
            date: 0,
            type: "booked",
          },
        ],
      },
    ];

    expect(formatAuditions(auditions)).toEqual(expected);
  });
});
