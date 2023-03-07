import { HTMLString, markHTMLString } from "../escape.js";
import { renderChild } from "./any.js";
import { createScopedResult, ScopeFlags } from "./scope.js";
const slotString = Symbol.for("astro:slot-string");
class SlotString extends HTMLString {
  constructor(content, instructions) {
    super(content);
    this.instructions = instructions;
    this[slotString] = true;
  }
}
slotString;
function isSlotString(str) {
  return !!str[slotString];
}
async function renderSlot(result, slotted, fallback) {
  if (slotted) {
    const scoped = createScopedResult(result, ScopeFlags.Slot);
    let iterator = renderChild(typeof slotted === "function" ? slotted(scoped) : slotted);
    let content = "";
    let instructions = null;
    for await (const chunk of iterator) {
      if (typeof chunk.type === "string") {
        if (instructions === null) {
          instructions = [];
        }
        instructions.push(chunk);
      } else {
        content += chunk;
      }
    }
    return markHTMLString(new SlotString(content, instructions));
  }
  if (fallback) {
    return renderSlot(result, fallback);
  }
  return "";
}
async function renderSlots(result, slots = {}) {
  let slotInstructions = null;
  let children = {};
  if (slots) {
    await Promise.all(
      Object.entries(slots).map(
        ([key, value]) => renderSlot(result, value).then((output) => {
          if (output.instructions) {
            if (slotInstructions === null) {
              slotInstructions = [];
            }
            slotInstructions.push(...output.instructions);
          }
          children[key] = output;
        })
      )
    );
  }
  return { slotInstructions, children };
}
export {
  SlotString,
  isSlotString,
  renderSlot,
  renderSlots
};
