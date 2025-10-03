import Flexbox from "@/components/Flexbox";

export default function Page() {
  return (
    <Flexbox col justify="center">
      <header className="text-4xl w-fit text-center font-bold">AdminPanel</header>
      <hr />
      <br />
      <div className={"m-2"}></div>
      <div>
        <p className={"mb-4"}>This page is currently under construction.</p>
        <p>The plan:</p>
        <ul>
          <li>- User enters the page from the navbar</li>
          <li>- Users sees a satire admin terminal</li>
          <li>- There is a secret command to run that takes you to a hidden admin
              login page
          </li>
          <li>- Only admins know what this command is, but still need correct login
              info to sign in
          </li>
          <li>- Upon signing in, users are able to post, edit, or delete posts that
              they made
          </li>
          <li>- Super admins are able to delete posts that anyone made.</li>
          <li>- No general users will exist, as only admins like me can post and we
              will not be tracking analytics at this time, so no need to like or
              comment.
          </li>
        </ul>
      </div>
    </Flexbox>
  );
}
