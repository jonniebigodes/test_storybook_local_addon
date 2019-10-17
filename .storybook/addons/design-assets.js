/* import React from "react";
import { addons, types } from "@storybook/addons";
import { AddonPanel } from "@storybook/components";

// inicial code breaks with blank screen
// updated with
//const PANEL_ID = `design-assets/panel`; // this needs to be addressed
//

addons.register("my/design-assets", () => {
  addons.add("design-assets/panel", {
    title: "assets",
    type: types.PANEL,
    render: ({ active, key }) => (
      <AddonPanel active={active} key={key}>
        implement
      </AddonPanel>
    )
  });
}); */

// v2
/* import React, { Fragment } from "react";

import { useParameter } from "@storybook/api";
import { addons, types } from "@storybook/addons";
import { AddonPanel } from "@storybook/components";

const Content = () => {
  const results = useParameter("assets", []);

  return (
    <Fragment>
      {results.length ? (
        <ol>
          {results.map(i => (
            <li>{i}</li>
          ))}
        </ol>
      ) : null}
    </Fragment>
  );
};
addons.register("my/design-assets", () => {
  addons.add("design-assets/panel", {
    title: "assets",
    type: types.PANEL,
    render: ({ active, key }) => (
      <AddonPanel active={active} key={key}>
        <Content/>
      </AddonPanel>
    )
  });
}); */

// v3
/* import React, { Fragment } from "react";
import { useParameter,useStorybookState } from "@storybook/api";
import { addons, types } from "@storybook/addons";
import { AddonPanel} from "@storybook/components";
import { styled } from '@storybook/theming';

const getUrl = (input) => {
    return typeof input === 'string' ? input : input.url;
  };
  
  const Iframe = styled.iframe({
    width: '100%',
    height: '100%',
    border: '0 none',
  });
  const Img = styled.img({
    width: '100%',
    height: '100%',
    border: '0 none',
    objectFit: 'contain',
  });
  
  const Asset = ({ url }) => {
    if (!url) {
      return null;
    }
    if (url.match(/\.(png|gif|jpeg|tiff|svg|anpg|webp)/)) {
      // do image viewer
      return <Img alt="" src={url} />;
    }
  
    return <Iframe title={url} src={url} />;
  };
  
  export const Content = () => {
    const results = useParameter("assets", []);
    const { storyId } = useStorybookState();
  
    if (results.length === 0) {
      return null;
    }
  
    const url = getUrl(results[0]).replace('{id}', storyId);
    
    return (
      <Fragment>
        <Asset url={url} />
      </Fragment>
    );
  };

  addons.register("my/design-assets", () => {
    addons.add("design-assets/panel", {
      title: "assets",
      type: types.PANEL,
      render: ({ active, key }) => (
        <AddonPanel active={active} key={key}>
           <Content/>
        </AddonPanel>
      )
    });
  }); */

// v4
/* import React, { Fragment } from "react";

import { useParameter,useStorybookState,useAddonState  } from "@storybook/api";
import { addons, types } from "@storybook/addons";
import { AddonPanel} from "@storybook/components";
import { styled } from '@storybook/theming';


const getUrl = (input) => {
    return typeof input === 'string' ? input : input.url;
  };
  
  const Iframe = styled.iframe({
    width: '100%',
    height: '100%',
    border: '0 none',
  });
  const Img = styled.img({
    width: '100%',
    height: '100%',
    border: '0 none',
    objectFit: 'contain',
  });
  
  const Asset = ({ url }) => {
    if (!url) {
      return null;
    }
    if (url.match(/\.(png|gif|jpeg|tiff|svg|anpg|webp)/)) {
      // do image viewer
      return <Img alt="" src={url} />;
    }
  
    return <Iframe title={url} src={url} />;
  };
  
  export const Content = () => {
    const results = useParameter("assets", []);
    const [selected, setSelected] = useAddonState("my/design-assets", 0);
    const { storyId } = useStorybookState();
  
    if (results.length === 0) {
      return null;
    }
  
    if (results.length && !results[selected]) {
      setSelected(0);
      return null;
    }
  
    const url = getUrl(results[selected]).replace('{id}', storyId);
    
    return (
      <Fragment>
        <Asset url={url} />
      </Fragment>
    );
  };

  addons.register("my/design-assets", () => {
    addons.add("design-assets/panel", {
      title: "assets",
      type: types.PANEL,
      render: ({ active, key }) => (
        <AddonPanel active={active} key={key}>
          <Content />
        </AddonPanel>
      )
    });
  }); */

// v5

import React, {Fragment } from "react";

import { useParameter,useStorybookState,useAddonState  } from "@storybook/api";
import { addons, types } from "@storybook/addons";
import { AddonPanel, ActionBar} from "@storybook/components";
import { styled } from '@storybook/theming';


const getUrl = (input) => {
    return typeof input === 'string' ? input : input.url;
  };
  
  const Iframe = styled.iframe({
    width: '100%',
    height: '100%',
    border: '0 none',
  });
  const Img = styled.img({
    width: '100%',
    height: '100%',
    border: '0 none',
    objectFit: 'contain',
  });
  
  const Asset = ({ url }) => {
    if (!url) {
      return null;
    }
    if (url.match(/\.(png|gif|jpeg|tiff|svg|anpg|webp)/)) {
      // do image viewer
      return <Img alt="" src={url} />;
    }
  
    return <Iframe title={url} src={url} />;
  };
  
  export const Content = () => {
    const results = useParameter("assets", []);
    const [selected, setSelected] = useAddonState("my/design-assets", 0);
    const { storyId } = useStorybookState();
  
    if (results.length === 0) {
      return null;
    }
  
    if (results.length && !results[selected]) {
      setSelected(0);
      return null;
    }
  
    const url = getUrl(results[selected]).replace('{id}', storyId);
    
    return (
      <Fragment>
        <Asset url={url} />
        {results.length > 1 ? (
          <ActionBar
            actionItems={results.map((i, index) => ({
              title: typeof i === 'string' ? `asset #${index + 1}` : i.name,
              onClick: () => setSelected(index),
            }))}
          />
        ) : null}
      </Fragment>
    );
  };

  addons.register("my/design-assets", () => {
    addons.add("design-assets/panel", {
      title: "assets",
      type: types.PANEL,
      render: ({ active, key }) => (
        <AddonPanel active={active} key={key}>
          <Content />
        </AddonPanel>
      )
    });
  });
