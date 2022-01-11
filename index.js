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
      console.log(page)
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

  }

}
//  Code for demo 1;
// class Demo1 extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { demo: false };
//   }

//   render() {
//     if (this.state.liked) {
//       return 'You liked this.';
//     }

//     return React.createElement(
//       'button',
//       { onClick: () => this.setState({ liked: true }) },
//       'Like'
//     );
//   }
// }

// const domContainer = document.querySelector('#demo1');
// ReactDOM.render(React.createElement(Demo1), domContainer);

function hello_world() {
  alert("Hello world, from vanilla JS!")
}

function toggle_menu() {
  
}