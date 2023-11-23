import React from "react";
import { createRoot } from "react-dom/client";

import { Margin, Text } from "@ds.p/react";

import "@ds.p/scss/lib/global.css";
import "@ds.p/scss/lib/Utilities.css";
import "@ds.p/scss/lib/Text.css";
import "@ds.p/scss/lib/Margin.css";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement!);
root.render(
  <div style={{ padding: 10 }}>
    <Margin space='none'>
      <Text>Test</Text>
    </Margin>
  </div>
);
