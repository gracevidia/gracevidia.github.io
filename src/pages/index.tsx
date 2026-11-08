import Meta from 'components/meta';
import { Hero } from 'components/hero';
import { About } from 'components/about';
import { Skills } from 'components/skills';
import { Experience, monthsBetween } from 'components/experience';
import { Education } from 'components/education';
import { Projects } from 'components/projects';
import { Footer } from 'components/footer';
import { CONTENT, QA_START } from 'data/content';

// Experience years baked at build time for the meta description.
const QA_YEARS = Math.floor(monthsBetween(QA_START) / 12);

export default function Home() {
  return (
    <>
      <Meta
        title="Grace Panjaitan - QA Engineer"
        description={CONTENT.about.replace('{years}+', `${QA_YEARS}+ years`)}
      />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Education />
      <Projects />
      <Footer />
    </>
  );
}
