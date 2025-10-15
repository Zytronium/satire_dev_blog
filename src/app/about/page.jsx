import Flexbox from "@/components/Flexbox";
import Link from "next/link";
import Container from "@/components/Container";

export default function Page() {
  return (
    <Container>
      <div>
        <p className={"mb-4"}>This page is currently under construction.</p>
        <p>The plan:</p>
        <ul>
          <li>General information about this satire dev blog website</li>
          <li>Include this link to <Link
            href={"https://zytronium.dev/"} className={"link"}>
            the creator(zytronium)'s website
          </Link></li>
        </ul>
      </div>
    </Container>
  )
    ;
}
