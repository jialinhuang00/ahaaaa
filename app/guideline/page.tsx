"use client";
import { css } from "@emotion/react";
import { Button } from "@/app/components/Base/Button";
import { Input } from "@/app/components/Base/Input";
import { Slider } from "@/app/components/Slider";

export default function ComponentGuideLinePage() {
  return (
    <div
      css={css`
        padding: 16px;
        display: flex;
        flex-direction: column;
        gap: 16px;
        align-items: flex-start;
        margin: 100px auto;
      `}
    >
      <h1>Components:</h1>
      <Button>small</Button>
      <Button size="large">large</Button>
      <Button size="large" variant="outlined">
        large outlined
      </Button>
      <Button size="large" fullwidth>
        large fullwidth
      </Button>
      <Button size="large" fullwidth variant="outlined">
        outline fullwidth fullwidthfullwidthfullwidth
      </Button>
      <Button variant="outlined">Outlined Button</Button>
      <Button variant="contained">Contained Button</Button>

      <Input label="label" placeholder="Keyword" />

      <Slider
        defaultValue={70}
        onChange={() => {
          //noop
        }}
      />
    </div>
  );
}
