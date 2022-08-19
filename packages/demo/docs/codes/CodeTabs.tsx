/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/indent */
import React from "react";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import CodeBlock from "@theme/CodeBlock";

export function convertVue2(text: string) {
  return text.replace("vue-axes", "vue2-axes");
}
export default (props: {
  folder: string,
  reactCode: string,
}) => {
  const htmlCode = require(`!!raw-loader!./${props.folder}/html.txt`).default;
  const jsCode = require(`!!raw-loader!./${props.folder}/js.txt`).default;
  const reactCode = props.reactCode ? props.reactCode : require(`!!raw-loader!./${props.folder}/react.txt`).default;
  const svelteCode = require(`!!raw-loader!./${props.folder}/svelte.txt`).default;

  return <Tabs
    groupId="cfc"
    defaultValue="js"
    values={[
      { label: "JavaScript", value: "js" },
      { label: "React", value: "react" },
      { label: "Svelte", value: "svelte" },
    ]}>
    <TabItem value="js">
      <CodeBlock className="language-html">
        {htmlCode}
      </CodeBlock>
      <CodeBlock className="language-js">
        {jsCode}
      </CodeBlock>
    </TabItem>
    <TabItem value="react">
      <CodeBlock className="language-jsx">
        {reactCode}
      </CodeBlock>
    </TabItem>
    <TabItem value="svelte">
      <CodeBlock className="language-html">
        {svelteCode}
      </CodeBlock>
    </TabItem>
  </Tabs>;
};
