import { createBrowserHistory } from "history";
import * as analytics from "../analytics";

const history = createBrowserHistory();

analytics.setPageView(history);

export default history;
