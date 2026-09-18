export default function Header() {
  return (
    <header className="app-header">
      <div className="app-header__inner">
        <div className="app-header__branding">
          <h1 className="app-header__title">ASISTENTE VIRTUAL</h1>
          <p className="app-header__subtitle">Orientación para alumnos ingresantes</p>
        </div>
        <div className="status-indicator" role="status">
          <span className="status-indicator__dot" aria-hidden="true" />
          Asistente disponible
        </div>
      </div>
    </header>
  );
}