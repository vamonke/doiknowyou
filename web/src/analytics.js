import ReactGA from "react-ga";

export const initialize = () => {
  ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_ID, { debug: false });
};

export const setPageView = history => {
  // Initialize google analytics page view tracking
  history.listen(location => {
    ReactGA.set({ page: location.pathname }); // Update the user's current page
    ReactGA.pageview(location.pathname); // Record a pageview for the given page
  });
};

export const setUserId = userId => {
  // add any data that is relevant to the user session
  // that you would like to track with google analytics
  ReactGA.set({ userId });
};

export const trackEvent = event => {
  console.log(event);
  ReactGA.event(event);
};

export const trackButton = onClick => event => {
  trackEvent({
    category: "User",
    action: "button",
    value: event.target.textContent
  });
  onClick(event);
};

export const trackSubmit = formName => {
  trackEvent({
    category: "User",
    action: "submit",
    value: formName
  });
};
