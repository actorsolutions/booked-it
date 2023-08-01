import { auditionScraper } from "../actorsaccess";

const mockHTML = `
<div class="quicksheet-results">
    <div class="quicksheet-table-container">
    <!-- TABLE HEADERS -->
<div id="quicksheet-table-header" class="quicksheet-table-header">
    <div class="quicksheet-table-header-cell quicksheet-table-header-sortable">
    <p onclick="sortQuicksheet('type')">Type</p>
<i onclick="sortQuicksheet('type')" class="hide quicksheet-chevron-up"></i>
</div>
<div class="quicksheet-table-header-cell quicksheet-table-header-sortable">
    <p onclick="sortQuicksheet('status_desc')">Status</p>
    <i onclick="sortQuicksheet('status_desc')" class="hide quicksheet-chevron-up"></i>
</div>
<div class="quicksheet-table-header-cell quicksheet-table-header-sortable">
    <p onclick="sortQuicksheet('project')">Project</p>
    <i onclick="sortQuicksheet('project')" class="hide quicksheet-chevron-up"></i>
</div>
<div class="quicksheet-table-header-cell quicksheet-table-header-sortable">
    <p onclick="sortQuicksheet('role')">Role</p>
    <i onclick="sortQuicksheet('role')" class="hide quicksheet-chevron-up"></i>
</div>
<div class="quicksheet-table-header-cell quicksheet-table-header-sortable">
    <p onclick="sortQuicksheet('casting')">Casting</p>
    <i onclick="sortQuicksheet('casting')" class="hide quicksheet-chevron-up"></i>
</div>
<div class="quicksheet-table-header-cell quicksheet-table-header-sortable">
    <p class="quicksheet-bold-header" onclick="sortQuicksheet('date')">Date &amp; Time</p>
    <i onclick="sortQuicksheet('date')" class="quicksheet-chevron-bold quicksheet-chevron-down"></i>
</div>
</div>
<a class="quicksheet-table-row quicksheet-past-row" href="/virtualaudition/?fromqs=1&amp;qs_results_period=past&amp;qs_filter_type=all&amp;action=read&amp;msg=26657171&amp;result_id=401031" target="_blank">
    <div class="quicksheet-table-cell">
        <p class="quicksheet-badge">Eco Cast Self-Tape</p>
    </div>
    <div class="quicksheet-table-cell">
        <p class="quicksheet-status quicksheet-confirmed">Submitted</p>
    </div>
    <div class="quicksheet-table-cell">
        <p class="quicksheet-project-name quicksheet-table-long-cell">BEYOND BELIEF: FACT OR FICTION #5 “Life Sentence”</p>
    </div>
    <div class="quicksheet-table-cell">
        <p class="quicksheet-role-name quicksheet-table-long-cell">TRAVIS</p>
    </div>
    <div class="quicksheet-table-cell">
        <p class="quicksheet-casting-name quicksheet-table-long-cell">Stefanie Seifer &amp; Hailey Giles</p>
    </div>
    <div class="quicksheet-table-cell">
        <p class="quicksheet-future-date">
            Thu, Jun 29
            @ 4:00 <span class="quicksheet-am-pm">PM</span>
        </p>
    </div>
</a>
<a class="quicksheet-table-row quicksheet-past-row" href="/virtualaudition/?fromqs=1&amp;qs_results_period=past&amp;qs_filter_type=all&amp;action=read&amp;msg=26423968&amp;result_id=396627" target="_blank">
    <div class="quicksheet-table-cell">
        <p class="quicksheet-badge">Eco Cast Self-Tape</p>
    </div>
    <div class="quicksheet-table-cell">
        <p class="quicksheet-status quicksheet-confirmed">Submitted</p>
    </div>
    <div class="quicksheet-table-cell">
        <p class="quicksheet-project-name quicksheet-table-long-cell"></p>
    </div>
    <div class="quicksheet-table-cell">
        <p class="quicksheet-role-name quicksheet-table-long-cell">BACHELOR</p>
    </div>
    <div class="quicksheet-table-cell">
        <p class="quicksheet-casting-name quicksheet-table-long-cell">Lesley Wolff</p>
    </div>
    <div class="quicksheet-table-cell">
        <p class="quicksheet-future-date">
            Thu, Jun 08
            @ 5:00 <span class="quicksheet-am-pm">PM</span>
        </p>
    </div>
</a>
<a class="quicksheet-table-row quicksheet-past-row" href="/virtualaudition/?fromqs=1&amp;qs_results_period=past&amp;qs_filter_type=all&amp;action=read&amp;msg=26393009&amp;result_id=396083" target="_blank">
    <div class="quicksheet-table-cell">
        <p class="quicksheet-badge">Eco Cast Self-Tape</p>
    </div>
    <div class="quicksheet-table-cell">
        <p class="quicksheet-status quicksheet-confirmed">Submitted</p>
    </div>
    <div class="quicksheet-table-cell">
        <p class="quicksheet-project-name quicksheet-table-long-cell"></p>
    </div>
    <div class="quicksheet-table-cell">
        <p class="quicksheet-role-name quicksheet-table-long-cell">LORNE MICHAELS</p>
    </div>
    <div class="quicksheet-table-cell">
        <p class="quicksheet-casting-name quicksheet-table-long-cell">John Papsidera</p>
    </div>
    <div class="quicksheet-table-cell">
        <p class="quicksheet-future-date">
            Mon, Jun 05
            @ 6:00 <span class="quicksheet-am-pm">PM</span>
        </p>
    </div>
</a>
<a class="quicksheet-table-row quicksheet-past-row" href="/virtualaudition/?fromqs=1&amp;qs_results_period=past&amp;qs_filter_type=all&amp;action=read&amp;msg=26308226&amp;result_id=394567" target="_blank">
    <div class="quicksheet-table-cell">
        <p class="quicksheet-badge">Eco Cast Self-Tape</p>
    </div>
    <div class="quicksheet-table-cell">
        <p class="quicksheet-status quicksheet-received">Unconfirmed</p>
    </div>
    <div class="quicksheet-table-cell">
        <p class="quicksheet-project-name quicksheet-table-long-cell"></p>
    </div>
    <div class="quicksheet-table-cell">
        <p class="quicksheet-role-name quicksheet-table-long-cell">PENDING</p>
    </div>
    <div class="quicksheet-table-cell">
        <p class="quicksheet-casting-name quicksheet-table-long-cell">Lesley Wolff</p>
    </div>
    <div class="quicksheet-table-cell">
        <p class="quicksheet-future-date">
            Fri, May 26
            @ 8:00 <span class="quicksheet-am-pm">PM</span>
        </p>
    </div>
</a>
<a class="quicksheet-table-row quicksheet-past-row" href="/virtualaudition/?fromqs=1&amp;qs_results_period=past&amp;qs_filter_type=all&amp;action=read&amp;msg=25985762&amp;result_id=388346" target="_blank">
    <div class="quicksheet-table-cell">
        <p class="quicksheet-badge">Eco Cast Self-Tape</p>
    </div>
    <div class="quicksheet-table-cell">
        <p class="quicksheet-status quicksheet-confirmed">Submitted</p>
    </div>
    <div class="quicksheet-table-cell">
        <p class="quicksheet-project-name quicksheet-table-long-cell">UNT. MARVEL FEATURE FILM (ATL) (4 Roles)</p>
    </div>
    <div class="quicksheet-table-cell">
        <p class="quicksheet-role-name quicksheet-table-long-cell">LAB TECH</p>
    </div>
    <div class="quicksheet-table-cell">
        <p class="quicksheet-casting-name quicksheet-table-long-cell">Feldstein / Paris Casting</p>
    </div>
    <div class="quicksheet-table-cell">
        <p class="quicksheet-future-date">
            Fri, May 26
            @ 9:00 <span class="quicksheet-am-pm">AM</span>
        </p>
    </div>
</a>
</div>
</div>`;

describe("Actor Access Scraper Tools tests", () => {
  it("Should return an array of audition objects", () => {
    const expected: any = [
      {
        casting: "Stefanie Seifer & Hailey Giles",
        date: 1672560000000,
        link: "https://actorsaccess.com/virtualaudition/?fromqs=1&qs_results_period=past&qs_filter_type=all&action=read&msg=26657171&result_id=401031",
        project: "BEYOND BELIEF: FACT OR FICTION #5 “Life Sentence”",
        role: "TRAVIS",
        status: "Submitted",
      },
      {
        casting: "Lesley Wolff",
        date: 1672560000000,
        link: "https://actorsaccess.com/virtualaudition/?fromqs=1&qs_results_period=past&qs_filter_type=all&action=read&msg=26423968&result_id=396627",
        project: "",
        role: "BACHELOR",
        status: "Submitted",
      },
      {
        casting: "John Papsidera",
        date: 1672560000000,
        link: "https://actorsaccess.com/virtualaudition/?fromqs=1&qs_results_period=past&qs_filter_type=all&action=read&msg=26393009&result_id=396083",
        project: "",
        role: "LORNE MICHAELS",
        status: "Submitted",
      },
      {
        casting: "Lesley Wolff",
        date: 1672560000000,
        link: "https://actorsaccess.com/virtualaudition/?fromqs=1&qs_results_period=past&qs_filter_type=all&action=read&msg=26308226&result_id=394567",
        project: "",
        role: "PENDING",
        status: "Unconfirmed",
      },
      {
        casting: "Feldstein / Paris Casting",
        date: 1672560000000,
        link: "https://actorsaccess.com/virtualaudition/?fromqs=1&qs_results_period=past&qs_filter_type=all&action=read&msg=25985762&result_id=388346",
        project: "UNT. MARVEL FEATURE FILM (ATL) (4 Roles)",
        role: "LAB TECH",
        status: "Submitted",
      },
    ];
    const auditions = auditionScraper(mockHTML);
    expect(auditions).toEqual(expected);
  });
});
