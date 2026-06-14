import styled from 'styled-components';
import { RegistrationForm } from './components/RegistrationForm';
import { PostsSection } from './components/PostsSection';
import { Card } from './components/ui/Card';

// ─── Styled components ────────────────────────────────────────────────────────

const PageWrapper = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 3.2rem 1.6rem 6.4rem;
`;

const Header = styled.header`
  margin-bottom: 3.2rem;
  border-bottom: 2px solid ${({ theme }) => theme.colors.border};
  padding-bottom: 3.2rem;
`;

const AppTitle = styled.h1`
  font-size: 3.2rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};

  span {
    color: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: 540px) {
    font-size: 2.4rem;
  }
`;

const AppSubtitle = styled.p`
  color: ${({ theme }) => theme.colors.muted};
  margin-top: 0.8rem;
  font-size: 1.6rem;
  font-weight: 600;
`;

// ─── Intro / about card ───────────────────────────────────────────────────────
// Extends the shared Card component — no duplicated CSS.
// `as="section"` swaps the underlying <div> to a semantic <section> element.
const IntroCard = styled(Card)`
  margin-bottom: 3.2rem;
`;

const IntroHeading = styled.h2`
  font-size: 1.6rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1.6rem;
`;

const IntroParagraph = styled.p`
  font-size: 1.4rem;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1.6rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const MatchGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.6rem;
  margin-top: 1.6rem;

  @media (max-width: 540px) {
    grid-template-columns: 1fr;
  }
`;

const MatchItem = styled.div`
  background: ${({ theme }) => theme.colors.bg};
  border: 1.5px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 1.6rem;
  font-size: 1.4rem;
  line-height: 1.5;

  strong {
    display: block;
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 700;
    margin-bottom: 0.8rem;
  }
`;

// Inline anchor that matches the JTP brand colour
const ThemeLink = styled.a`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 700;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const SectionTitle = styled.h2`
  display: inline-block;
  font-size: 1.4rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.primary};
  border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
  padding-bottom: 0.4rem;
  margin-bottom: 1.6rem;
`;

const Spacer = styled.div`
  height: 3.2rem;
`;

// ─── Component ────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <PageWrapper>
      <Header>
        <AppTitle>
          Built for <span>JobTestPrep</span> — Junior Front-End Role
        </AppTitle>
        <AppSubtitle>
          Avet Badalyan · React Hook Form · Yup · styled-components · TanStack Query · Axios
        </AppSubtitle>
      </Header>

      {/* ── About section ── */}
      <IntroCard as="section">
        <IntroHeading>Hi, I'm Avet — and here's why I built this app</IntroHeading>

        <IntroParagraph>
          JobTestPrep's mission — helping over 1,000,000 candidates worldwide land their dream
          jobs through accurate, realistic test preparation — resonates with me personally.
          I applied to your Junior Front-End role and built this small app specifically to
          demonstrate the exact stack you listed: React Hook Form, Yup, styled-components,
          TanStack Query, and Axios.
        </IntroParagraph>

        <IntroParagraph>
          I'm a Frontend Engineer with 3+ years of professional experience across fintech
          (Cognaize — AI-powered financial platform), e-commerce (Ashstone Studios —{' '}
          <ThemeLink href="https://themes.shopify.com/themes/motto/presets/motto" target="_blank" rel="noreferrer">Motto</ThemeLink>,{' '}
          <ThemeLink href="https://themes.shopify.com/themes/monochrome/presets/monochrome" target="_blank" rel="noreferrer">Monochrome</ThemeLink>, and{' '}
          <ThemeLink href="https://themes.shopify.com/themes/force/presets/force" target="_blank" rel="noreferrer">Force</ThemeLink>{' '}
          published on the official Shopify Theme Store), and enterprise web (EPAM Systems —
          contributing to epam.com, a site serving millions of monthly visitors).
        </IntroParagraph>

        <IntroParagraph>
          Here's how my background maps to what you're looking for:
        </IntroParagraph>

        <MatchGrid>
          <MatchItem>
            <strong>React &amp; TypeScript · 3+ yrs</strong>
            Production experience at Cognaize and EPAM — features, bug fixes, code reviews, agile sprints.
          </MatchItem>
          <MatchItem>
            <strong>React Hook Form + Yup</strong>
            Practiced and demonstrated right here in Section ①. First time using RHF — learned it for this application.
          </MatchItem>
          <MatchItem>
            <strong>styled-components</strong>
            Used professionally; this entire app is styled with it including ThemeProvider, transient props, and module augmentation.
          </MatchItem>
          <MatchItem>
            <strong>TanStack Query + Axios</strong>
            Demonstrated in Section ② — live API fetch with caching, stale time, background refetch, and error handling.
          </MatchItem>
          <MatchItem>
            <strong>SCSS · HTML · JavaScript</strong>
            3+ years across all three; SCSS used in every professional project to date.
          </MatchItem>
          <MatchItem>
            <strong>Testing · Jest / RTL</strong>
            Wrote Sinon.js unit tests for 20+ frontend modules at EPAM; familiar with the testing mindset.
          </MatchItem>
        </MatchGrid>
      </IntroCard>

      <SectionTitle>① React Hook Form + Yup validation</SectionTitle>
      <RegistrationForm />

      <Spacer />

      <SectionTitle>② TanStack Query + Axios (REST API)</SectionTitle>
      <PostsSection />
    </PageWrapper>
  );
}
