import Flexbox from "@/components/Flexbox";
import Link from "next/link";
import Container from "@/components/Container";

export default function Page() {
  return (
    <Container>
      <div className="max-w-[80vw]">
        <p className={"mb-4"}>
          Hi, I'm Zytronium. I've recently found that I have a knack for satire
          writing. After a few articles I wrote on Discord here and there, I
          decided I wanted to start publishing my own articles online on a custom
          website, so I made this.
        </p>
        <p className={"mb-4"}>
          Here, I post whatever tech-related satire content I come up with.
          I make no revenue from this website, I do this entirely for fun.
          This website is also open-source. If you want to check it out,
          you can visit the GitHub repo <Link
          href={"https://github.com/Zytronium/satire_dev_blog"} className={"link"}>
          here
        </Link>.
        </p>
        <p className={"mb-4"}>
          I also have a serious website that showcases my favorite projects
          I've worked on over the years. <Link
          href={"https://zytronium.dev/"} className={"link"}>
          Click here
        </Link> to check it out.
        </p>
      </div>
    </Container>
  );
}
