import "../styles/globals.css";
import { Provider } from "react-redux";
import store from "../redux/store/store";
import Headers from "../components/header"
import Footer from '../components/footer';

function MyApp({ Component, pageProps }) {
  return (
      <Provider store={store}>
        <Headers />
        <Component {...pageProps} />
        <Footer />
      </Provider>
  );
}

export default MyApp;