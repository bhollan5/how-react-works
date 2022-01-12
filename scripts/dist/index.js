var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* This script gives the app its Single Page functionality.   */

//  Function to do single page app thing. 
function goto(page) {
  //  Changing the page's URL without triggering HTTP call...
  page == 'landing' ? window.history.pushState({ page: "/" }, "", "/") : window.history.pushState({ page: "/" }, "", page);

  //  Now we'll do the HTTP call here, to keep the SPA frame...
  var http = new XMLHttpRequest();
  http.open("GET", "" + page + ".html");
  http.send();
  http.onreadystatechange = function (e) {
    if (http.readyState == 4 && http.status == 200) {
      document.getElementById('page-content').innerHTML = http.responseText;

      //  Update the sidebar's selected link.
      var selected_elements = document.getElementsByClassName('selected');
      for (var i = 0; i < selected_elements.length; i++) {
        selected_elements[i].classList.remove('selected');
      }
      if (document.getElementById(page)) {
        document.getElementById(page).classList.add('selected');
      }

      //  Add react code
      if (typeof react_setups[page] == 'function') {
        react_setups[page]();
      }

      //  Pretty printing source code
      PR.prettyPrint();

      //  Scroll to top of page
      document.getElementById('page-content').scrollTop = 0;
    }
  };
}

if (window.location.pathname.split('/')[1]) {
  goto(window.location.pathname.split('/')[1]);
} else {
  goto('landing');
}

var react_setups = {
  '1-what-is-reactjs': function whatIsReactjs() {

    //  A function we want the button to call. 
    function hello_world() {
      alert("Hello world, from React!");
    }

    //  React's syntax to define our button component.
    function ButtonComponent() {
      return React.createElement('button', // The tag name
      { onClick: hello_world }, //  The element properties
      'Hello world!' //  The element's inner content
      );
    }

    //  Rendering the button in the 'button-demo' div.
    ReactDOM.render(React.createElement(ButtonComponent), document.getElementById('button-demo'));
  },
  '2-react-use-cases': function reactUseCases() {
    //// DEMO 1
    //  Defining a "Comment" component
    function Comment(props) {
      return React.createElement('div', { className: 'comment-container', key: props.key + '-1' }, [React.createElement('img', { src: '../assets/profile-pic.png', key: props.key + '-2' }), React.createElement('div', { key: props.key + '-3' }, [React.createElement('div', { className: 'comment-name', key: props.key + '-4' }, props.comment_name), React.createElement('div', { className: 'comment-text', key: props.key + '-5' }, props.comment_text)])]);
    }

    //  Defining a "CommentSection" component
    function CommentSection(props) {
      return React.createElement('div', { className: 'comment-section' }, [React.createElement('div', { className: 'comment-header', key: '1' }, 'Comments'), Comment({
        comment_name: 'John Doe',
        comment_text: 'Hey, nice ReactJS tutorial.',
        key: '1'
      }), Comment({
        comment_name: 'Evan You',
        comment_text: 'Personally I think VueJS is better.',
        key: '2'
      }), Comment({
        comment_name: 'Jordan Walke',
        comment_text: 'Well, you would, wouldn\'t you.',
        key: '3'
      })]);
    }

    //  Rendering our commentSection component
    ReactDOM.render(CommentSection(), document.getElementById('demo-1'));

    //// DEMO 2
    //  Defining our EventDemo component.

    var EventDemo = function (_React$Component) {
      _inherits(EventDemo, _React$Component);

      function EventDemo(props) {
        _classCallCheck(this, EventDemo);

        var _this = _possibleConstructorReturn(this, (EventDemo.__proto__ || Object.getPrototypeOf(EventDemo)).call(this, props));

        _this.state = { text_value: '' };
        _this.handleChange = _this.handleChange.bind(_this);
        _this.handleSubmit = _this.handleSubmit.bind(_this);
        return _this;
      }

      _createClass(EventDemo, [{
        key: "handleChange",
        value: function handleChange(event) {
          this.setState({ text_value: event.target.value });
        }
      }, {
        key: "handleSubmit",
        value: function handleSubmit(event) {
          alert('Submitting the text input: ' + this.state.text_value);
        }
      }, {
        key: "render",
        value: function render() {
          return React.createElement('div', { key: '1' }, [React.createElement('input', {
            type: 'text',
            onChange: this.handleChange,
            key: '2'
          }), React.createElement('br', { key: '3' }), React.createElement('br', { key: '4' }), React.createElement('div', { key: '5' }, "Current input: " + this.state.text_value), React.createElement('br', { key: '6' }), React.createElement('button', { key: '7', onClick: this.handleSubmit }, "Submit input")]);
        }
      }]);

      return EventDemo;
    }(React.Component); //  End of EventDemo definition

    //  Rendering the EventDemo component


    ReactDOM.render(React.createElement(EventDemo), document.getElementById('demo-2'));

    //// DEMO 3
    //  Defining the NameLength component.

    var NameLength = function (_React$Component2) {
      _inherits(NameLength, _React$Component2);

      function NameLength(props) {
        _classCallCheck(this, NameLength);

        return _possibleConstructorReturn(this, (NameLength.__proto__ || Object.getPrototypeOf(NameLength)).call(this, props));
      }

      //  <div>Your name is <b id="name-length">8</b> characters long.</div>


      _createClass(NameLength, [{
        key: "render",
        value: function render() {
          return React.createElement('div', { key: '1' }, ['Your name is ', React.createElement('b', { key: '2' }, this.props.name.length), ' characters long.']);
        }
      }]);

      return NameLength;
    }(React.Component); //  End of NameLength component.

    //  Defining the UserBadge component.


    var UserBadge = function (_React$Component3) {
      _inherits(UserBadge, _React$Component3);

      function UserBadge(props) {
        _classCallCheck(this, UserBadge);

        return _possibleConstructorReturn(this, (UserBadge.__proto__ || Object.getPrototypeOf(UserBadge)).call(this, props));
      }

      /*<div class="user-badge"><img src="../assets/profile-pic.png"><span>Jane Doe</span></div>*/


      _createClass(UserBadge, [{
        key: "render",
        value: function render() {
          return React.createElement('div', { className: 'user-badge', key: '1' }, [React.createElement('img', { src: '../assets/profile-pic.png', key: '2' }), React.createElement('span', { key: '3' }, this.props.name)]);
        }
      }]);

      return UserBadge;
    }(React.Component); //  End of UserBadge component.

    //  Defining the WelcomeMessage component.


    var WelcomeMessage = function (_React$Component4) {
      _inherits(WelcomeMessage, _React$Component4);

      function WelcomeMessage(props) {
        _classCallCheck(this, WelcomeMessage);

        return _possibleConstructorReturn(this, (WelcomeMessage.__proto__ || Object.getPrototypeOf(WelcomeMessage)).call(this, props));
      }

      // <div>Welcome, <span>Jane Doe</span>!</div>


      _createClass(WelcomeMessage, [{
        key: "render",
        value: function render() {
          return React.createElement('div', { key: '1' }, ['Welcome, ', React.createElement('span', { className: 'bold', key: '2' }, this.props.name), '!']);
        }
      }]);

      return WelcomeMessage;
    }(React.Component); //  End of WelcomeMessage component.

    //  Defining the UserApp component.


    var UserApp = function (_React$Component5) {
      _inherits(UserApp, _React$Component5);

      function UserApp(props) {
        _classCallCheck(this, UserApp);

        var _this5 = _possibleConstructorReturn(this, (UserApp.__proto__ || Object.getPrototypeOf(UserApp)).call(this, props));

        _this5.state = { name: 'Jane Doe' };
        _this5.handleChange = _this5.handleChange.bind(_this5);
        return _this5;
      }

      _createClass(UserApp, [{
        key: "handleChange",
        value: function handleChange(event) {
          this.setState({ name: event.target.value });
        }
      }, {
        key: "render",
        value: function render() {
          return React.createElement('div', { className: 'flex', id: 'demo-3-react', key: '1' }, [
          //  The text input
          React.createElement('div', { className: 'demo-3-container', key: '2' }, React.createElement('div', { key: '3' }, [React.createElement('div', { key: '4' }, 'Enter your name'), React.createElement('input', {
            type: 'text',
            value: this.state.name,
            onChange: this.handleChange,
            key: '5'
          })])),
          //  The other components
          React.createElement('div', { className: 'demo-3-container', key: '6' }, React.createElement(NameLength, { name: this.state.name }, null), React.createElement(UserBadge, { name: this.state.name }, null), React.createElement(WelcomeMessage, { name: this.state.name }, null))]);
        }
      }]);

      return UserApp;
    }(React.Component); //  End of UserApp component.

    //  Rendering the EventDemo component


    ReactDOM.render(React.createElement(UserApp), document.getElementById('demo-3'));
  },

  '3-jsx': function jsx() {

    //// BUTTON DEMO
    function hello_world() {
      alert("Hello world, from React, with JSX!");
    }

    var element = React.createElement(
      "button",
      { onClick: hello_world },
      "Hello, world!"
    );

    ReactDOM.render(element, document.getElementById('button-demo'));

    ////  DEMO 1: Comment
    var Comment = function Comment(props) {
      return React.createElement(
        "div",
        { className: "comment-container" },
        React.createElement("img", { src: "../assets/profile-pic.png" }),
        React.createElement(
          "div",
          null,
          React.createElement(
            "div",
            { className: "comment-name" },
            props.comment_name
          ),
          React.createElement(
            "div",
            { className: "comment-text" },
            props.comment_text
          )
        )
      );
    };

    var commentSection = React.createElement(
      "div",
      { className: "comment-section" },
      React.createElement(
        "div",
        { className: "comment-header" },
        "Comments"
      ),
      React.createElement(Comment, { comment_name: "John Doe", comment_text: "Hey, nice ReactJS tutorial." }),
      React.createElement(Comment, { comment_name: "Evan You", comment_text: "Personally I think VueJS is better." }),
      React.createElement(Comment, { comment_name: "Jordan Walke", comment_text: "Well, you would, wouldn't you." })
    );

    ReactDOM.render(commentSection, document.getElementById('demo-1'));

    ////  DEMO 2: Events and State

    var EventDemo = function (_React$Component6) {
      _inherits(EventDemo, _React$Component6);

      function EventDemo(props) {
        _classCallCheck(this, EventDemo);

        var _this6 = _possibleConstructorReturn(this, (EventDemo.__proto__ || Object.getPrototypeOf(EventDemo)).call(this, props));

        _this6.state = { text_value: '' };
        _this6.handleChange = _this6.handleChange.bind(_this6);
        _this6.handleSubmit = _this6.handleSubmit.bind(_this6);
        return _this6;
      }

      _createClass(EventDemo, [{
        key: "handleChange",
        value: function handleChange(event) {
          this.setState({ text_value: event.target.value });
        }
      }, {
        key: "handleSubmit",
        value: function handleSubmit(event) {
          alert('Submitting the text input: ' + this.state.text_value);
        }
      }, {
        key: "render",
        value: function render() {
          return React.createElement(
            "div",
            null,
            React.createElement("input", { type: "text", onChange: this.handleChange }),
            React.createElement("br", null),
            React.createElement("br", null),
            React.createElement(
              "div",
              null,
              "Current input: ",
              this.state.text_value
            ),
            React.createElement("br", null),
            React.createElement(
              "button",
              { onClick: this.handleSubmit },
              "Submit input"
            )
          );
        }
      }]);

      return EventDemo;
    }(React.Component); //  End of EventDemo definition

    //  Rendering the EventDemo component


    ReactDOM.render(React.createElement(EventDemo), document.getElementById('demo-2'));

    ////  DEMO 3: Reactivity and props.

    var NameLength = function (_React$Component7) {
      _inherits(NameLength, _React$Component7);

      function NameLength(props) {
        _classCallCheck(this, NameLength);

        return _possibleConstructorReturn(this, (NameLength.__proto__ || Object.getPrototypeOf(NameLength)).call(this, props));
      }

      _createClass(NameLength, [{
        key: "render",
        value: function render() {
          return React.createElement(
            "div",
            null,
            "Your name is ",
            React.createElement(
              "b",
              null,
              this.props.name.length
            ),
            " characters long."
          );
        }
      }]);

      return NameLength;
    }(React.Component); //  End of NameLength component.

    var UserBadge = function (_React$Component8) {
      _inherits(UserBadge, _React$Component8);

      function UserBadge(props) {
        _classCallCheck(this, UserBadge);

        return _possibleConstructorReturn(this, (UserBadge.__proto__ || Object.getPrototypeOf(UserBadge)).call(this, props));
      }

      /*<div class="user-badge"><img src="../assets/profile-pic.png"><span>Jane Doe</span></div>*/


      _createClass(UserBadge, [{
        key: "render",
        value: function render() {
          return React.createElement(
            "div",
            { className: "user-badge" },
            React.createElement("img", { src: "../assets/profile-pic.png" }),
            React.createElement(
              "span",
              null,
              this.props.name
            )
          );
        }
      }]);

      return UserBadge;
    }(React.Component); //  End of UserBadge component.

    //  Defining the WelcomeMessage component.


    var WelcomeMessage = function (_React$Component9) {
      _inherits(WelcomeMessage, _React$Component9);

      function WelcomeMessage(props) {
        _classCallCheck(this, WelcomeMessage);

        return _possibleConstructorReturn(this, (WelcomeMessage.__proto__ || Object.getPrototypeOf(WelcomeMessage)).call(this, props));
      }

      _createClass(WelcomeMessage, [{
        key: "render",
        value: function render() {
          return React.createElement(
            "div",
            null,
            "Welcome, ",
            React.createElement(
              "b",
              null,
              this.props.name
            ),
            "!"
          );
        }
      }]);

      return WelcomeMessage;
    }(React.Component); //  End of WelcomeMessage component.

    var UserApp = function (_React$Component10) {
      _inherits(UserApp, _React$Component10);

      function UserApp(props) {
        _classCallCheck(this, UserApp);

        var _this10 = _possibleConstructorReturn(this, (UserApp.__proto__ || Object.getPrototypeOf(UserApp)).call(this, props));

        _this10.state = { name: 'Jane Doe' };
        _this10.handleChange = _this10.handleChange.bind(_this10);
        return _this10;
      }

      _createClass(UserApp, [{
        key: "handleChange",
        value: function handleChange(event) {
          this.setState({ name: event.target.value });
        }
      }, {
        key: "render",
        value: function render() {
          return React.createElement(
            "div",
            { className: "flex", id: "demo-3-react" },
            React.createElement(
              "div",
              { className: "demo-3-container" },
              React.createElement(
                "div",
                null,
                React.createElement(
                  "div",
                  null,
                  "Enter your name"
                ),
                React.createElement("input", { onChange: this.handleChange, value: this.state.name })
              )
            ),
            React.createElement(
              "div",
              { className: "demo-3-container" },
              React.createElement(NameLength, { name: this.state.name }),
              React.createElement(UserBadge, { name: this.state.name }),
              React.createElement(WelcomeMessage, { name: this.state.name })
            )
          );
        }
      }]);

      return UserApp;
    }(React.Component); //  End of UserApp component.

    //  Rendering the EventDemo component


    ReactDOM.render(React.createElement(UserApp), document.getElementById('demo-3'));
  }

  // page 1 demo 1
};function hello_world() {
  alert("Hello world, from vanilla JS!");
}

// page 2 demo 2
function text_input() {
  var the_text = document.getElementById('text-input').value;
  document.getElementById('text-input-display').innerHTML = the_text;
}
function submit_input() {
  var the_text = document.getElementById('text-input').value;
  alert("Submitting the text input: " + the_text);
}

// page 2 demo 3
function name_input() {
  var the_name = document.getElementById('demo-3-name-input').value;
  document.getElementById('name-length').innerHTML = the_name.length;
  var name_displays = document.querySelectorAll('.demo-3-name');
  for (var i = 0; i < name_displays.length; i++) {
    name_displays[i].innerHTML = the_name;
  }
}