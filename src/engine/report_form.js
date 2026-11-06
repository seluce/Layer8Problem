/**
 * The Google form the bug report posts to (engine_ui.sendReportMail).
 *
 * Written by tools/report-form.mjs, not by hand: when the form is recreated,
 *     npm run report:form -- <the form's public link> --write
 * reads the field ids out of the published page and rewrites this file. The
 * post goes out with mode 'no-cors', so the game never sees Google's answer -
 * a form that is gone, unpublished or closed still reads "Sent" on screen,
 * which is how the reports went missing in November 2026 without anyone
 * noticing. Send a test report after every change here.
 *
 * The three ids belong to the form's three questions in order: category
 * (short answer), description (paragraph), debug block (paragraph).
 */
export const REPORT_FORM = {
    url: 'https://docs.google.com/forms/d/e/1FAIpQLSd8VOvh4AF_p74O16J8H4uvP8Lt98vyXrAbuhT9cxtZLGJFfg/formResponse',
    cat: 'entry.1755901744',
    desc: 'entry.1004304636',
    debug: 'entry.382467771',
};
