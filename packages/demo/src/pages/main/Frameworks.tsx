import React from "react";
import Flicking from "@egjs/react-flicking";
import { AutoPlay } from "@egjs/flicking-plugins";

import styles from "./frameworks.module.css";

export default () => {
  const plugins = [new AutoPlay()];

  return (<Flicking className="mb-2" plugins={plugins} align={"prev"} circular={true}>
    <div className="framework-logo button mr-2 is-info">
      <div className="framework-logo-wrapper mr-2"><img src="icon/react.svg" /></div>
      <a href="https://npmjs.com/@egjs/react-axes" target="_blank">@egjs/react-axes</a>
    </div>
    <div className="framework-logo button mr-2 is-success">
      <div className="framework-logo-wrapper mr-2"><img src="icon/vue.svg" /></div>
      <a href="https://npmjs.com/@egjs/vue-axes" target="_blank">@egjs/vue-axes</a>
    </div>
    <div className="framework-logo button mr-2 is-light">
      <div className="framework-logo-wrapper mr-2"><img src="icon/svelte.svg" /></div>
      <a href="https://npmjs.com/@egjs/svelte-axes" target="_blank">@egjs/svelte-axes</a>
    </div>
    <div className={`framework-logo button mr-2 ${styles["is-vue3"]}`}>
      <div className="framework-logo-wrapper mr-2"><img src="icon/vue.svg" /></div>
      <a href="https://npmjs.com/@egjs/vue2-axes" target="_blank">@egjs/vue2-axes</a>
    </div>
    <div className="framework-logo button mr-2 is-info">
      <div className="framework-logo-wrapper mr-2"><img src="icon/react.svg" /></div>
      <a href="https://npmjs.com/@egjs/react-axes" target="_blank">@egjs/react-axes</a>
    </div>
    <div className="framework-logo button mr-2 is-success">
      <div className="framework-logo-wrapper mr-2"><img src="icon/vue.svg" /></div>
      <a href="https://npmjs.com/@egjs/vue-axes" target="_blank">@egjs/vue-axes</a>
    </div>
    <div className="framework-logo button mr-2 is-light">
      <div className="framework-logo-wrapper mr-2"><img src="icon/svelte.svg" /></div>
      <a href="https://npmjs.com/@egjs/svelte-axes" target="_blank">@egjs/svelte-axes</a>
    </div>
    <div className={`framework-logo button mr-2 ${styles["is-vue3"]}`}>
      <div className="framework-logo-wrapper mr-2"><img src="icon/vue.svg" /></div>
      <a href="https://npmjs.com/@egjs/vue2-axes" target="_blank">@egjs/vue2-axes</a>
    </div>
  </Flicking>);
};
