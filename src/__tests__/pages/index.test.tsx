/**
 * @jest-environment jsdom
 */

import { render } from "@testing-library/react";
import Index from "@app/pages/index";

test("It renders the home page without crashing", () => {
  const { baseElement } = render(<Index />);
  expect(baseElement).toBeDefined();
});
