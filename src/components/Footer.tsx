export function Footer() {
  return (
    <footer className="border-t border-border/10 mt-24">
      <div className="max-w-content mx-auto px-6 sm:px-10 py-12 sm:py-16">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-8">
          <div className="space-y-3">
            <p className="text-lg font-medium text-foreground">Jack Paul Brookes</p>
            <p className="text-sm text-muted-foreground">
              Digital growth for B2B businesses in Suffolk.
            </p>
            <p className="text-sm text-muted-foreground">
              <a
                href="mailto:jackpbrookes@gmail.com"
                className="text-foreground hover:text-accent-deep transition-colors duration-200"
              >
                jackpbrookes@gmail.com
              </a>
            </p>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://linkedin.com/in/jackpbrookes"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              LinkedIn
            </a>
            <a
              href="mailto:jackpbrookes@gmail.com"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              Email
            </a>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border/10">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Jack Paul Brookes. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
