import EdvedumHero from "../../components/landing/EdvedumHero.jsx";
import EdvedumHeroBridge from "../../components/landing/EdvedumHeroBridge.jsx";
import EdvedumHomeSections from "../../components/landing/EdvedumHomeSections.jsx";
import { EdvedumCtaStrip } from "../../components/edvedum/EdvedumPlatformUI.jsx";
import {
  EdvedumHowItWorks,
  EdvedumMiniFaq,
} from "../../components/landing/EdvedumHomeExtended.jsx";

export default function Home() {
  return (
    <>
      <EdvedumHero />
      <EdvedumHeroBridge />
      <EdvedumHomeSections />
      <EdvedumHowItWorks />
      <EdvedumMiniFaq />
      <EdvedumCtaStrip
        title="Ready to attempt your first mock?"
        desc="Enroll in a test series and practice on the NTA CBT interface."
        primary={{ to: "/test-series", label: "Browse test series" }}
        secondary={{ to: "/free-mock", label: "Start free test" }}
      />
    </>
  );
}
