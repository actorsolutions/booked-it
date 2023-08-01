import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import * as cheerio from "cheerio";

const loginToActorsAccess = async () => {
  const actorsAccessLoginURL =
    "https://actorsaccess.com/visitor/service.cfm?method=login";
  const createLoginFormData = () => {
    const formData = new FormData();
    formData.append("timezoneOffset", "420");
    formData.append("pageURL", "/index.cfm");
    formData.append("username", process.env.AA_USERNAME as string);
    formData.append("password", process.env.AA_PW as string);
    return formData;
  };

  const cookieAndHeaders = await axios.post(
    actorsAccessLoginURL,
    createLoginFormData()
  );
  const setCookieData = cookieAndHeaders.headers["set-cookie"];
  // @ts-ignore
  const BDSSID = setCookieData[1];
  // @ts-ignore
  const AAUID = setCookieData[2];
  return { BDSSID, AAUID };
};
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
      date: new Date(Date.parse(`${date} 2023`)).setHours(0, 0, 0, 0),
    };
    auditions.push(auditionObj);
  }
  return auditions;
};
export const getActorAccessSubmissions = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const getAuditions = async () => {
    const { BDSSID, AAUID } = await loginToActorsAccess();

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

  res.status(200).send({
    message: "success",
    data: await getAuditions(),
  });
};
