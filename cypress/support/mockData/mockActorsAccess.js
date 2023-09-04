export const successfulIntegration = {
  message: "success",
  data: [
    {
      status: "Submitted",
      project: "Totally Real Project",
      role: "Wally",
      casting: "Amica",
      link: "https://actorsaccess.com/virtualaudition/?fromqs=1&qs_results_period=past&qs_filter_type=all&action=read&msg=26393009&result_id=396083",
      date: 0,
    },
    {
      status: "Submitted",
      project: "Star Wars Rebels Season 6",
      role: "Kanan Jarrus",
      casting: "Dave Filoni",
      link: "https://actorsaccess.com/virtualaudition/?fromqs=1&qs_results_period=past&qs_filter_type=all&action=read&msg=26393009&result_id=396084",
      date: 0,
    },
  ],
};
export const unsuccessfullIntegration = {
  statusCode: 401,
  message: "failure",
};

export const noAuditions = {
  message: "success",
  data: [],
};

export const alreadyAddedIntegration = {
  message: "success",
  data: [
    {
      status: "Submitted",
      project: "Totally Real Project",
      role: "Wally",
      casting: "Amica",
      link: "https://actorsaccess.com/virtualaudition/?fromqs=1&qs_results_period=past&qs_filter_type=all&action=read&msg=26393009&result_id=0",
      date: 0,
    },
  ],
};
