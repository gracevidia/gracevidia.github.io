import Meta from 'components/meta';
import { Hero } from 'components/hero';
import { About } from 'components/about';
import { Experience } from 'components/experience';
import { Education } from 'components/education';
import { Skills } from 'components/skills';
import { Projects } from 'components/projects';
import { Footer } from 'components/footer';

export default function Home() {
  return (
    <>
      <Meta
        title="Grace Panjaitan | QA Portfolio"
        description="QA engineer with 3+ years of experience testing web and mobile applications, expanding into automation testing with Cypress and Playwright."
      />
      <Hero />
      <About />
      <Experience />
      <Education />
      <Skills />
      <Projects />
      <Footer />
    </>
  );
}
