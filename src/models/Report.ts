import { PrismaClient } from "@prisma/client";
import { Audition } from "./Auditions";
/**
 * Defines the Database representation of a Report
 */

type CreateReportData = {
  total: number;
  topCasting: string;
  topType: string;
  totalByAuditionType: {
    totalSubmitted: number;
    totalAuditioned: number;
    totalCallback: number;
    totalBooked: number;
  };
};
export class Report {
  total: number;
  topCasting: string;
  topType: string;
  totalByAuditionType: {
    totalSubmitted: number;
    totalAuditioned: number;
    totalCallback: number;
    totalBooked: number;
  };

  constructor(data: CreateReportData) {
    const { total, topCasting, topType, totalByAuditionType } = data;
    this.total = total;
    this.topCasting = topCasting;
    this.topType = topType;
    this.totalByAuditionType = totalByAuditionType;
  }

  /**
   * Gets all report data from a specific user based on their ID
   * @param userId
   * @param db
   */

  static getReportsByUserId = async (
    userId: number,
    db: PrismaClient["audition"]
  ) => {
    const arrayOfTypes: string[] = [];
    const arrayOfCasting: string[] = [];
    // get auditions
    const archivedAuditions =
      await Audition.getFormattedArchivedAuditionsByUserId(userId, db);

    // Init report data object
    const reportData = {
      total: archivedAuditions.length,
      topCasting: "Unknown",
      topType: "Unknown",
      totalByAuditionType: {
        totalSubmitted: 0,
        totalAuditioned: 0,
        totalCallback: 0,
        totalBooked: 0,
      },
    };

    // go through auditions and get the latest status of each.
    archivedAuditions.forEach((audition) => {
      arrayOfTypes.push(audition.type as string);
      if (audition.casting) {
        const castingArray = audition.casting as [
          { name: string; company: string }
        ];
        castingArray.forEach((castItem) => {
          arrayOfCasting.push(castItem.name);
        });
      }

      const latestStatus = audition.statuses?.reduce((a, b) => {
        return new Date(a.date) > new Date(b.date) ? a : b;
      });
      // TODO: BI-158 Something is going on with typing here that doesn't make sense
      // @ts-ignore
      switch (latestStatus?.type) {
        case "submitted":
          reportData.totalByAuditionType.totalSubmitted++;
          break;
        case "scheduled":
        case "auditioned":
          reportData.totalByAuditionType.totalAuditioned++;
          break;
        case "callback":
          reportData.totalByAuditionType.totalCallback++;
          break;
        case "booked":
          reportData.totalByAuditionType.totalBooked++;
          break;
        default:
          console.log("No addition for this audition status type!");
      }
    });

    const getMode = (arr: string[]) => {
      return arr
        .sort(
          (a, b) =>
            arrayOfTypes.filter((v) => v === a).length -
            arrayOfTypes.filter((v) => v === b).length
        )
        .pop();
    };
    const topType = getMode(arrayOfTypes);
    const topCasting = getMode(arrayOfCasting);
    reportData.topType = topType || "Unknown";
    reportData.topCasting = topCasting || "Unknown";
    return reportData;
  };
}
