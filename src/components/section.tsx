import { ReactNode, useEffect, useRef } from 'react';

// Scroll reveal: the element fades in once, the first time it enters the
// viewport (the .reveal/.in classes live in globals.css).
export function useReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    io.observe(element);
    return () => io.disconnect();
  }, []);

  return ref;
}

type Props = {
  id: string;
  title: string;
  children: ReactNode;
};

export function Section({ id, title, children }: Props) {
  const revealRef = useReveal();

  return (
    <section id={id}>
      <div ref={revealRef} className="wrap reveal">
        <h2>{title}</h2>
        {children}
      </div>
    </section>
  );
}
