# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# AgriTrace UI Migration Guide: Tailwind CSS to Ant Design

This document outlines the process of migrating the AgriTrace application from Tailwind CSS to Ant Design UI components to improve the overall UI experience.

## Migration Approach

1. **Component-by-Component Replacement**: Replace each Tailwind-styled component with its Ant Design equivalent.
2. **Style Consistency**: Maintain a consistent color scheme (green theme) and design language.
3. **Responsive Design**: Ensure responsive behavior is maintained or improved.
4. **Functionality Preservation**: Ensure all existing functionality works the same or better.

## Color Theme

Maintain the primary green color scheme with the following Ant Design colors:
- Primary: `#52c41a` (Ant Design green-6)
- Success: `#52c41a`
- Info: `#1677ff`
- Warning: `#faad14`
- Error: `#ff4d4f`

## Pages to Migrate

### 1. Client Pages

#### Home Page (`src/page/client/home.jsx`)
- Replace container divs with Ant Design `Layout`, `Content`
- Replace text elements with Typography `Title`, `Paragraph`

#### Store Page (`src/page/client/store.jsx`) ✅
- **Components Replaced**:
  - Custom cards → Ant Design `Card` with `Badge.Ribbon`
  - Custom inputs → Ant Design `Input`, `Select`, `Radio.Group`
  - Custom buttons → Ant Design `Button`
  - Custom grid → Ant Design `Row`, `Col`
  - Custom pagination → Ant Design `Pagination`
  - Loading indicator → Ant Design `Spin`
  - Empty state → Ant Design `Empty`

#### Product Page (`src/page/client/product.jsx`)
- Replace product detail cards with `Card`, `Descriptions`
- Replace forms with `Form`, `Input`, `Select`
- Replace tabs with `Tabs`
- Add `Timeline` for product history

#### Blog Page (`src/page/client/blog.jsx`)
- Replace blog cards with `Card`
- Replace custom grid with `Row`, `Col`
- Add `Pagination`

#### About Page (`src/page/client/about.jsx`)
- Replace sections with `Layout`, `Content`
- Replace text with `Typography`
- Replace icons with Ant Design icons

#### Contact Page (`src/page/client/contact.jsx`)
- Replace form with `Form`, `Input`, `Button`
- Add `Alert` for form submission feedback

#### New Product Page (`src/page/client/new.product.jsx`)
- Replace form with `Form`, `Input`, `DatePicker`, `InputNumber`, `Select`
- Add `Steps` for multi-step form
- Replace buttons with `Button`

### 2. Auth Pages

#### Login Page (`src/page/auth/login.jsx`) ✅
- **Components Replaced**:
  - Custom layout → Ant Design `Layout`, `Content`
  - Custom card → Ant Design `Card`
  - Text elements → Ant Design `Typography` (`Title`, `Paragraph`, `Text`)
  - Icons → Ant Design icons

#### Register Page (`src/page/auth/register.jsx`)
- Replace form with `Form`, `Input`
- Replace buttons with `Button`

#### Profile Page (`src/page/auth/profile.jsx`)
- Replace cards with `Card`
- Replace stats with `Statistic`
- Replace tabs with `Tabs`
- Add `Avatar`, `Badge`
- Replace activity list with `List`

### 3. Admin Pages

Review and update admin pages following the same approach.

### 4. Shared Components

#### Navbar (`src/components/client/_navbar.jsx`) ✅
- **Components Replaced**:
  - Custom navigation → Ant Design `Layout`, `Header`
  - Custom links → Ant Design `Menu`
  - Dropdown menu → Ant Design `Dropdown`
  - Mobile menu → Ant Design `Drawer`
  - User button → Ant Design `Button` with `Avatar`

#### Footer
- Replace custom footer with Ant Design `Layout.Footer`

## Migration Checklist for Each Component

1. ✅ Import required Ant Design components and icons
2. ✅ Replace custom styled divs with appropriate Ant Design components
3. ✅ Update inline styles to use Ant Design's design language
4. ✅ Maintain responsive behavior
5. ✅ Test functionality
6. ✅ Ensure consistent styling and brand colors

## Common Ant Design Components to Use

- **Layout & Structure**: `Layout`, `Content`, `Header`, `Footer`, `Sider`, `Divider`, `Space`, `Row`, `Col`, `Grid`
- **Navigation**: `Menu`, `Pagination`, `Breadcrumb`, `Steps`, `Tabs`
- **Data Entry**: `Form`, `Input`, `Select`, `Radio`, `Checkbox`, `DatePicker`, `TimePicker`, `Upload`
- **Data Display**: `Typography`, `Table`, `Card`, `Descriptions`, `Calendar`, `List`, `Statistic`, `Tree`
- **Feedback**: `Alert`, `Drawer`, `Modal`, `Popconfirm`, `Spin`, `Skeleton`, `Progress`, `Result`
- **Other**: `Button`, `Avatar`, `Badge`, `Tag`, `Empty`, `Tooltip`

## Best Practices

1. Use Ant Design's built-in theming system to maintain brand identity
2. Use `Space` component to manage layout spacing
3. Leverage Ant Design's responsive grid system
4. Utilize form validation patterns from Ant Design
5. Implement data loading states with `Spin` and `Skeleton`

## Resources

- [Ant Design Documentation](https://ant.design/components/overview/)
- [Ant Design Icons](https://ant.design/components/icon)
- [Ant Design Pro Components](https://procomponents.ant.design/components)
- [React with Ant Design Best Practices](https://ant.design/docs/react/recommendation)
