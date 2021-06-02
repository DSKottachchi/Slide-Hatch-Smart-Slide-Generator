import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import ImageUpload from './pages/ImageUpload';
import EditText from "./pages/EditText";
import SideNav from './components/SideNav';
import TextSlide from './pages/TextSlide';
import Test from './pages/Test';
import SlideGenerate from './pages/SlideGenerate';
import QuestionGenerate from './pages/QuestionGenerate';
import AddText from './pages/AddText';
import ReorderSlides from './pages/ReorderSlides';
import SlideImage from './pages/SlideImage';
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authActions';
import { useEffect } from 'react';
import MasterSlide from './pages/MasterSlide';

function App() {

  // useEffect(() => {
  //   store.dispatch(loadUser());
  // }, [])

  return (
    // <Provider store = {store}>
      <Router>
          <div className="slidegen-container">
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/image-upload" exact component={ImageUpload} />
              <Route path="/reorder-slides" exact component={ReorderSlides} />
              <Route path="/edit-text" exact component={EditText} />
              <Route path="/slide-image" exact component={SlideImage} />
              <Route path="/add-text" exact component={AddText} />
              <Route path="/master-slide" exact component={MasterSlide} />
              <Route path="/slide-generate" exact component={SlideGenerate} />
              <Route path="/question-generate" exact component={QuestionGenerate} />
              <Route path="/SideNav" exact component={SideNav} />
              <Route path="/text-slide" exact component={TextSlide} />
              <Route path="/test" exact component={Test} />
            </Switch>
          </div>
        </Router>
    // </Provider>
  );
}

export default App;
