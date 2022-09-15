import React from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import CodeBlock from "@theme/CodeBlock";

import Frameworks from ".//main/Frameworks";
import Logo from "@site/src/pages/demos/logo";

import "@site/src/css/index.css";
import styles from "./home.module.css";

class Home extends React.Component {
  public render() {
    return (
      <Layout>
        <div className="container pb-6">
          <div className={styles.max400}>
            <Logo />
          </div>
          <section className="py-4">
            <div
              className={clsx(
                styles.packageName,
                "is-size-1",
                "has-text-centered",
                "mb-4"
              )}
            >
              Axes
            </div>
            <div className={clsx(styles.badges, "mb-2")}>
              <img
                alt="npm (scoped)"
                src="https://img.shields.io/npm/v/@egjs/axes?logo=npm"
              ></img>
              <img
                alt="License"
                src="https://img.shields.io/github/license/naver/egjs-axes"
              />
              <img
                alt="Typescript"
                src="https://img.shields.io/static/v1.svg?label=&message=TypeScript&color=294E80&style=flat-square&logo=typescript"
              />
              <img
                alt="GitHub Repo stars"
                src="https://img.shields.io/github/stars/naver/egjs-axes?style=social"
              />
            </div>
            <CodeBlock className={clsx(styles.max400, "language-shell")}>
              {"npm install @egjs/axes"}
            </CodeBlock>
            <div className="subtitle has-text-centered">
              You can easily create a UI that responds to user actions.
            </div>
            <div className={styles.btnsWrapper}>
              <Link className="button mr-2" to="/docs">
                🚀 Get Started
              </Link>
              <Link className="button" to="/docs/axes">
                ✨ Demos
              </Link>
            </div>
          </section>
          <section className="py-6">
            <p className="title">Framework Ready</p>
            <p className="subtitle">Use Axes in your favorite framework!</p>
            <Frameworks />
          </section>
          <section className="py-6">
            <div className="title mb-6 has-text-centered">Demos</div>
            <ul className="demo-list">
              <li className="demo-item">
                <a href="docs/axes">
                  <p>
                    <img
                      src={require("@site/static/img/demos/axes.gif").default}
                    />
                  </p>
                  <p>What is eg.Axes?</p>
                </a>
              </li>
              <li className="demo-item">
                <a href="docs/car360viewer">
                  <p>
                    <img
                      src={require("@site/static/img/demos/car360viewer.gif").default}
                    />
                  </p>
                  <p>Car 360º Viewer</p>
                </a>
              </li>
              <li className="demo-item">
                <a href="docs/cube">
                  <p>
                    <img
                      src={require("@site/static/img/demos/cube.gif").default}
                    />
                  </p>
                  <p>Rotate a Cube</p>
                </a>
              </li>
              <li className="demo-item">
                <a href="docs/3dcarousel">
                  <p>
                    <img
                      src={require("@site/static/img/demos/3dcarousel.gif").default}
                    />
                  </p>
                  <p>3D Carousel</p>
                </a>
              </li>
              <li className="demo-item">
                <a href="docs/cardinhand">
                  <p>
                    <img
                      src={require("@site/static/img/demos/cardinhand.gif").default}
                    />
                  </p>
                  <p>Cards in hands</p>
                </a>
              </li>
              <li className="demo-item">
                <a href="docs/pulltorefresh">
                  <p>
                    <img
                      src={require("@site/static/img/demos/pulltorefresh.gif").default}
                    />
                  </p>
                  <p>Pull to Refresh</p>
                </a>
              </li>
              <li className="demo-item">
                <a href="docs/minimap">
                  <p>
                    <img
                      src={require("@site/static/img/demos/minimap.gif").default}
                    />
                  </p>
                  <p>Mini Map</p>
                </a>
              </li>
              <li className="demo-item">
                <a href="docs/bubble">
                  <p>
                    <img
                      src={require("@site/static/img/demos/bubble.gif").default}
                    />
                  </p>
                  <p>Bubble</p>
                </a>
              </li>
              <li className="demo-item">
                <a href="docs/subway">
                  <p>
                    <img
                      src={require("@site/static/img/demos/subway.gif").default}
                    />
                  </p>
                  <p>Subway</p>
                </a>
              </li>
              <li className="demo-item">
                <a href="docs/schedule">
                  <p>
                    <img
                      src={require("@site/static/img/demos/schedule.gif").default}
                    />
                  </p>
                  <p>Schedule</p>
                </a>
              </li>
              <li className="demo-item">
                <a href="docs/nestedaxes">
                  <p>
                    <img
                      src={require("@site/static/img/demos/nestedaxes.gif").default}
                    />
                  </p>
                  <p>Nested Axes</p>
                </a>
              </li>
            </ul>
          </section>
        </div>
      </Layout>
    );
  }
}

export default Home;
