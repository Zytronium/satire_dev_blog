import Link from "next/link";
import Container from "@/components/Container";

export default function Page() {
  return (
    <Container>
      <div>
        <p className={"mb-4"}>This page is currently under construction.</p>
        <p>The plan:</p>
        <ul>
          <li>User enters the page from the navbar</li>
          <li>Users sees a list of post widgets</li>
          <li>User may search for posts</li>
          <li>User can click on post widgets to see them in full view</li>
          <li>Upon signing in, admin users can edit these posts</li>
        </ul>
        <Link href={"/posts/preview"}>Click to preview WIP page</Link>
      </div>
    </Container>
  );
}
