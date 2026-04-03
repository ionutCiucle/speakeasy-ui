---
name: figma-to-ui
description: Generate React Native UI from a Figma link, reusing existing project components
---

When implementing UI from a Figma link, follow this process:

## Step 1 — Read the design

Use `get_design_context` with the Figma URL to get the design spec, screenshot, and layout hints.

## Step 2 — Audit existing components before writing any code

Scan `src/components/` for components that match elements in the design. Do this before producing any JSX.

Key components to match against:

- **Text inputs** → `Input` (`src/components/Input/Input.tsx`) — supports `size`, `label`, `placeholder`, `invalid`, `error`; use `useValidatedTextField` hook for validated fields
- **Price / numeric inputs** → `PriceInput` (`src/components/PriceInput.tsx`)
- **Buttons** → `Button` (`src/components/Button.tsx`) — variants: `primary`, `secondary`, etc.
- **Page layout wrapper** → `PageContainer` (`src/components/PageContainer.tsx`) — adds `paddingHorizontal: 20`; use on every screen
- **Modal header (title + Done + divider)** → `ModalHeader` (`src/components/ModalHeader.tsx`)
- **Page header** → `PageHeader` (`src/components/PageHeader.tsx`)
- **Avatar / member avatars** → `Avatar`, `MemberAvatars`
- **Icon button** → `IconButton`
- **Back button** → `BackButton`
- **Navigation bar** → `MainNav`
- **Currency selector** → `CurrencySelector`
- **Location selector** → `LocationSelector`
- **Add-item form** → `AddItemForm` (`src/components/AddItemForm.tsx`) — reuse if the design shows a name+price+button form
- **Modal shell** — modals render inside `ModalRoot`; new modal content goes in `src/components/modals/`

If a design element clearly matches one of the above, use the existing component. Do not recreate it inline.

## Step 3 — Check feature-local components

Look in the relevant `src/features/<Feature>/components/` directory for any existing sub-components that overlap with the design.

## Step 4 — Identify gaps

List only what does not have a matching component. These are the new components/styles to create.

## Step 5 — Implement

- Use `StyleSheet.create` — no inline styles
- Follow the color palette in `src/styles.ts` — no raw hex values unless `Color` has no match
- Use `Inter_*` for body text, `CormorantGaramond_700Bold` for display/modal titles
- Match `paddingHorizontal`, `borderRadius`, spacing to existing components for visual consistency
- Prop interface: data/config props first, `on*` callbacks last

## Step 6 — Export

If a new shared component is created, add it to `src/components/index.ts`.
