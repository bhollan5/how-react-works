/* This script gives the app its Single Page functionality.   */

//  Function to do single page app thing. 
function goto(page) {
  //  Changing the page's URL without triggering HTTP call...
  page == 'landing' ? 
    window.history.pushState({page: "/"}, "", "/") : 
    window.history.pushState({page: "/"}, "", page);

  //  Now we'll do the HTTP call here, to keep the SPA frame...
  const http = new XMLHttpRequest();
  http.open("GET", "" + page + ".html");
  http.send();
  http.onreadystatechange = (e) => {
    if (http.readyState == 4 && http.status == 200) {
      document.getElementById('page-content').innerHTML = http.responseText;

      //  Update the sidebar's selected link.
      let selected_elements = document.getElementsByClassName('selected');
      for (let i = 0; i < selected_elements.length; i++) {
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
      PR.prettyPrint()

      //  Scroll to top of page
      document.getElementById('page-content').scrollTop = 0;
    }
  }
}

if ( window.location.pathname.split('/')[1]) {
  goto( window.location.pathname.split('/')[1])
} else {
  goto('landing');
}

const react_setups = {
  '1-what-is-reactjs': function() {

    //  A function we want the button to call. 
    function hello_world() {
      alert("Hello world, from React!");
    }

    //  React's syntax to define our button component.
    function ButtonComponent() {
      return React.createElement(
        'button',                 // The tag name
        { onClick: hello_world }, //  The element properties
        'Hello world!'             //  The element's inner content
      )
    }

    //  Rendering the button in the 'button-demo' div.
    ReactDOM.render(
      React.createElement(ButtonComponent),
      document.getElementById('button-demo')
    );
  },
  '2-react-use-cases': function() {
    //// DEMO 1
    //  Defining a "Comment" component
    function Comment(props) {
      return React.createElement(
        'div',
        { className: 'comment-container', key: props.key + '-1' },
        [
          React.createElement(
            'img',
            {src: '../assets/profile-pic.png', key: props.key + '-2' },
          ),
          React.createElement(
            'div',
            { key: props.key + '-3'},
            [
              React.createElement(
                'div',
                {className: 'comment-name', key: props.key + '-4'},
                props.comment_name,
              ),
              React.createElement(
                'div',
                {className: 'comment-text', key: props.key + '-5'},
                props.comment_text,
              )
            ]
          )
        ]
      );
    }

    //  Defining a "CommentSection" component
    function CommentSection(props) {
      return React.createElement(
        'div',
        { className: 'comment-section' },
        [
          React.createElement(
            'div',
            { className: 'comment-header', key: '1' },
            'Comments'
          ),
          Comment({
            comment_name: 'John Doe',
            comment_text: 'Hey, nice ReactJS tutorial.',
            key: '1'
          }),
          Comment({
            comment_name: 'Evan You',
            comment_text: 'Personally I think VueJS is better.',
            key: '2'
          }),
          Comment({
            comment_name: 'Jordan Walke',
            comment_text: 'Well, you would, wouldn\'t you.',
            key: '3'
          }),
        ]
      );
    }
    
    //  Rendering our commentSection component
    ReactDOM.render(
      CommentSection(),
      document.getElementById('demo-1')
    );

    //// DEMO 2
    //  Defining our EventDemo component.
    class EventDemo extends React.Component {
      constructor(props) {
        super(props);
        this.state = { text_value: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleChange(event) {
        this.setState({text_value: event.target.value});
      }

      handleSubmit(event) {
        alert('Submitting the text input: ' + this.state.text_value);
      }
    
      render() {
        return React.createElement(
          'div',
          { key: '1' },
          [
            React.createElement(
              'input',
              { 
                type: 'text', 
                onChange: this.handleChange, 
                key: '2' 
              }
            ),
            React.createElement('br', { key: '3' } ),
            React.createElement('br', { key: '4' } ),
            React.createElement(
              'div',
              { key: '5' },
              `Current input: ${this.state.text_value}` 
            ),
            React.createElement('br', { key: '6' } ),
            React.createElement(
              'button',
              { key: '7', onClick: this.handleSubmit },
              `Submit input` 
            ),
          ]
        )
      }
    } //  End of EventDemo definition

    //  Rendering the EventDemo component
    ReactDOM.render(
      React.createElement(EventDemo),
      document.getElementById('demo-2')
    );


    //// DEMO 3
    //  Defining the NameLength component.
    class NameLength extends React.Component {
      constructor(props) {
        super(props);
      }

      //  <div>Your name is <b id="name-length">8</b> characters long.</div>
      render() {
        return React.createElement(
          'div',
          { key: '1' },
          [
            'Your name is ',
            React.createElement(
              'b',
              { key: '2' },
              this.props.name.length
            ),
            ' characters long.'
          ]
        )
      }
    } //  End of NameLength component.

    //  Defining the UserBadge component.
    class UserBadge extends React.Component {
      constructor(props) {
        super(props);
      }

      /*<div class="user-badge"><img src="../assets/profile-pic.png"><span>Jane Doe</span></div>*/
      render() {
        return React.createElement(
          'div',
          { className: 'user-badge', key: '1' },
          [
            React.createElement(
              'img',
              { src: '../assets/profile-pic.png', key: '2' },
            ),
            React.createElement(
              'span',
              { key: '3' },
              this.props.name
            ),
          ]
        )
      }
    } //  End of UserBadge component.

    //  Defining the WelcomeMessage component.
    class WelcomeMessage extends React.Component {
      constructor(props) {
        super(props);
      }

      // <div>Welcome, <span>Jane Doe</span>!</div>
      render() {
        return React.createElement(
          'div',
          { key: '1' },
          [
            'Welcome, ',
            React.createElement(
              'span',
              { className: 'bold', key: '2' },
              this.props.name
            ),
            '!'
          ]
        )
      }
    } //  End of WelcomeMessage component.

    //  Defining the UserApp component.
    class UserApp extends React.Component {
      constructor(props) {
        super(props);
        this.state = {name: 'Jane Doe'}
        this.handleChange = this.handleChange.bind(this);
      }

      handleChange(event) {
        this.setState({name: event.target.value});
      }

      render() {
        return React.createElement(
          'div',
          { className: 'flex', id: 'demo-3-react', key: '1' },
          [
            //  The text input
            React.createElement(
              'div',
              { className: 'demo-3-container', key: '2' },
              React.createElement(
                'div',
                { key: '3'},
                [
                  React.createElement(
                    'div',
                    { key: '4' },
                    'Enter your name'
                  ),
                  React.createElement(
                    'input',
                    { 
                      type: 'text', 
                      value: this.state.name,
                      onChange: this.handleChange, 
                      key: '5' 
                    }
                  ),
                ]
              )
            ),
            //  The other components
            React.createElement(
              'div',
              { className: 'demo-3-container', key: '6' },
              React.createElement(NameLength, {name: this.state.name}, null),
              React.createElement(UserBadge, {name: this.state.name}, null),
              React.createElement(WelcomeMessage, {name: this.state.name}, null),
            ),
          ]
        )
      }
    } //  End of UserApp component.

    //  Rendering the EventDemo component
    ReactDOM.render(
      React.createElement(UserApp),
      document.getElementById('demo-3')
    );

  },

  '3-jsx': function() {

    //// BUTTON DEMO
    function hello_world() {
      alert("Hello world, from React, with JSX!");
    }
  
    let element = <button onClick={hello_world}>Hello, world!</button>;
    
    ReactDOM.render(
      element,
      document.getElementById('button-demo')
    );

    ////  DEMO 1: Comment
    let Comment = function(props) {
      return (
      <div className="comment-container">
        <img src="../assets/profile-pic.png" />
        <div>
          <div className="comment-name">{props.comment_name}</div>
          <div className="comment-text">{props.comment_text}</div>
        </div>
      </div>);
    }

    let commentSection = (
      <div className="comment-section">
        <div className="comment-header">
          Comments
        </div>
        <Comment comment_name="John Doe" comment_text="Hey, nice ReactJS tutorial." />
        <Comment comment_name="Evan You" comment_text="Personally I think VueJS is better." />
        <Comment comment_name="Jordan Walke" comment_text="Well, you would, wouldn't you." />
      </div>
    )

    ReactDOM.render(
      commentSection,
      document.getElementById('demo-1')
    );

    ////  DEMO 2: Events and State
    class EventDemo extends React.Component {
      constructor(props) {
        super(props);
        this.state = { text_value: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleChange(event) {
        this.setState({text_value: event.target.value});
      }

      handleSubmit(event) {
        alert('Submitting the text input: ' + this.state.text_value);
      }
    
      render() {
        return (
          <div>
            <input type="text" onChange={this.handleChange} />
            <br/><br/>
            <div>Current input: {this.state.text_value}</div>
            <br/>
            <button onClick={this.handleSubmit}>Submit input</button>
          </div>
        )
      }
    } //  End of EventDemo definition

    //  Rendering the EventDemo component
    ReactDOM.render(
      React.createElement(EventDemo),
      document.getElementById('demo-2')
    );

    ////  DEMO 3: Reactivity and props.
    class NameLength extends React.Component {
      constructor(props) {
        super(props);
      }

      render() {
        return (
          <div>Your name is <b>{this.props.name.length}</b> characters long.</div>
        )
      }
    } //  End of NameLength component.

    class UserBadge extends React.Component {
      constructor(props) {
        super(props);
      }

      /*<div class="user-badge"><img src="../assets/profile-pic.png"><span>Jane Doe</span></div>*/
      render() {
        return (
          <div className="user-badge">
            <img src="../assets/profile-pic.png" />
            <span>{this.props.name}</span>
          </div>
        )
      }
    } //  End of UserBadge component.

    //  Defining the WelcomeMessage component.
    class WelcomeMessage extends React.Component {
      constructor(props) {
        super(props);
      }

      render() {
        return (
          <div>Welcome, <b>{this.props.name}</b>!</div>
        )
      }
    } //  End of WelcomeMessage component.

    class UserApp extends React.Component {
      constructor(props) {
        super(props);
        this.state = {name: 'Jane Doe'}
        this.handleChange = this.handleChange.bind(this);
      }

      handleChange(event) {
        this.setState({name: event.target.value});
      }

      render() {
        return (
          <div className="flex" id="demo-3-react">
            <div className="demo-3-container">
              <div>
                <div>Enter your name</div>
                <input onChange={this.handleChange} value={this.state.name} />
              </div>
            </div>
            <div className="demo-3-container">
              <NameLength name={this.state.name} />
              <UserBadge name={this.state.name} />
              <WelcomeMessage name={this.state.name} />
            </div>
          </div>
        )
      }
    } //  End of UserApp component.

    //  Rendering the EventDemo component
    ReactDOM.render(
      React.createElement(UserApp),
      document.getElementById('demo-3')
    );
  }

}

// page 1 demo 1
function hello_world() {
  alert("Hello world, from vanilla JS!")
}

// page 2 demo 2
function text_input() {
  let the_text = document.getElementById('text-input').value;
  document.getElementById('text-input-display').innerHTML = the_text;
}
function submit_input() {
  let the_text = document.getElementById('text-input').value;
  alert("Submitting the text input: " + the_text);
}

// page 2 demo 3
function name_input() {
  let the_name = document.getElementById('demo-3-name-input').value;
  document.getElementById('name-length').innerHTML = the_name.length;
  let name_displays = document.querySelectorAll('.demo-3-name');
  for (let i = 0; i < name_displays.length; i++) {
    name_displays[i].innerHTML = the_name;
  }
}