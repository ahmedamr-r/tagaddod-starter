import { Button } from 'tagaddod-design-react'

function App() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--t-color-bg-primary)',
        padding: 'var(--t-space-600)',
      }}
    >
      <h1
        style={{
          font: 'var(--t-typography-heading-2xl)',
          color: 'var(--t-color-text-primary)',
          marginBottom: 'var(--t-space-400)',
        }}
      >
        Welcome to Tagaddod Design System
      </h1>
      <p
        style={{
          font: 'var(--t-typography-body-md)',
          color: 'var(--t-color-text-secondary)',
          marginBottom: 'var(--t-space-600)',
          textAlign: 'center',
          maxWidth: '600px',
        }}
      >
        Start building your application with our comprehensive design system.
        This template is ready for you to implement your features.
      </p>
      <Button variant="primary">Get Started</Button>
    </div>
  )
}

export default App
