import 'bootstrap/dist/css/bootstrap.css';

// we are doing this to define our custom app component
// its a wrapper around the component were trying to show in screen
// this its to add css globally
export default ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};
