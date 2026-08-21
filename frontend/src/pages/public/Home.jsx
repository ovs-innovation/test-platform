import EdvedumHero from "../../components/landing/EdvedumHero.jsx";
import EdvedumHeroBridge from "../../components/landing/EdvedumHeroBridge.jsx";
import EdvedumHomeSections from "../../components/landing/EdvedumHomeSections.jsx";
import { EdvedumCtaStrip } from "../../components/edvedum/EdvedumPlatformUI.jsx";
import {
  EdvedumHowItWorks,
  EdvedumMiniFaq,
} from "../../components/landing/EdvedumHomeExtended.jsx";
import { CONTACT } from "../../data/edvedumContent.js";

export default function Home() {
  return (
    <>
      <EdvedumHero />
      <EdvedumHeroBridge />
      <EdvedumHomeSections />
      <EdvedumHowItWorks />
      <EdvedumMiniFaq />
      <EdvedumCtaStrip
        badge="SUPPORT & ENQUIRIES"
        title="Have questions? We're here to help"
        desc="Reach out for admissions, technical support, or test series queries."
        primary={{ to: "/contact", label: "Contact Us" }}
        quickContact={{
          email: CONTACT.supportEmail,
          phone: CONTACT.phone,
        }}
      />
    </>
  );
}
