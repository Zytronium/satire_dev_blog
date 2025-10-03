import Flexbox from "@/components/Flexbox";
import Link from "next/link";

export default function Page() {
  return (
    <Flexbox col justify="center">
      <header className="text-4xl w-fit text-center font-bold">About</header>
      <hr />
      <br />
      <div className={"m-2"}></div>
      <div>
        <p className={"mb-4"}>This page is currently under construction.</p>
        <p>The plan:</p>
        <ul>
          <li>- General information about this satire dev blog website</li>
          <li>- Include this link to <Link href={"https://zytronium.dev/"} className={"link"}>the creator(zytronium)'s website</Link></li>
        </ul>
      </div>
    </Flexbox>
  );
}
