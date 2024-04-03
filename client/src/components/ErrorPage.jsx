import { useRouteError, Link } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
        <br />
        <Link to="/"> Click to return Home
        </Link>
      </p>
    </div>
  );
}

export function Notfound() {
  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Page not found </p>
      <p>
        <Link to="/"> Click to return Home
        </Link>
      </p>
    </div>
  )

}