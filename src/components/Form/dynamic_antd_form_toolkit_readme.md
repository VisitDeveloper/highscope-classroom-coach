# Dynamic Antd Form Toolkit

A simple and extensible set of components for building dynamic forms based on `antd` and React. This repo includes:

- `FormProvider` — wrapper to manage form events (onFormChange, onFormFinish)
- `FormDynamicRenderer` — abstraction over `antd.Form` with `Row` for layout
- `FormElement` — core component that renders any input based on a `component` key
- `FormErrorList` — wrapper for displaying error lists
- `FormList` — abstraction over `Form.List` for repeatable fields
- `ObjectLiteral` / `CreateObjectLiterals` — utility for selecting components from a mapping

---

## Table of Contents

1. Introduction
2. Installation & Setup
3. Quick Start Example
4. Component API Documentation
   - FormProvider
   - FormDynamicRenderer
   - FormElement
   - FormErrorList
   - FormList
   - CreateObjectLiterals (utility)
5. Using JSON Schema (example)
6. Architecture Notes & Improvement Suggestions
7. Testing & Maintenance
8. FAQ
9. Contribution & License

---

## 1 — Introduction

This toolkit is ideal for building complex and dynamic forms without writing long JSX for every form. The main idea is to define a schema or multiple `FormElement`s while keeping rendering and logic separated.

Advantages:
- Reusable and more testable forms
- Easy conversion to JSON-driven forms
- Separation of concerns (rendering, validation, error handling)

---

## 2 — Installation & Setup

Prerequisites:
- Node.js >= 16
- React >= 18
- antd >= 5

Install (example using npm/yarn/pnpm):

```bash
npm install antd react react-dom
# or
# pnpm add antd react react-dom
```

Place files in:
- `src/components/form/FormProvider.tsx`
- `src/components/form/Form.tsx` (FormDynamicRenderer)
- `src/components/form/FormElement.tsx`
- `src/components/form/FormErrorList.tsx`
- `src/components/form/FormList.tsx`
- `src/tools/ObjectLiteral.ts` (CreateObjectLiterals)

---

## 3 — Quick Start Example

A simple login form using the components:

```tsx
import React from 'react';
import FormProvider from './components/form/FormProvider';
import FormDynamicRenderer from './components/form/Form';
import FormElement from './components/form/FormElement';

function LoginForm() {
  return (
    <FormProvider
      onFormFinish={(name, info) => console.log('finish', name, info)}
      onFormChange={(name, info) => console.log('change', name, info)}
    >
      <FormDynamicRenderer name="login" layout="vertical" onFinish={(v) => console.log(v)}>
        <FormElement name="username" label="Username" component="input" rules={[{ required: true }]} />
        <FormElement name="password" label="Password" component="password" rules={[{ required: true }]} />
        <FormElement component="button" title="Login" colSpan={24} />
      </FormDynamicRenderer>
    </FormProvider>
  );
}

export default LoginForm;
```

---

## 4 — Component API Documentation

> The following descriptions are based on your code.

### `FormProvider` (src/components/form/FormProvider.tsx)

**Props**:
- `onFormChange?: (name: string, info: FormChangeInfo) => void` — callback when form values change
- `onFormFinish?: (name: string, info: FormFinishInfo) => void` — callback when form finishes
- `children` — content inside the Provider

**Explanation**: Lightweight wrapper over `antd` `Form.Provider`. Useful when multiple forms exist on the page and you want to centralize event handling.

---

### `FormDynamicRenderer` (src/components/form/Form.tsx)

**Important Props**:
- `name: string` — form name
- `layout?: 'horizontal' | 'vertical' | 'inline'`
- `onFinish?: (values) => void` — submit callback
- `onValuesChange?: (changed, all) => void` — values change callback
- `align`, `justify`, `wrap`, `gutter` — layout props for `Row`

**Note**: The component passes all remaining props (`...rest`) to `antd.Form` and wraps children inside a `Row`.

---

### `FormElement` (src/components/form/FormElement.tsx)

**Key Props**:
- `component: keyof typeof componentMapping` — string to determine which component to render (`input`, `password`, `checkbox`, ...)
- `label?: string`, `name?: string`, `rules?: any`, `initialValue?`, `colSpan?: number` — standard Form.Item props
- `propChildren?: any` — props passed to the internal component
- `title?: string` — for buttons or elements that need text
- `children?: JSX.Element` — for components that need child elements (`Select`, `Radio.Group`)

**Design Notes**:
- `componentMapping` maps keys to JSX or factory functions.
- `CreateObjectLiterals(mapping, key, default)` selects the final component.
- Factory functions allow passing `props`, `children`, `title` dynamically.

---

### `FormErrorList` (src/components/form/FormErrorList.tsx)

Simple wrapper around `Form.ErrorList` with props: `errors`, `warnings`, `help`, `helpStatus`, `onVisibleChanged`.

---

### `FormList` (src/components/form/FormList.tsx)

Wrapper for `Form.List` with main props: `name`, `initialValue`, `rules`, etc.

---

### `CreateObjectLiterals` (utility)

Utility function that takes `componentMapping`, `key`, and `defaultValue` and returns the corresponding element. Factory functions allow passing props and children.

Simple replacement example:

```ts
function renderFromMapping(mapping: Record<string, any>, key: string, defaultKey = 'input', props = {}, children?: any) {
  const entry = mapping[key] ?? mapping[defaultKey];
  if (typeof entry === 'function') return entry(children, props);
  return React.cloneElement(entry, props, children);
}
```

---

## 5 — Using JSON Schema (example)

You can render forms from a JSON schema:

```json
[
  { "component": "input", "name": "username", "label": "Username", "rules": [{"required":true}] },
  { "component": "password", "name": "password", "label": "Password", "rules": [{"required":true}] },
  { "component": "select", "name": "country", "label": "Country", "options": [{"value":"TR","label":"Turkey"},{"value":"IR","label":"Iran"}] },
  { "component": "button", "title": "Submit", "colSpan": 24 }
]
```

Map over this array to return `FormElement` for each item.

---

## 6 — Architecture Notes & Improvement Suggestions

1. **Separate mapping and rendering**: export `componentMapping` from its own module for easier testing and extension.
2. **Factory pattern**: some inputs need special props (`Select` needs `options`). Use factory functions to handle dynamic props and children.
3. **Type-safety**: limit `component` using union type or `keyof typeof componentMapping`. Consider interface per component.
4. **Schema validation**: when using JSON-driven forms, validate the schema with `zod` or `yup`.
5. **Custom render hooks**: for conditional rules or dependent fields, use `Form.useWatch` or custom hooks outside `FormElement`.
6. **Performance**: for large forms, use `React.memo` and lazy rendering for heavy sections.

---

## 7 — Testing & Maintenance

- Unit: Test that `FormElement` renders the correct component.
- Integration: Test that `FormDynamicRenderer` and `FormProvider` work together correctly (onFormChange/onFormFinish).
- E2E: Use testing-library/playwright to verify form submission and validation.

---

## 8 — FAQ

**Q: How to pass `Select` options to `FormElement`?**
> Include an `options` field in the schema and use a factory function in mapping to pass them to `<Select>`.

**Q: Does this structure support localization?**
> Yes, validation messages and labels can be passed from i18n providers.

**Q: How to implement conditional visibility?**
> Add a `visibleWhen` property in the schema and use `Form.useWatch` to conditionally render fields.

---

## 9 — Contribution & License

- Add a LICENSE (MIT recommended)
- Add CONTRIBUTING.md with guidelines
- Use semantic commits and PR templates

---

### End
This README is a starting point. If you want, I can add a complete **JSON-driven generator example** that builds a UI demo usin