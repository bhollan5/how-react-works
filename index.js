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
    }
  }
}

if ( window.location.pathname.split('/')[1]) {
  console.log( window.location.pathname)
  goto( window.location.pathname.split('/')[1])
} else {
  goto('landing');
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