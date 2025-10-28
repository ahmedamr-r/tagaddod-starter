# Instructions for Implementing Language-Specific Line-Height Adjustments in New Components

When creating a new component for the Tagaddod Design System, follow these instructions to implement proper line-height handling for both English and Arabic fonts:

## 1. Component JSX Implementation

Add this code pattern to your React component:

```jsx
// At the top of your component function, add:
const isRTL = document.dir === 'rtl' || document.documentElement.dir === 'rtl';
  
// Create a lineHeightStyle object:
const lineHeightStyle = {
  lineHeight: isRTL ? 'var(--t-line-height-arabic, 1.2)' : 'var(--t-line-height-english, 1.5)'
};

// Apply the style to all text elements:
<label style={lineHeightStyle}>Label text</label>
<span style={lineHeightStyle}>Other text content</span>
<div className={styles.helpText} style={lineHeightStyle}>Help text</div>
```

## 2. CSS Module Implementation

For complete line-height control, also include these CSS patterns in your component's module.css file:

```css
/* General text element style */
.elementWithText {
  position: relative;
  line-height: 1.5;
}

/* Line height trim for all languages */
.elementWithText::before,
.elementWithText::after {
  content: '';
  display: block;
  height: 0;
}

/* English font adjustment (smaller trim) */
.elementWithText::before {
  margin-top: -0.15em;
}

.elementWithText::after {
  margin-bottom: -0.15em;
}

/* Arabic font adjustment (larger trim) */
:global([dir="rtl"]) .elementWithText::before {
  margin-top: 0.1em;
}

:global([dir="rtl"]) .elementWithText::after {
  margin-bottom: -0.25em;
}
```

## 3. Implementation Checklist

When adding a new component:

- [ ] Apply `lineHeightStyle` object to all text elements
- [ ] Use `:global([dir="rtl"])` selector for RTL-specific styles
- [ ] Apply line-height trimming to text containers
- [ ] Test in both LTR and RTL modes
- [ ] Verify there's no excess spacing above or below text
- [ ] Check alignment of text with adjacent UI elements

## 4. Example Implementation

Here's a complete example for a new Alert component:

```jsx
import React from 'react';
import clsx from 'clsx';
import styles from './Alert.module.css';

export const Alert = ({ 
  title, 
  children,
  variant = 'info',
  className,
  ...props 
}) => {
  // Detect if we need to apply RTL text fixes
  const isRTL = document.dir === 'rtl' || document.documentElement.dir === 'rtl';
  
  // Apply line height style based on text direction
  const lineHeightStyle = {
    lineHeight: isRTL ? 'var(--t-line-height-arabic, 1.2)' : 'var(--t-line-height-english, 1.5)'
  };
  
  return (
    <div 
      className={clsx(styles.container, styles[variant], className)}
      role="alert"
      {...props}
    >
      {title && (
        <h4 className={styles.title} style={lineHeightStyle}>
          {title}
        </h4>
      )}
      <div className={styles.content} style={lineHeightStyle}>
        {children}
      </div>
    </div>
  );
};
```

With corresponding CSS:

```css
.title {
  font-weight: var(--t-font-weight-semibold);
  margin-bottom: var(--t-space-100);
  position: relative;
  line-height: 1.5;
}

.title::before,
.title::after {
  content: '';
  display: block;
  height: 0;
}

.title::before {
  margin-top: -0.15em;
}

.title::after {
  margin-bottom: -0.15em;
}

:global([dir="rtl"]) .title::before {
  margin-top: -0.25em;
}

:global([dir="rtl"]) .title::after {
  margin-bottom: -0.25em;
}

.content {
  position: relative;
  line-height: 1.5;
}

.content::before,
.content::after {
  content: '';
  display: block;
  height: 0;
}

.content::before {
  margin-top: -0.15em;
}

.content::after {
  margin-bottom: -0.15em;
}

:global([dir="rtl"]) .content::before {
  margin-top: -0.25em;
}

:global([dir="rtl"]) .content::after {
  margin-bottom: -0.25em;
}
```

Follow this pattern for all new components to ensure consistent text rendering across both English and Arabic interfaces.