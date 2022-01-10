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
    class Comment extends React.Component {
      constructor(props) {
        super(props);
      }

      render() {
        return React.createElement(
          'div',
          { className: 'comment-container', key: '0' },
          [
            React.createElement(
              'img',
              {src: '../assets/profile-pic.png', key: '1'},
            ),
            React.createElement(
              'div',
              { key: '4'},
              [
                React.createElement(
                  'div',
                  {className: 'comment-name', key: '2'},
                  'this.props.comment_name',
                ),
                React.createElement(
                  'div',
                  {className: 'comment-text', key: '3'},
                  'this.props.comment_text',
                )
              ]
            )
          ]
        );
      }
    }

    ReactDOM.render(
      React.createElement(Comment),
      document.getElementById('demo-1')
    );

    // function commentSection(props) {
    //   return React.createElement(
    //     'div',
    //     { id: 'comment-section' },
    //     ['Like']
    //   );
    // }

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