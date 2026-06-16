import Nav from "./Nav";
import Footer from "./Footer";

/**
 * PageShell — marketing / sub-route wrapper: control-panel nav + content + footer.
 */
export default function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative">
      <Nav />
      <div className="pt-20">{children}</div>
      <Footer />
    </main>
  );
}
