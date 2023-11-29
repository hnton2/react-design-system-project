import React from "react";
import { createRoot } from "react-dom/client";

import { Margin, Select } from "@ds.p/react";

import "@ds.p/scss/lib/global.css";
import "@ds.p/scss/lib/Utilities.css";
import "@ds.p/scss/lib/Text.css";
import "@ds.p/scss/lib/Margin.css";
import "@ds.p/scss/lib/Select.css";

const options = [
  { value: "black", label: "Black" },
  { value: "white", label: "White" },
  { value: "grey", label: "Grey" },
];

const rootElement = document.getElementById("root");
const root = createRoot(rootElement!);
root.render(
  <div style={{ padding: 10 }}>
    <Margin space='none'>
      <Select
        options={options}
        // renderOption={({ option, getOptionRecommendedProps }) => <p {...getOptionRecommendedProps({ className: "custom" })}>{option.label}</p>}
      />
    </Margin>
  </div>
);
