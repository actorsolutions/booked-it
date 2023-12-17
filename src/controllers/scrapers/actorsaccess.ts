import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import * as cheerio from "cheerio";
/**
 * @file This file creates integration with Actors Access to be able to grab scrape the data that is useful.
 * This is done in two steps
 *  1. Logs in dynamically with an actual Actors Access username and password and saves the BDDSID and AAUID
 *  2. Using the BDDSID and AAUID as headers for Auth, access the Auditions Table.
 */

/**
 * Authenticates with Actors Access and returns BDSSID and AAUID if successful.
 * @param userName
 * @param password
 */
const loginToActorsAccess = async (userName: string, password: string) => {
  const actorsAccessLoginURL =
    "https://actorsaccess.com/visitor/service.cfm?method=login";

  /**
   *  Creates formatted FormData object
   * @param userName
   * @param password
   */
  const createLoginFormData = (userName: string, password: string) => {
    const formData = new FormData();
    formData.append("timezoneOffset", "420");
    formData.append("pageURL", "/index.cfm");
    formData.append("username", userName);
    formData.append("password", password);
    return formData;
  };

  const response = await axios.post(
    actorsAccessLoginURL,
    createLoginFormData(userName, password)
  );
  if (response.data.status === "error") {
    return false;
  }
  const setCookieData = response.headers["set-cookie"];
  // @ts-ignore
  const BDSSID = setCookieData[1];
  // @ts-ignore
  const AAUID = setCookieData[2];
  return { BDSSID, AAUID };
};
/** Scrapes HTML from Actors Access's Audition Grid.
 *
 * @param html
 */
export const auditionScraper = (html: string) => {
  interface ActorsAccessAudition {
    status: string;
    project: string;
    role: string;
    casting: string;
    link: string;
    date: number;
  }
  const auditions: ActorsAccessAudition[] = [];
  const $ = cheerio.load(html);
  const rows = $(".quicksheet-table-row");
  for (const row of rows) {
    const cells = $(row).children(".quicksheet-table-cell");
    const status = $(cells).find(".quicksheet-status").text();
    const project = $(cells).find(".quicksheet-project-name").text();
    const role = $(cells).find(".quicksheet-role-name").text();
    const casting = $(cells).find(".quicksheet-casting-name").text();
    const date = $(cells).find(".quicksheet-future-date").text().slice(1, 13);
    const link = "https://actorsaccess.com" + $(row).attr("href");

    const auditionObj = {
      status,
      project,
      role,
      casting,
      link,
      date: Date.parse(`${date} 2023 00:00:00 UTC`),
    };
    auditions.push(auditionObj);
  }
  return auditions;
};
/**
 * Handles Actors Access Integration Request
 * @param req
 * @param res
 */
export const getActorAccessSubmissions = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const getAuditions = async (BDSSID: string, AAUID: string) => {
    /**
     * Creates FormData for Actors Access's Grid API
     */
    const auditionFormData = () => {
      const formData = new FormData();
      formData.append("results_period", "past");
      formData.append("filter_sort_column", "date");
      formData.append("filter_sort_direction", "down");
      formData.append("filter_type", "all");
      formData.append("filter_select_status", "Submitted");
      formData.append("filter_select_status_input", "All");
      formData.append("filter_search_for", "");
      formData.append("filter_start_date", "1/01/2023");
      formData.append("filter_end_date", "7/28/2023");
      return formData;
    };

    const URL = "https://actorsaccess.com/projects/index.cfm?view=quicksheet";
    const response = await axios.get(URL, {
      data: auditionFormData(),
      headers: {
        Cookie: BDSSID + AAUID,
      },
    });

    return auditionScraper(response.data);
  };

  const { userName, password } = JSON.parse(req.body);
  const loginResponse = await loginToActorsAccess(userName, password);
  if (!loginResponse) {
    res.status(401).send({
      message: "failure",
    });
  } else {
    const { BDSSID, AAUID } = await loginResponse;
    res.status(200).send({
      message: "success",
      data: await getAuditions(BDSSID, AAUID),
    });
  }
};

export const checkAALogin = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { userName, password } = JSON.parse(req.body);
  const loginResponse = await loginToActorsAccess(userName, password);
  if (!loginResponse) {
    res.status(401).send({
      message: "failure",
    });
  }
  res.status(200).send({ message: "success" });
};
