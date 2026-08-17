export function Footer() {
  return (
    <footer className="border-t border-border mt-24">
      <div className="max-w-content mx-auto px-6 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <p className="font-mono text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Jack Paul Brookes
        </p>
        <ul className="flex items-center gap-6" role="list">
          <li>
            <a
              href="https://linkedin.com/in/jackpbrookes"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-muted-foreground hover:text-accent transition-colors duration-200"
            >
              LinkedIn
            </a>
          </li>
          <li>
            <a
              href="mailto:jackpbrookes@gmail.com"
              className="font-mono text-xs text-muted-foreground hover:text-accent transition-colors duration-200"
            >
              Email
            </a>
          </li>
        </ul>
      </div>
    </footer>
  )
}
